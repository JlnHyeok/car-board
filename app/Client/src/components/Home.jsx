import React, { useCallback, useEffect, useRef, useState } from 'react'
import './css/home.css'
import { Link } from 'react-router-dom';

export default function Home({randInt,carInfo}) {
  
  const [slideNum, setSlideNum] = useState(1)
  const [isFirstOrLast, setIsFirstOrLast] = useState(false)
  // const [isAutoPlay, setIsAutoPlay] = useState(true)
  const slideRef = useRef(1)
  let slidePre = '/img/banner'
  let slideSuf = '.png'
  let slideArr = [1,2,3,4,5]
  let realSlide = [slideArr[slideArr.length-1],...slideArr,slideArr[0]]
  let slideLen = realSlide.length
  
  // 새로고침시 제일 위로
  window.history.scrollRestoration = "manual";
  let todayCarList = []
  
  todayCarList = carInfo.filter((cars)=>cars.id === randInt[0] || cars.id === randInt[1] || cars.id === randInt[2])
  
  // console.log(todayCarList)
  
  const prevSlide = () => {
    setIsFirstOrLast(false)
    if(slideNum === 1){
      slideRef.current--
      setSlideNum(slideRef.current)
      slideRef.current = slideLen - 2
      setTimeout(()=>{
        setIsFirstOrLast(true)
        setSlideNum(slideRef.current)
      },400)
      return
    }
    slideRef.current--
    setSlideNum(slideRef.current)
  }

  // 자동으로 슬라이드 구현하기위해 useCallback 사용
  const nextSlide = useCallback(() => {
    if(slideRef.current===1) setIsFirstOrLast(false)
    
    if(slideRef.current >= slideLen-2){
      slideRef.current++
      setSlideNum(slideRef.current)
      setTimeout(()=>{
        setIsFirstOrLast(true)
        setSlideNum(slideRef.current)
      },400)
      slideRef.current = 1
      return
    }
    slideRef.current++
    setSlideNum(slideRef.current)
    },
    [slideLen],
  )
  

  const onClickSlideNum = (i) => {
    slideRef.current = i
    setSlideNum(i)
  }

  useEffect(() => {
    const a = setInterval(nextSlide,4000)
    if(a===6){
      clearInterval(a)
    }
  },[nextSlide])

  if(todayCarList === undefined){
    return (<div>Loading..</div>)
  }
  return (
    <div className="home-wrap">
      <div className="banner-for-hide">
        <div className='slide-btn-prev' onClick={prevSlide}
        >
          {'<'}
        </div>
        <div className="banner" style={{
          width:slideLen * 100+'%', 
          transform:`translateX(-${(100/slideLen)*slideNum}%)`,
          transition:isFirstOrLast ? '0s' : '0.4s'
          }}>
          {realSlide.map((slide,i)=>(
            <img key={i} src={slidePre+slide+slideSuf} alt='banner' style={{width:(100/slideLen)+'%'}} />
          ))}
        </div>
        <div className='slide-btn-next' onClick={nextSlide}
        >
          {'>'}
        </div>
      </div>
      <div>
        {slideArr.map((list)=>(
          <button key={list} className='slide-click-btn' onClick={()=>(onClickSlideNum(list))} style={{backgroundColor:list===slideRef.current?'#e61332':'white'}}></button>
        ))}
      </div>
      <div className='today-pick-car'>
        <div className='today-car-title'>
          오늘의 추천
        </div>
        <div className='home-car-list-wrap'>
          {todayCarList.map((cars)=>(
            <div key={cars.id} className='pick-car-list'>
              <div className='pick-car-img-box'>
                <Link to={`/buy/${cars.id}`}><img src={cars.car_image} alt="car" onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})}/></Link>
              </div>
              <div>
                <span className='pick-car-maker'>{cars.car_maker+' '+cars.car_name}</span>
                <span className='pick-car-price' style={{fontWeight:'bold'}}>{cars.car_price.toLocaleString('ko-KR')}만원</span>
                <span className='pick-car-year'>{cars.car_model_year.slice(2,4)+'년 '+cars.car_model_year.slice(5,7)+'월식 '}</span>
                <span className='pick-car-distance'>{cars.distance.toLocaleString('ko-KR')}km</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='icon-list'>
        <img src="/img/icon-sns-facebook.svg" alt="" />
        <img src="/img/icon-sns-instagram.svg" alt="" />
        <img src="/img/icon-sns-cafe.svg" alt="" />
        <img src="/img/icon-sns-blog.svg" alt="" />
      </div>
      <div className='copy'>Copyright © 내가만든 사이트 All Rights Reserved</div>
    </div>
  )
}
