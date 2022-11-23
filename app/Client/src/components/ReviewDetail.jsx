import React from 'react'
import './css/review-detail.css'
import { useLocation } from 'react-router-dom';

export default function ReviewDetail() {
  const location = useLocation()
  const {reviewInfo} = location.state
  console.log(reviewInfo)
  return (
    <div className='review-detail-wrap'>
      <header className='review-detail-header'>
        <div className='review-detail-category'>
          <span>{reviewInfo.category}</span>
        </div>
        <div className='review-detail-title'>
          <span>{reviewInfo.title}</span>  
        </div>
        <div className='review-detail-writer-info'>
          <div className='review-detail-writer'>
            <span>{reviewInfo.writer}</span>
            <span>{reviewInfo.date.slice(0,16)}</span>
          </div>
          <div className='review-detail-time'>
            <span>조회 {reviewInfo.count}</span>
          </div>
        </div>
      </header>
      <textarea className='review-detail-content' disabled={true} value={reviewInfo.content}></textarea>
      <footer className='comment-wrap'>
        <div className='comment'>
          댓글창
        </div>
      </footer>
    </div>
  )
}
