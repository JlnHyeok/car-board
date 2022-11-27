import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/mypage.css'

export default function Mypage() {
  const [userInfo, setUserInfo] = useState(null)
  const [postedCar, setPostedCar] = useState(null)
  const [buyCar, setBuyCar] = useState(null)
  const [myPost, setMyPost] = useState(null)
  const [myComment, setMyComment] = useState(null)

  const [isUserInfo, setIsUserInfo] = useState(true)
  

  const [whichShow, setWhichShow] = useState([false,false,false,false,false])
  const [checkPw, setCheckPw] = useState('')
  const [isShow,setIsShow] = useState(false)

  useEffect(() => {
    axios.get('/mypageUser').then((result)=>setUserInfo(result.data))
    axios.get('/mypagePostCar').then((result)=>setPostedCar(result.data))
    axios.get('/mypageMypost').then((result)=>setMyPost(result.data))
    axios.get('/mypageMycomment').then((result)=>setMyComment(result.data))
  },[])
  if(!userInfo){
    return <div>Loading</div>
  }
  const submitPw = async(e) => {
    e.preventDefault()
    const body = {id : sessionStorage.getItem('userId') ,pw : checkPw}
    const response = await axios.post('/login', body)
    if(response.data.success) setIsShow(true)
    else alert(response.data.msg)
  }
  const submitChangePw = async(e) => {
    e.preventDefault()
  }

  console.log(whichShow)
  const clickShow = (e) => {
    if(!isShow) return alert('비밀번호를 입력해주세요.')
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
        <div className='mypage-left-box'>
          <div className='mypage-left-user-activity'>
            <ul className='activity-box'>
              <h1>활동내역</h1>
              <li value={0} onClick={(e)=>clickShow(e)} style={{color:whichShow[0] && 'red'}}>등록한 차량</li>
              <li value={1} onClick={(e)=>clickShow(e)} style={{color:whichShow[1] && 'red'}}>구매한 차량</li>
              <li value={2} onClick={(e)=>clickShow(e)} style={{color:whichShow[2] && 'red'}}>작성한 글</li>
            </ul>
          </div>
          <div className='mypage-left-user-info'>
            <ul className='activity-box'>
              <h1>회원정보</h1>
              <li value={3} onClick={(e)=>clickShow(e)} style={{color:whichShow[3] && 'red'}}>기본정보</li>
              <li value={4} onClick={(e)=>clickShow(e)} style={{color:whichShow[4] && 'red'}}>비밀번호 변경</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mypage-right'>
        {(isShow && whichShow[0]) &&
          <>
          <h1>등록한 차량</h1>
          <div className='right-up'>
            <h1>총 <span className='num-of-car'>{postedCar.length.toLocaleString('ko-KR')}</span>대</h1>
          </div>
          <div className='mypage-right-car-list'>
            {postedCar.map((data)=>(
              <div className='post' key={data.id}>
                <div className='img'>
                  <Link to={`/buy/${data.id}`} onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})}><img src={data.car_image} alt="차량" /></Link>
                </div>
                <div className="car-info">
                  <span>{data.car_maker +' '}{data.car_name}</span>
                  <span style={{fontWeight:'bold'}}>{data.car_price.toLocaleString('ko-KR')}만원</span>
                  <span style={{fontSize:13,color:'#54555a'}}>{data.car_model_year.slice(2,4)}년 {data.car_model_year.slice(5,7)}월식 · {data.distance.toLocaleString('ko-KR')}km</span>
                </div>
              </div>
            ))}
          </div>
          </>
        }
        {(isShow && whichShow[1]) &&
          <>
            <h1>구매한 차량</h1>
            <div className='mypage-right-buy-cars'>
            </div>
          </>
        }
          
        {(isShow && whichShow[2]) &&
        <>
        <div className='mypage-right-posts'>
          <div className='posts-post'>
            <h1>작성한 글</h1>
            {myPost.map((post,idx)=>(
              <div className='posts-postlist' key={idx}>
                <span>{post.category}</span>
                <span>
                  <Link to = {`/review/${post.idx}`}>
                    {post.title}
                  </Link>
                </span>
                <span>{post.date}</span>
              </div>
            ))}
          </div>
          <div className='posts-comment'>
            <h1>작성한 댓글</h1>
            {myComment.map((comments,idx)=>(
              <div className='posts-commentlist' key={idx}>
                <span>{comments.writer}</span>
                <span>
                  <Link to={`/review/${comments.post_idx}`}>
                    {comments.comment}
                  </Link>
                </span>
                <span>{comments.date}</span>
              </div>
            ))}
          </div>
        </div>
        </>
          }
          {isUserInfo &&
          <div className="mypage-right-user-info">
            <div className='user-info-list'>
              <span>아이디</span>
              <span>{userInfo.id}</span>
            </div>
            {isShow && 
            <>
            <div className='user-info-list'>
              <span>이름</span> 
              <span>{userInfo.name}</span>
            </div>
            <div className='user-info-list'>
              <span>가입날짜</span> 
              <span>{userInfo.date}</span>
            </div>
            </>
            }
            {!isShow && 
              <form className='user-pw-form' onSubmit={(e)=>submitPw(e)}>
                <input type="password" placeholder='비밀번호 확인' onChange={(e)=>(setCheckPw(e.target.value))}/>
                <button>확인</button>
              </form>}
            {(isShow && whichShow[4]) &&
              <form className='user-pw-change-form' onSubmit={(e)=>submitChangePw(e)}>
                <input type="text" placeholder='변경할 비밀번호를 입력해주세요.'/>
                <input type="text" placeholder='비밀번호 확인'/>
                <button>확인</button>
              </form>
            }
          </div>}
      </div>
    </div>
  )
}
