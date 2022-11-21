import axios from 'axios'
import React, { useState } from 'react'
import '.././css/modal.css'

export default function Modal({isShowModal,isSellModal,isShowFindId,isShowFindPw,setIsShowFindId,setIsShowFindPw}) {

  const [isFindId, setIsFindId] = useState(false)
  const [isFindPw, setIsFindPw] = useState(false)
  const [findId, setFindId] = useState('')
  const [findedId, setFindedId] = useState('')
  const [findPwName, setFindPwName] = useState('')
  const [findPwId, setFindPwId] = useState('')
  const [changePw, setChangePw] = useState('')
  const [changePwConfirm, setChangePwConfirm] = useState('')

  const clickCloseModal = () => {
    setIsShowFindId(false)
    setIsShowFindPw(false)
  }
  const clickFindIdBtn = async(e) => {
    e.preventDefault()
    const body = {name : findId}
    const response = await axios.post('/findId', body)
    console.log(response.data)
    
    if(response.data.success){
      setIsFindId(true)
      setFindedId(response.data.data.map((data)=>({id:data.id,date:data.date})))
    }
    else{
      setIsFindId(false)
      alert(response.data.msg)
    }
  }
  const clickFindPwBtn = async(e) => {
    e.preventDefault()
    const body = {name: findPwName, id: findPwId}
    const response = await axios.post('/findPw', body)
    if(response.data.success){
      setIsFindPw(true)
    }
    else{
      setIsFindPw(false)
      alert(response.data.msg)
    }
  }
  const clickChangePw = async(e) => {
    e.preventDefault()
    if(!changePw) return alert('비밀번호를 입력해주세요')
    if(changePw !== changePwConfirm) return alert('비밀번호가 다릅니다.')
    const body = {pw:changePw}
    const response = await axios.put('/changePw',body)
    if(response.data.success){
      alert(response.data.msg)
      setIsFindPw(false)
      setIsShowFindPw(false)
    }
    else{
      alert(response.data.msg)
    }
  }
  return (
    <div className='modal-wrap' style={{height:isSellModal ? 1175 : '100vh'}}>
      {isShowModal &&
      <div className='register-loading'>
        <span>회원가입 진행중...</span>
      </div>}
      {isSellModal &&
      <div className="sell-loading">
        <span>판매 등록중...</span>
      </div>
      }
      {isShowFindId &&
        <div className="find-id" style={{height:!isFindId?230:430}}>
          <div className='close-find-modal' onClick={clickCloseModal}>
            X
          </div>
          <div className="">
            <form className='find-id-input-form'  onSubmit={clickFindIdBtn} style={{height:!isFindId?150:350}}>
              {!isFindId ?
              <>
              <input className='find-id-input' type="text" placeholder='가입하신 이름을 적어주세요.' onChange={(e)=>{setFindId(e.target.value)}}/>
              <button className='find-id-input-btn'>아이디 찾기</button> 
              </>:
              <>
              <div className="find-id-result-wrap">
                <div className='find-id-input-result-title'>
                  <span>아이디</span><span>가입날짜</span>
                </div>
                <div className='find-id-input-result'>
                  {findedId.map((data,idx)=>
                  <div className='find-id-input-result-box' key={idx}>
                    <span>
                      {data.id}
                    </span>
                    <span>
                      {data.date.slice(0,4)}년 {data.date.slice(5,7)}월 {data.date.slice(8,10)}일
                    </span>
                  </div>)}
                </div>
              </div>
              <button onClick={clickCloseModal}>닫기</button>
              </>
              }
            </form>
          </div>
        </div>
      }
      {isShowFindPw &&
        <div className="find-pw">
          <div className='close-find-modal' onClick={clickCloseModal}>
            X
          </div>
          {!isFindPw ? 
          <div className="find-pw-input">
            <form className='find-pw-input-form'  onSubmit={clickFindPwBtn}>
              <input type="text" name='name' placeholder='가입하신 이름을 적어주세요.' onChange={(e)=>{setFindPwName(e.target.value)}}/>
              <input type="text" name='name' placeholder='가입하신 아이디를 적어주세요.' onChange={(e)=>{setFindPwId(e.target.value)}}/>
              <button>비밀번호 찾기</button>
            </form>
          </div> :
            <form className='find-pw-change-form' onSubmit={clickChangePw}>
              <input type="password" name='pw' placeholder='변경할 비밀번호 입력' onChange={(e)=>{setChangePw(e.target.value)}} />
              <input type="password" name='pw-confirm' placeholder='변경할 비밀번호 확인' onChange={(e)=>{setChangePwConfirm(e.target.value)}}/>
              <button>확인</button>
            </form>
          }
        </div>
      }
    </div>
  )
}
