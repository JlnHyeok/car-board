import './css/detailcar.css'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailCar() {
  const {id} = useParams()
  const [detailCar, setDetailCar] = useState([])
  const [firstPay, setFirstPay] = useState()
  const periodRef = useRef([])
  const etcInfo = useRef([])
  const firstPayRef = useRef()
  
  // 세금 및 부대비용 체크용
  const [isClick, setIsClick] = useState(false)
  // 할부 기간 체크용
  const [period, setPeriod] = useState(36)
  
  useEffect(() => {
    axios.get(`/selectWhere/${id}`).then((result)=>(setDetailCar(result.data)))
  },[id])

  if(!detailCar[0]){
    return (
    <div style={{margin:'0 auto',width:'100%',height:'100vh',backgroundColor:'#f2f2f345'}}>Loading</div>
    )
  }
  const car = detailCar[0]
  const carPrice = car.car_price
  const carTax = Math.round(carPrice/10)
  let carFirstPay = isClick? Math.round(carPrice*0.3) + carTax : Math.round(carPrice*0.3)
  
  // etc hover
  const mouseOverEtc = (i) => {
    etcInfo.current[i].style.opacity = 1
    etcInfo.current[i].style.visibility='visible'
  }
  const mouseLeaveEtc = (i) => {
    etcInfo.current[i].style.opacity = 0
    etcInfo.current[i].style.visibility='hidden'
  }
  // 선수금 입력 함수
  const onChangeFirstPay = (e) => {
    if(e.target.value>=carPrice){
      e.target.value=carPrice
    }
    if(isNaN(e.target.value)){
      e.target.value = 0
    }
    if(e.target.value === ''){
      e.target.value = 0
    }
    if(e.target.value.length>1 && e.target.value[0] ==='0'){
      e.target.value = e.target.value.slice(1)
    }
    let payment = e.target.value
    setFirstPay(payment)
  }
  const isTaxClick = () => {
    setIsClick(!isClick)
    console.log(1,isClick)
    // isClick 가 바뀌기전에 먼저 렌더링되므로 이 함수 내에서는 반대로 적어준다.
    carFirstPay = !isClick? Math.round(carPrice*0.3) + carTax : Math.round(carPrice*0.3)
    firstPayRef.current.value = carFirstPay.toLocaleString('ko-KR')
    setFirstPay(0)
  }
  // 할부 기간
  const checkPeriod = (e) => {
    const idx = (e.target.value/12 -1)
    periodRef.current.forEach((cur,i)=>(
      // cur.style.border = i===idx ?  '2px solid #b70f28' : '2px solid rgba(118,118,118,0.3)'
      i===idx ? cur.classList.add('period-checked') : (cur.classList.contains('period-checked') && cur.classList.remove('period-checked'))
    ))
    setPeriod(e.target.value)
    console.log(e)
  }
  
  // console.log(isClick)
  return  (
    <div className='detail-car-wrap'>
      <div className='detail-title-wrap'>
        <div className='detail-title-left'>
          <div className='detail-title'>
            <span>{car.car_maker} {car.car_name}</span>
          </div>
          <div className='detail-title-info'>
            <span>{car.car_model_year.slice(2,4)}년 {car.car_model_year.slice(5,7)}월식</span>
            <span>·</span>
            <span>{car.distance.toLocaleString('ko-KR')}km</span>
            <span>·</span>
            <span>무사고</span>
          </div>
        </div>
        <div className="detail-title-right">
          <div className='detail-title-price'>
            <strong>{carPrice.toLocaleString('ko-KR')}만원</strong>
            <div className='monthly-price-wrap'>
              <span>
                <span onMouseOver={()=>mouseOverEtc(0)} onMouseLeave={()=>mouseLeaveEtc(0)} className='etc-info-wrap'>
                  <img className='etc-img' 
                  src='/img/icon-etc-info.svg' alt='etc'/> 
                  <span className="etc-info" ref={(el)=>(etcInfo.current[0]=el)}>
                    예상 금액이며 변동될 수 있습니다. 자세한 내용은 상담원에게 문의해 주세요.
                  </span>
                </span>
                할부
                </span>
              <span className='monthly-price'> 월 {Math.ceil((carPrice+carTax)/48)}만원</span>
            </div>
          </div>
        </div>
      </div>
      <div className='detail-car-image'>
        <img src={car.car_image} alt="car" />
      </div>
      <div className="detail-car-info-wrap">
        <div className="detail-car-info-left">
          <div className='left-car-title'>
            <strong>{carPrice.toLocaleString('ko-KR')}만원</strong>
            <div>
              <span className='left-car-title-monthly-wrap'>할부 <span className='monthly-price'>월 {Math.ceil((carPrice+carTax)/48)}만원</span></span>
            </div>
          </div>
          <div className="left-car-options">
            <div className="left-car-basic-info">
              <span>기본정보</span>  
              <div>{car.car_model_year.slice(2,4)}년 {car.car_model_year.slice(5,7)}월식 </div>
            </div>
            <div className="left-car-distance">
              <span>주행거리</span>
              <div>{car.distance.toLocaleString('ko-KR')}km</div>
            </div>
            <div className="left-car-distance">
              <span>진단결과</span>
              <div>무사고</div>
            </div>
          </div>
          <div className='total-cal'>
            <div className='cal-first'>
              <div className='expected-price'>
                <strong>차량 예상 가격</strong><br />
                <input type="text" disabled={true} value={carPrice.toLocaleString('ko-KR')+' 만원'} />
              </div>
              <div className="first-pay">
                <div className='first-pay-input-box'>
                  <strong>
                    선수금
                  </strong>
                  <span onMouseOver={()=>mouseOverEtc(1)} onMouseLeave={()=>mouseLeaveEtc(1)}>
                    <img className='firstpay-etc-img' src='/img/icon-etc-info.svg' alt='etc'/> 
                    <span className="etc-info" ref={el=>etcInfo.current[1]=el}>
                    예상 선수금은 차량 가격의 30%로 설정되어 있습니다.{<br/>} 고객님이 원하는 금액으로 설정하실 수 있습니다.
                    </span>
                  </span>
                  <br />
                  <input type="text" defaultValue={(carFirstPay).toLocaleString('ko-KR')} ref={firstPayRef} onChange={(e)=>onChangeFirstPay(e)}/>
                  </div>
                </div>
            </div>
            <div className='car-second'>
              <div>
                  <input type="checkbox" id="tax" className='tax-input' name="tax" onClick={isTaxClick}/>
                  <label htmlFor="tax">
                  <strong>세금 및 부대비용</strong>
                </label>
                <span onMouseOver={()=>mouseOverEtc(2)} onMouseLeave={()=>mouseLeaveEtc(2)}>
                  <img className='tax-etc-img' src='/img/icon-etc-info.svg' alt='etc'/> 
                  <span className="etc-info" ref={el=>etcInfo.current[2]=el}>
                  예상 금액이며 변동될 수 있습니다. 자세한 내용은 상담원에게 문의해 주세요.
                </span>
                </span>
              </div>
              <span className='tax-price'>{(carTax*10000).toLocaleString('ko-KR')}원</span>
            </div>
            <div className='monthly-period-wrap'>
              <strong>할부기간</strong>
              <div className='monthly-period'>
                <label htmlFor="period12" ref={el=>periodRef.current[0] = el}>
                  <input type="radio" id='period12' name='period' className="period" value={12} onClick={(e)=>checkPeriod(e)}/>
                  12개월
                </label>
                <label htmlFor="period24" ref={el=>periodRef.current[1] = el}>
                  <input type="radio" id='period24' name='period' className="period" value={24} onClick={(e)=>checkPeriod(e)}/>
                  24개월
                </label>
                <label htmlFor="period36" className='period-checked' ref={el=>periodRef.current[2] = el}>
                  <input type="radio" id='period36' name='period' className="period" defaultChecked={true} value={36} onClick={(e)=>checkPeriod(e)}/>
                  36개월
                </label>
                <label htmlFor="period48" ref={el=>periodRef.current[3] = el}>
                  <input type="radio" id='period48' name='period' className="period" value={48} onClick={(e)=>checkPeriod(e)}/>
                  48개월
                </label>
                <label htmlFor="period60" ref={el=>periodRef.current[4] = el}>
                  <input type="radio" id='period60' name='period' className="period" value={60} onClick={(e)=>checkPeriod(e)}/>
                  60개월
                </label>
              </div>
            </div>
            <div className='cal-final'>
              <div className="cal-final-left">
                <div>
                  <span className='final-left-text'>총 할부 신청금액</span>
                  <span className='final-left-price'>{firstPay ? ((carPrice+carTax-firstPay)*10000).toLocaleString('ko-KR') :((carPrice+carTax-carFirstPay)*10000).toLocaleString('ko-KR')} 원 </span>
                </div>
                <div>
                  <span className='final-left-text'>월 납부금 (예상)</span>
                  <span className='final-left-price'>{firstPay ? (Math.round((carPrice+carTax-firstPay)/period)*10000).toLocaleString('ko-KR') :(Math.round((carPrice+carTax-carFirstPay)/period)*10000).toLocaleString('ko-KR')} 원</span>
                </div>
              </div>
              <div className="cal-final-right">
                <div className='limit-view' onClick={()=>alert('아직 개발중입니다.')}>
                  한도조회
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-car-info-right">
        <div className='summary-in-1000px'>
          구매 예상 비용
        </div>
          <div className='detail-right-wrap'>
            <span>{car.car_maker}</span>
            <span>{car.car_name}</span>
            <div className='right-info'>
              <span>{car.car_model_year.slice(2,4)}년 {car.car_model_year.slice(5,7)}월식</span><span>·</span>
              <span>{car.distance.toLocaleString('ko-KR')}km</span>
            </div>
            <div className='right-expected-price'>
              <h5>고객님의 총 구매 예상 비용</h5>
              <div className='right-detail-price'>
                <div>
                  <span>차량가</span>
                  <span>{(carPrice*10000).toLocaleString('ko-KR')} 원</span>
                </div>
                <div>
                  <span>이전등록비</span>
                  <span>{(carTax * 0.9*10000).toLocaleString('ko-KR')} 원</span>
                </div>
                <div>
                  <span>관리비용</span>
                  <span>{(carTax * 0.1*10000).toLocaleString('ko-KR')} 원</span>
                </div>
                <div>
                  <span>배송비</span>
                  <span>배송지역에 따라 달라집니다.</span>
                </div>
              </div>
              <div className='right-total-price'>
                <span>합계</span>
                <span>{((carPrice + carTax)*10000).toLocaleString('ko-KR')}원</span>
              </div>
            </div>
            <div className='right-buy-button-wrap'>
              <span>구매하기</span>
              <span>방문예약</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}
