import React, { useState } from 'react'
import './css/mypage.css'

export default function Mypage() {
  



  return (
    <div className='mypage-wrap'>
      <div className='mypage-left'>
        <div className='mypage-left-user-activity'>
          <ul className='activity-box'>
            <h1>활동내역</h1>
            <li>등록한 차량</li>
            <li>구매한 차량</li>
            <li>작성한 글</li>
          </ul>
        </div>
        <div className='mypage-left-user-info'>
          <h1>회원정보</h1>
        </div>
      </div>
      <div className='mypage-right'>

      </div>
    </div>
  )
}
