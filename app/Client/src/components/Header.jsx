import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import './css/header.css'

export default function Header({
  setSearchValue,setIsSearch,setPageNum,setEasySearchSort,setIsAdmin,isAdmin}) {
  const divBarRef = useRef([])
  const navListRef = useRef()
  let nav = useNavigate()
  let location = useLocation()

  // 슬라이드 바 이동
  const firstPageSlideBar = () => {
    if(location.pathname === '/') return handleSlideBar()
    else if(location.pathname === '/sell') return handleSlideBar(0)
    else if(location.pathname.includes('buy')) return handleSlideBar(1)
    else if(location.pathname.includes('review')) return handleSlideBar(2)
    handleSlideBar()
  }
  useEffect(() => {
    firstPageSlideBar()
  })

   // 메뉴 언더바
  const handleSlideBar = (i) => {
    divBarRef.current.forEach((current,idx)=>{
      if(i===idx){
        current.style.width = '100%'
      }
      else{
        current.style.width ='0px'
      }
    })
  }

  // 다른 페이지 이동했다가 다시 buy 페이지 올 때 초기화
  const handleResetBuyPage = () => {
    inputRef.current.value=''
    // 다른 페이지 이동했다가 다시
    setEasySearchSort({
      maker:[],dis:[null,null],price:[null,null],year:[null,null]})
    setIsSearch('')
  }
  
  // 모바일 버전 nav 숨기기
  const [isMenuHide, setIsMenuHide] = useState(true)

  const inputRef = useRef()
  // 검색기능 누르면
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchValue(inputRef.current.value)
    // inputRef.current.value=''
    setPageNum(1)
    setIsSearch(true)
    nav('/buy')
  }

  const clickAdmin = () => {
    setIsAdmin(prev=>!prev)
  }

  const clickLogOut = async() => {
    sessionStorage.clear()
    const response = await axios.get('/logout')
    if(response.data.success){
      nav('/')
      window.location.reload()
      return
    }
  }

  const checkAuth = async() => {
    const response = await axios.get('/check-auth')
    console.log('권한 체크 '+response.data)
    if(response.data.success && !sessionStorage.getItem('userId')){
      sessionStorage.setItem('userId',response.data.userId)
      console.log('성공')
    }
  }
  


  return (
    <>
      <div className={isMenuHide ?'mobile-menu menu-hide' : 'mobile-menu'}>
        <Link to='/sell'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>판매 등록</span>
        </Link>
        <Link to='/buy'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>차 구매</span>
        </Link>
        <Link to='/review'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>게시판</span>
        </Link>
      </div>
      
      <div className='header'>
        <div className="logo">
          <Link to="/"
            onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})}
            >
            <img src="/img/logo3.png" alt="logo" />
          </Link>
            <span className='admin-controll' onClick={clickAdmin} style={{
              color:isAdmin?'#b70f28':'transparent'
            }}>
            관리자 로그인
            </span>
        </div>
        <div className="nav">
          <Link to='/sell'>
            <div className='nav-list' ref={navListRef}
            >
            판매 등록
              <div ref={(el)=>divBarRef.current[0]=el}></div>
            </div>
          </Link>
          <Link onClick={handleResetBuyPage} to='/buy'>
            <div className='nav-list'         
            >
              차 구매 
              <div ref={(el)=>divBarRef.current[1]=el}></div>
            </div>
          </Link>
          <Link to='review'>
            <div className='nav-list'
            >
            게시판
            <div ref={(el)=>divBarRef.current[2]=el}></div>
            </div>
          </Link>
        </div>
        <div className="search">
          {
          sessionStorage.getItem('userId') ? 
          <div className='loggedin-box' ref={(el)=>divBarRef.current[3]=el}>
            <span className='welcome-span'>{sessionStorage.getItem('userId')}님</span>
            <span className='mypage-span'><Link to='/mypage' onClick={checkAuth}>마이페이지</Link></span>
            <span className='logout-span'onClick={clickLogOut}>로그아웃</span>
          </div> : 
          <div className='login-box'>
            <Link to='login'><span>로그인</span></Link>
            <Link to='register'><span>회원가입</span></Link>
          </div>
          }
          <div className="hambergur">
            <span className='hamb-icon' onClick={()=>setIsMenuHide(!isMenuHide)}
            >≡
            </span>
          </div>
          <div className="search-area">
            <form onSubmit={handleSearch}>
              <input type="text" ref={inputRef} placeholder='ex) audi'/>
              <button className='search-btn'>
                <img src="/img/search.svg" alt="돋보기" />
              </button>
            </form>
          </div>
          <Link to='/'>
            <div className="mobile-home">
              Home
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
