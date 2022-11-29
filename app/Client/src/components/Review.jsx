import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/review.css'
import { Link, useNavigate } from 'react-router-dom';
import FooterReview from './FooterReview';
import Portal from './modal/Portal';
import Modal from './modal/Modal';

export default function Review() {
  const nav = useNavigate()
  const [reviewList, setReviewList] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [isReviewLoading, setIsReviewLoading] = useState(false)

  useEffect(() => {
    axios.get('/reviewList').then((data)=>(setReviewList(data.data)))
  },[])
  
  const clickReviewTitle = async(idx) => {
    const response = await axios.get(`/reviewClick/${idx}`)
    if(!response.data.success) return alert(response.data.msg)
  }
  
  const clickWriteBtn = async() => {
    setIsReviewLoading(true)
    const response = await axios.get('/check-auth')
    if(response.data.success) nav('/review/write')
    else if(sessionStorage.getItem('userId') && !response.data.success){
      sessionStorage.clear()
      alert('세션이 만료되었습니다.')
      window.location.reload()
    }
    else{
      const move = window.confirm(response.data.msg)
      if(move) nav('/login')
    }
    setIsReviewLoading(false)
  }
  
  if(!reviewList){
    return <div>Loading</div>
  }
  const postPerPage = 15
  const notiList = reviewList.filter((data)=>(data.category==='공지사항'))
  const notiLength = notiList.length
  const normalReviewList = reviewList.filter((data)=>(data.category!=='공지사항'))
  
  const totalPostLen = reviewList.length
  const buttonLen = Math.ceil(totalPostLen / postPerPage)
  const postListwithNoti = [...notiList,...normalReviewList.slice(0,postPerPage-notiLength)] 
  const postList = normalReviewList.slice((postPerPage-notiLength)+(pageNum-2)* postPerPage, (postPerPage-notiLength)+(pageNum - 1)* postPerPage)

  return (
    <div className='review-wrap'>
      {isReviewLoading &&
      <Portal>
        <Modal isReviewLoading={isReviewLoading}/>
      </Portal>}
      <div className='review-header'>
        <div className='total-review-count'>전체 {reviewList.length}개</div>
        <div className='review-write-btn' onClick={clickWriteBtn}>
          글쓰기
        </div>
      </div>
      <div className='review-box'>
        <div className='review-list review-list-title'>
          <span>No</span>
          <span>카테고리</span>
          <span>제목</span>
          <span>작성자</span>
          <span>작성일</span>
          <span>조회</span>
        </div>
        {pageNum === 1 ?
        postListwithNoti.map((data,idx)=>(
          <div key={idx} className="review-list review-post">
            <span>{totalPostLen-idx}</span>
            <span style={{color:data.category === '공지사항' ? 'red' : data.category === '후기' ? 'green' : 'black'}}>{data.category}</span>
            <span style={{justifyContent:'flex-start',paddingLeft:10}}>
              <Link to={`/review/${data.idx}`} state={{reviewInfo : data}} onClick={()=>clickReviewTitle(data.idx)}>
                {data.title}
                <span className='review-list-comment-count'>[{data.comment}]</span>
              </Link>
            </span>
            <span>{data.writer}</span>
            <span>{window.innerWidth <540 ? data.date.slice(5,10) : data.date.slice(2,10)}</span>
            <span>{data.count}</span>
          </div>
        )) :
        postList.map((data,idx)=>(
          <div key={idx} className="review-list review-post">
          <span>{totalPostLen - (pageNum-1)*postPerPage - idx}</span>
          <span style={{color:data.category === '공지사항' ? 'red' : data.category === '후기' ? 'green' : 'black'}}>{data.category}</span>
          <span style={{justifyContent:'flex-start',paddingLeft:10}}>
              <Link to={`/review/${data.idx}`} state={{reviewInfo : data}} onClick={()=>clickReviewTitle(data.idx)}>
                {data.title}
              </Link>
              <span className='review-list-comment-count'>[{data.comment}]</span>
            </span>
            <span>{data.writer}</span>
            <span>{data.date.slice(2,10)}</span>
            <span>{data.count}</span>
            </div>
            ))
          }
      </div>
      <FooterReview buttonLen={buttonLen} pageNum={pageNum} setPageNum={setPageNum} setReviewList={setReviewList}/>
    </div>
  )
}
