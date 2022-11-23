import axios from 'axios'
import React, { useRef, useState } from 'react'
import './css/review-write.css'
import { useNavigate } from 'react-router-dom';

export default function ReviewWrite() {
  const category = useRef()
  const reviewContentRef = useRef()
  const categoryRef = useRef([])
  const [selectCategory, setSelectCategory] = useState('카테고리')
  const [reviewTitle, setReviewTitle] = useState('')
  const [writeCount, setWriteCount] = useState('')

  const nav = useNavigate()
  if(!sessionStorage.getItem('userId')){
    nav('/login')
  }

  const clickCategory = () => {
    
    category.current.classList.contains('category-clicked') ? 
    category.current.className = 'category-selected' :
    category.current.className = 'category-clicked'
  }

  const clickCategoryList = (e) => {
    if(e.target.textContent === '공지사항'){
      if(sessionStorage.getItem('userId') !== 'admin'){
        alert('공지사항은 관리자만 등록가능합니다.')
        return
      }
    }
    [categoryRef.current[0].textContent, e.target.textContent] = [e.target.textContent, categoryRef.current[0].textContent]
    setSelectCategory(categoryRef.current[0].textContent)
    // category.current.stylt.height = '20px'
  }
  
  const submitReview = async(e) => {
    e.preventDefault()
    if(selectCategory === '카테고리') return alert('카테고리를 선택해주세요.')
    if(!reviewTitle) return alert('제목을 입력해주세요.')
    if(!reviewContentRef.current.value) return alert('내용을 입력해주세요.')
    const body = {category:selectCategory, title:reviewTitle, content:reviewContentRef.current.value}
    const response = await axios.post('/reviewWrite',body)
    if(response.data.success){
      alert(response.data.msg)
      nav('/review')
      return 
    }
    else alert(response.data.msg)
  }

  return (
    <div className='review-write-wrap'>
      <div className='review-write-form-box'>
        <form className='review-write-form' onSubmit={submitReview}>
          <div className='write'>
            <span>글 쓰기</span>
          <button>작성</button>
          </div>
          <div className='review-write-title'>
            <div className='review-write-category'>
              <ul ref={category} onClick={clickCategory}>
                <li ref={el=>categoryRef.current[0] = el} onClick={(e)=>clickCategoryList(e)}>카테고리</li>
                <li ref={el=>categoryRef.current[1] = el} onClick={(e)=>clickCategoryList(e)}>공지사항</li>
                <li ref={el=>categoryRef.current[2] = el} onClick={(e)=>clickCategoryList(e)}>일반</li>
                <li ref={el=>categoryRef.current[3] = el} onClick={(e)=>clickCategoryList(e)}>후기</li>
              </ul>
            </div>
            <input type="text" placeholder='제목을 입력해주세요.' onChange={(e)=>setReviewTitle(e.target.value)}/>
          </div>
          <div className='write-count'>
            1/1000
          </div>
          <div>
            <textarea className='review-write-content' placeholder='내용을 입력해주세요.' cols="30" rows="10" ref={reviewContentRef}></textarea>
          </div>
        </form>
      </div>
    </div>
  )
}
