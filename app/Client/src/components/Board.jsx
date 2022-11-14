/** eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import './css/board.css'
import Footer from './Footer';
import { Link, } from 'react-router-dom';
import axios from 'axios';

export default function Board({
  postList,totalCar,buttonLen,pageNum,setPageNum,carMaker,setEasySearchSort,easySearchSort,disList,priceList,yearList,isAdmin,setCarInfo,carInfo
}) {
  const searchRef = useRef([])
  const rightDownRef = useRef()
  const disInputRef = useRef([])
  const priceInputRef = useRef([])
  const yearInputRef = useRef([])
  
  // 간편메뉴 조절 관련들
  const [isShowEasySearch, setIsShowEasySearch] = useState(true) // 원래 false였다가 고침
  const [isShowMaker, setIsShowMaker] = useState(false)
  const [isShowDistance, setIsShowDistance] = useState(false)
  const [isShowYear, setIsShowYear] = useState(false)
  const [isShowPrice, setIsShowPrice] = useState(false)

  // const [minDistance, setMinDistance] = useState(minDis)
  // const [maxDistance, setMaxDistance] = useState(maxDis)

  useEffect(() => {
    // 모바일 화면때 페이지 전환시 스크롤 위로 초기화
    rightDownRef.current.scrollTop=0
  },[pageNum])

  // 간편 검색 컨트롤
  const easyMenuCont = () => {
    function checkFlag(isState, setState){
      isState && setState(!isState)
    }
    checkFlag(isShowMaker, setIsShowMaker)
    checkFlag(isShowDistance, setIsShowDistance)
    checkFlag(isShowPrice, setIsShowPrice)
    checkFlag(isShowYear, setIsShowYear)
    setIsShowEasySearch(!isShowEasySearch)
  }

  // 제조사 목록 체크한것들 목록 업데이트
  const checkMaker = (e) => {
    if(easySearchSort.maker.indexOf(e.target.textContent) === -1){
      setEasySearchSort({...easySearchSort,
        maker:[...easySearchSort.maker, e.target.textContent]})
    }
    else{
      setEasySearchSort({...easySearchSort,
        maker :easySearchSort.maker.filter((newmaker)=>newmaker !== e.target.textContent)})
    }
  }

  // 거리 최솟값 구하기
  const setMinDis = (e) => {
    // console.log(e.target.value)
    if(easySearchSort.dis[1]){
      setEasySearchSort({...easySearchSort,
      dis:[parseInt(e.target.value), parseInt(easySearchSort.dis[1])].sort((a,b)=>(a-b))})
      if(parseInt(e.target.value) > parseInt(disInputRef.current[1].value)){
        [disInputRef.current[0].value , disInputRef.current[1].value] =
        [disInputRef.current[1].value , disInputRef.current[0].value]
      }
    }
    else{
      setEasySearchSort({...easySearchSort,
      dis:[e.target.value, disList[disList.length-1]]})
    }
  }

  // 거리 최댓값 구하기
  const setMaxDis = (e) => {
    if(easySearchSort.dis[0]){
      (
        easySearchSort.dis[0] === -1 ? 
        setEasySearchSort({...easySearchSort,
        dis:[easySearchSort.dis[0], e.target.value]}) :
        setEasySearchSort({...easySearchSort,
        dis:[parseInt(easySearchSort.dis[0]), parseInt(e.target.value)].sort((a,b)=>(a-b))})
      )
      if(parseInt(e.target.value) < parseInt(disInputRef.current[0].value)){
        [disInputRef.current[0].value , disInputRef.current[1].value] =
        [disInputRef.current[1].value , disInputRef.current[0].value]
      }
      console.log(easySearchSort)
    }
    else{
      setEasySearchSort({...easySearchSort,
      dis:[-1, e.target.value]})
    }
  }

  // 금액 최솟값
  const setMinPrice = (e) => {
    console.log('최솟값 : '+e.target)
    console.log(parseInt(e.target.value) > parseInt(priceInputRef.current[1].value))
    if(easySearchSort.price[1]){
      setEasySearchSort({...easySearchSort,
      price:[parseInt(e.target.value), parseInt(easySearchSort.price[1])].sort((a,b)=>(a-b))})
      if(parseInt(e.target.value) > parseInt(priceInputRef.current[1].value)){
        [priceInputRef.current[0].value , priceInputRef.current[1].value] =
        [priceInputRef.current[1].value , priceInputRef.current[0].value]
      }
    }
    else{
      setEasySearchSort({...easySearchSort,
      price:[e.target.value, priceList[priceList.length-1]]})
    }
    console.log('최솟값 누를때 배열 :'+easySearchSort.price)
  }

  
  // 금액 최댓값 구하기
  const setMaxPrice = (e) => {
    console.log('최댓값 : '+e.target.value)
    console.log(parseInt(e.target.value) < parseInt(priceInputRef.current[0].value))
    if(easySearchSort.price[0]){
      (
        easySearchSort.price[0] === -1 ? 
        setEasySearchSort({...easySearchSort,
        price:[easySearchSort.price[0], e.target.value]}) :
        setEasySearchSort({...easySearchSort,
        price:[parseInt(easySearchSort.price[0]), parseInt(e.target.value)].sort((a,b)=>(a-b))})
      )
      if(parseInt(e.target.value) < parseInt(priceInputRef.current[0].value)){
        [priceInputRef.current[0].value , priceInputRef.current[1].value] =
        [priceInputRef.current[1].value , priceInputRef.current[0].value]
      }
    }
    else{
      setEasySearchSort({...easySearchSort,
      price:[-1, e.target.value]})
    }
    console.log('최댓값 떄의 배열 '+easySearchSort.price)
  }

  // 년도 최솟값
  const setMinYear = (e) => {
    // console.log('최솟값 : '+e.target)
    // console.log(parseInt(e.target.value) > parseInt(yearInputRef.current[1].value))
    if(easySearchSort.year[1]){
      setEasySearchSort({...easySearchSort,
      year:[parseInt(e.target.value), parseInt(easySearchSort.year[1])].sort((a,b)=>(a-b))})
      if(parseInt(e.target.value) > parseInt(yearInputRef.current[1].value)){
        [yearInputRef.current[0].value , yearInputRef.current[1].value] =
        [yearInputRef.current[1].value , yearInputRef.current[0].value]
      }
    }
    else{
      setEasySearchSort({...easySearchSort,
      year:[e.target.value, yearList[yearList.length-1]]})
    }
    // console.log('최솟값 누를때 배열 :'+easySearchSort.year)
  }

  // 년도 최댓값 구하기
  const setMaxYear = (e) => {
    console.log('최댓값 : '+e.target.value)
    // console.log(parseInt(e.target.value) < parseInt(yearInputRef.current[0].value))
    if(easySearchSort.year[0]){
      (
        easySearchSort.year[0] === -1 ? 
        setEasySearchSort({...easySearchSort,
        year:[easySearchSort.year[0], e.target.value]}) :
        setEasySearchSort({...easySearchSort,
        year:[parseInt(easySearchSort.year[0]), parseInt(e.target.value)].sort((a,b)=>(a-b))})
      )
      if(parseInt(e.target.value) < parseInt(yearInputRef.current[0].value)){
        [yearInputRef.current[0].value , yearInputRef.current[1].value] =
        [yearInputRef.current[1].value , yearInputRef.current[0].value]
      }
    }
    else{
      setEasySearchSort({...easySearchSort,
      year:[-1, e.target.value]})
    }
    // console.log('최댓값 떄의 배열 '+easySearchSort.price)
  }

  const clickDeleteBtn = async(target) => {
    console.log(target)
    let confirmDelete = window.confirm('삭제하시겠습니까?')
    if(confirmDelete){
      await axios.delete(process.env.REACT_APP_API_URL+'/delete', {data:{id:target.id}})
      await axios.get(process.env.REACT_APP_API_URL+'/selectAll').then((result)=>{setCarInfo(result.data)})
      return
    }
  }
  if(postList === undefined){
    return (<div>Loading..</div>)
  }
  return ( 
    <>
      <main className='board'>
        <div className='left'>
          <div className='left-title' onClick={easyMenuCont}>
            <h1>간편 검색</h1>
          </div>
          <div className={!isShowEasySearch ?'easy-search-box' : 'easy-search-box-show'}>
            <div className={!isShowEasySearch ? 'maker-search' : (!isShowMaker ? 'maker-search' : 'maker-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowMaker(!isShowMaker)}>제조사</div>
              <div className={!isShowEasySearch ? 'maker-wrap is-hidden' : (!isShowMaker ? 'maker-wrap is-hidden' : 'maker-wrap')}
                  ref={el=>searchRef.current[0]=el}>
                  {carMaker.map((maker,i)=>(
                <div key={i} onClick={(e)=>checkMaker(e)}
                  className = {(easySearchSort.maker.indexOf(maker)>-1) ? 'checked' : ''}
                >
                  {maker}
                </div>
                ))}
              </div>
            </div>
            <div className={!isShowEasySearch ? 'distance-search' : (!isShowDistance ? 'distance-search' : 'distance-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowDistance(!isShowDistance)}>주행 거리</div>
              <div className='distance-wrap' ref={el=>searchRef.current[1]=el}>
                <div className='dis-select-wrap'>
                  <select className="search-select" name="minDisName" id="minDisId" onChange={(e)=>setMinDis(e)} ref={el=>disInputRef.current[0]=el}>
                    <option value="0">
                      최소
                    </option>
                    {disList.map((dis, idx)=>(
                      <option key={idx+'mindis'} value={dis}>{dis.toLocaleString('ko-KR')}km</option>
                    ))}
                  </select>
                  <span>~</span>
                  <select className="search-select" name="MaxDisName" id="MaxDisId" onChange={(e)=>setMaxDis(e)} ref={el=>disInputRef.current[1]=el}>
                    <option value={disList[disList.length-1]}>최대</option>
                    {disList.map((dis, idx)=>(
                      <option key={idx+'maxdis'} value={dis}>{dis.toLocaleString('ko-KR')}km</option>
                    ))}
                  </select>                  
                </div>
              </div>            
            </div>
            <div className={!isShowEasySearch ? 'year-search' : (!isShowYear ? 'year-search' : 'year-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowYear(!isShowYear)}>년식</div>
              <div className='year-wrap' ref={el=>searchRef.current[2]=el}>
                <select className="search-select" name="minYearName" id="minYearId" onChange={(e)=>setMinYear(e)} ref={el=>yearInputRef.current[0]=el}>
                  <option value={yearList[0]}>
                    최소
                  </option>
                  {yearList.map((year, idx)=>(
                    <option key={idx+'minYear'} value={year}>{year}년</option>
                  ))}
                </select>
                <span>~</span>
                <select className="search-select" name="MaxYearName" id="MaxYearId" onChange={(e)=>setMaxYear(e)} ref={el=>yearInputRef.current[1]=el}>
                  <option value={yearList[yearList.length-1]}>최대</option>
                  {yearList.map((year, idx)=>(
                    <option key={idx+'maxyear'} value={year}>{year}년</option>
                  ))}
                </select> 
              </div>
            </div>
            <div className={!isShowEasySearch ? 'price-search' : (!isShowPrice ? 'price-search' : 'price-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowPrice(!isShowPrice)}>가격</div>
              <div className='price-wrap' ref={el=>searchRef.current[3]=el}>
                <div className='price-select-wrap'>
                  <select className="search-select" name="minPriceName" id="minPriceId" onChange={(e)=>setMinPrice(e)} ref={el=>priceInputRef.current[0]=el}>
                    <option value="0">
                      최소
                    </option>
                    {priceList.map((price, idx)=>(
                      <option key={idx+'minprc'} value={price}>{price.toLocaleString('ko-KR')}만원</option>
                    ))}
                  </select>
                  <span>~</span>
                  <select className="search-select" name="maxPriceName" id="maxPriceId" onChange={(e)=>setMaxPrice(e)} ref={el=>priceInputRef.current[1]=el}>
                    <option value={priceList[priceList.length-1]}>
                      최대
                    </option>
                    {priceList.map((price, idx)=>(
                      <option key={idx+'maxprc'} value={price}>{price.toLocaleString('ko-KR')}만원</option>
                    ))}
                  </select>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='right-up'>
            <h1>총 <span className='num-of-car'>{totalCar.toLocaleString('ko-KR')}</span>대</h1>
          </div>
          <div className='right-down' ref={rightDownRef}>
            {postList.map((data)=>(
              <div className='post' key={data.id}>
                <div className='img'>
                  <Link to={`/buy/${data.id}`} onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})}><img src={data.car_image} alt="차량" /></Link>
                </div>
                <div className="car-info">
                  <span>{data.car_maker +' '}{data.car_name}</span>
                  <span style={{fontWeight:'bold'}}>{data.car_price.toLocaleString('ko-KR')}만원</span>
                  <span style={{fontSize:13,color:'#54555a'}}>{data.car_model_year.slice(2,4)}년 {data.car_model_year.slice(5)}월식 · {data.distance.toLocaleString('ko-KR')}km</span>
                </div>
                <div className='delete-btn' onClick={()=>clickDeleteBtn(data)}
                style={{opacity:isAdmin?1:0, visibility:isAdmin?'visible':'hidden',}}>
                  X
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer buttonLen={buttonLen}
        pageNum={pageNum} setPageNum={setPageNum}
        />
    </>
  )
}
