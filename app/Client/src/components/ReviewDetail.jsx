import React from 'react'
import './css/review-detail.css'
import { useLocation } from 'react-router-dom';

export default function ReviewDetail() {
  const location = useLocation()
  const {reviewInfo} = location.state
  console.log(reviewInfo)
  return (
    <div className='review-detail-wrap'>
      <header className='review-detail-title'>
        <div className='review-detail-category'>
          {reviewInfo.category}
        </div>
        <div className='review-detail-title'>
        제목 : {reviewInfo.title}
        </div>
        <div className='review-detail-writer'>
        작성자 :{reviewInfo.writer}
        </div>
        <div className='review-detail-time'>
        시간 :{reviewInfo.date.slice(0,16)} 조회 :{ reviewInfo.count}
        </div>
      </header>
      <textarea className='review-detail-content' disabled={true} value={reviewInfo.content}></textarea>
      <footer>
        
      </footer>
    </div>
  )
}
