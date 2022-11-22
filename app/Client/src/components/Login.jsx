import axios from 'axios'
import React, { useState } from 'react'
import './css/login.css'
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal/Modal';
import Portal from './modal/Portal';


export default function Login({id,setId,pw,setPw}) {
  const [isShowPw , setIsShowPw] = useState(false)
  const [isShowFindId, setIsShowFindId] = useState(false)
  const [isShowFindPw, setIsShowFindPw] = useState(false)

  const nav = useNavigate()

  const handleLoginSubmit = async(e) => {
    e.preventDefault()
    if(!id) return alert('아이디를 입력해주세요.')
    if(!pw) return alert('비밀번호를 입력해주세요.')
    const response = await axios.post('/login',{id : id, pw : pw})
    if(!response.data.success) return alert(response.data.msg)
    if(response.data.success){ 
      sessionStorage.setItem("userId",id)
      return nav('/')
    }
    
  }


  return (
    <div className='login-wrap'>
      {(isShowFindId || isShowFindPw) && 
      <Portal>
        <Modal isShowFindId={isShowFindId} isShowFindPw={isShowFindPw} setIsShowFindId={setIsShowFindId} setIsShowFindPw={setIsShowFindPw}/>
      </Portal>}
      <div className='login-input-box'>
        <form className='login-info' onSubmit={handleLoginSubmit}>
          <input type="text" placeholder='아이디를 입력해주세요.' onChange={e=>setId(e.target.value)}/><br />
          <span className='pw-input-box'>
            <input type={isShowPw? "text" : "password"} placeholder='비밀번호 입력해주세요.' onChange={e=>setPw(e.target.value)}/>
            <span className='pw-isvisible'><img src={isShowPw ? "./img/visible.png" :"./img/unvisible.png"} alt="visible" onClick={()=>setIsShowPw(!isShowPw)}/></span>
            <br />
          </span>
          <button>SIGN IN</button>
        </form>
        <span>아직 회원이 아니신가요? <Link to='/register'>회원가입</Link> </span>
        <div className="login-help-info">
          <span onClick={()=>setIsShowFindId(true)}>아이디 찾기</span>
          <span onClick={()=>setIsShowFindPw(true)}>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  )
}
