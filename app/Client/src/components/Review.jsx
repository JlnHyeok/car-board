import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/review.css'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Review() {
  const nav = useNavigate()
  const [reviewList, setReviewList] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  useEffect(() => {
    axios.get('/review').then((data)=>(setReviewList(data.data)))
  },[])
  
  if(!reviewList){
    return <div>lodaing</div>
  }
  
  const clickWriteBtn = async() => {
    const response = await axios.get('/check-auth')
    if(response.data.success) return nav('/review/write')
    else{
      alert(response.data.msg)
      nav('/login')
    }
  }
  
  const postPerPage = 15
  const totalPostLen = reviewList.length
  const buttonLen = Math.ceil(totalPostLen / postPerPage) 
  const postList = reviewList.slice((pageNum-1)*postPerPage, pageNum * postPerPage)




  return (
      <div className='review-wrap'>
        <div className='review-header'>
          <div className='total-review-count'>전체 {reviewList.length}개</div>
          <div className='review-write-btn' onClick={clickWriteBtn}>
            글쓰기
          </div>
        </div>
        <div className='review-box'>
          <div className='review-list'>
            <span>No</span>
            <span>카테고리</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span>조회</span>
          </div>
          {postList.map((data,idx)=>(
            <div key={idx} className="review-list">
              <span>{data.idx}</span>
              <span>{data.type}</span>
              <span style={{justifyContent:'flex-start',paddingLeft:10}}>
              <Link to={`/review/${data.idx}`}>{data.title}</Link>
              </span>
              <span>{data.writer}</span>
              <span>{data.date.slice(2,10)}</span>
              <span>{data.count}</span>
            </div>
          ))}
        </div>
        <Footer buttonLen={buttonLen} pageNum={pageNum} setPageNum={setPageNum}/>
      </div>
  )
}
