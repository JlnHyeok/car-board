import axios from 'axios'
import React from 'react'
import './css/login.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Login({id,setId,pw,setPw}) {
  const nav = useNavigate()
  const handleLoginSubmit = async(e) => {
    e.preventDefault()
    if(!id) return alert('아이디를 입력해주세요.')
    if(!pw) return alert('비밀번호를 입력해주세요.')
    const response = await axios.post('/login',{id : id, pw : pw})
    console.log(response.data)
    if(!response.data.success) return alert(response.data.msg)
    if(response.data.success) return nav('/')
  }

  return (
    <div className='login-wrap'>
      <div className='login-input-box'>
        <form className='login-info' onSubmit={handleLoginSubmit}>
          <input type="text" placeholder='아이디를 입력해주세요.' onChange={e=>setId(e.target.value)}/><br />
          <input type="password" placeholder='비밀번호 입력해주세요.' onChange={e=>setPw(e.target.value)}/><br />
          <button>SIGN IN</button>
        </form>
        <span>아직 회원이 아니신가요? <Link to='/register'>회원가입</Link> </span>
      </div>
    </div>
  )
}
