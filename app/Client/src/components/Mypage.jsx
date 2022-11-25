import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/mypage.css'

export default function Mypage() {
  const [userInfo, setUserInfo] = useState(null)
  const [postedCar, setPostedCar] = useState(null)
  const [buyCar, setBuyCar] = useState(null)
  const [myPost, setMyPost] = useState(null)
  const [myComment, setMyComment] = useState(null)

  const [isUserInfo, setIsUserInfo] = useState(true)
  

  const [whichShow, setWhichShow] = useState([false,false,false,false])
  const [checkPw, setCheckPw] = useState('')
  const [isShow,setIsShow] = useState(false)

  useEffect(() => {
    axios.get('/mypageUser').then((result)=>setUserInfo(result.data))
    axios.get('/mypagePostCar').then((result)=>setPostedCar(result.data))
    axios.get('/mypageMypost').then((result)=>setMyPost(result.data))
    axios.get('/mypageMycomment').then((result)=>setMyComment(result.data))
  },[])
  if(!userInfo || !postedCar || !myPost || !myComment){
    return <div>Loading</div>
  }
  const submitPw = async(e) => {
    e.preventDefault()
    const body = {id : sessionStorage.getItem('userId') ,pw : checkPw}
    const response = await axios.post('/login', body)
    if(response.data.success) setIsShow(true)
    else alert(response.data.msg)
  }

  console.log(whichShow)
  const clickShow = (e) => {
    console.log(e.target.value)
    setWhichShow((whichShow).map((data,idx)=>(data = (idx===e.target.value) ? true : false)))
    if(e.target.value < 3){
      setIsUserInfo(false)
    }
    else{
      setIsUserInfo(true)
    }
  }

  // console.log(userInfo, postedCar, myPost, myComment)

  return (
    <div className='mypage-wrap'>
      <div className='mypage-left'>
        <div className='mypage-left-user-activity'>
          <ul className='activity-box'>
            <h1>활동내역</h1>
            <li value={0} onClick={(e)=>clickShow(e)}>등록한 차량</li>
            <li value={1} onClick={(e)=>clickShow(e)}>구매한 차량</li>
            <li value={2} onClick={(e)=>clickShow(e)}>작성한 글</li>
          </ul>
        </div>
        <div className='mypage-left-user-info'>
          <ul className='activity-box'>
            <h1>회원정보</h1>
            <li value={3} onClick={(e)=>clickShow(e)}>기본정보</li>
            <li value={4} onClick={(e)=>clickShow(e)}>비밀번호 변경</li>
          </ul>
        </div>
      </div>
      <div className='mypage-right'>
        {(isShow && whichShow[0]) &&
          <div className="mypage-right-posted-car">
            {postedCar.map((car,idx)=>(
              <div key={idx} className="posted-car-list">
                <div>{car.car_name}</div>
                <div>{car.car_maker}</div>
                <div>{car.car_model_year}</div>
                <div>{car.car_price}</div>
                <div>{car.car_distance}</div>
              </div>
            ))}
        </div>}
        {(isShow && whichShow[2]) &&
          <div className='mypage-right-posts'>
            <div>
              {myPost.map((post,idx)=>(
                <div key={idx}>
                  <span>{post.category}</span>
                  <span>{post.title}</span>
                  <span>{post.date}</span>
                </div>
              ))}
            </div>
            <div>
              {myComment.map((comments,idx)=>(
                <div key={idx}>
                  <span>{comments.writer}</span>
                  <span>{comments.comment}</span>
                  <span>{comments.date}</span>
                </div>
              ))}
            </div>
          </div>}
          {isUserInfo &&
          <div className="mypage-right-user-info">
            <div className='user-info-list'>
              <span>아이디</span>
              <span>{userInfo.id}</span>
            </div>
            <div className='user-info-list'>
              <span>이름</span> 
              <span>{userInfo.name}</span>
            </div>
            <div className='user-info-list'>
              <span>가입날짜</span> 
              <span>{userInfo.date}</span>
            </div>
            {!isShow && 
            <form className='user-pw-form' onSubmit={(e)=>submitPw(e)}>
              <input type="password" placeholder='비밀번호 확인' onChange={(e)=>(setCheckPw(e.target.value))}/>
              <button>확인</button>
            </form>}
          </div>}
      </div>
    </div>
  )
}
