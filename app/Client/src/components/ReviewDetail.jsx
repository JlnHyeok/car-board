import React, { useEffect, useRef, useState } from 'react'
import './css/review-detail.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ReviewDetail() {
  const location = useLocation()
  const {reviewInfo} = location.state
  const commentInputRef = useRef([])
  const [commentList, setCommentList] = useState(null)

  useEffect(() => {
    axios.get(`/comment/${reviewInfo.idx}`).then((comment)=>setCommentList(comment.data))
  },[reviewInfo.idx])
  

  const submitComment = async(e) => {
    e.preventDefault()
    const writer = commentInputRef.current[0].value
    const pw = commentInputRef.current[1].value
    const comment = commentInputRef.current[2].value
    const postIdx = reviewInfo.idx
    if(!writer) return alert('닉네임을 입력해주세요.')
    if(!pw) return alert('비밀번호를 입력해주세요.')
    if(!comment) return alert('내용을 입력해주세요.')
    console.log(writer,pw,comment,postIdx)
    const body = {writer:writer, pw:pw, comment:comment, postIdx: postIdx}
    const response = await axios.post('/reviewWriteComment', body)
    if(response.data.success){
      alert(response.data.msg)
    }
    else alert(response.data.msg)
    commentInputRef.current[1].value = ''
    commentInputRef.current[2].value = ''
    axios.get(`/comment/${reviewInfo.idx}`).then((comment)=>setCommentList(comment.data))
  }
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
            <span>{reviewInfo.date.slice(0,19)}</span>
          </div>
          <div className='review-detail-time'>
            <span>조회 {reviewInfo.count}</span>
          </div>
        </div>
      </header>
      <textarea className='review-detail-content' disabled={true} value={reviewInfo.content}></textarea>
      <footer className='comment-wrap'>
        <div className='comment-header'>
          전체 댓글 박스
        </div>
        <div className='comment-box'>
          {commentList ?
            commentList.map((commentInfo,idx)=>(
              <div key={idx} className="comment-list">
                <span>{commentInfo.writer}</span>
                <span>{commentInfo.comment}</span>
                <span>{commentInfo.date}</span>
              </div>
            ))
          :
          <div>Loading...</div>
          /* 
          <div className='comment'>
            <span>댓글1</span>
          </div>
          <div className='comment'>
            <span>댓글1</span>
          </div>
          <div className='comment'>
            <span>댓글1</span>
          </div>
          <div className='comment'>
            <span>댓글1</span>
          </div> */}
        </div>
        <form className='comment-submit-form' onSubmit={(e)=>(submitComment(e))}>
          <div className='make-comment'>
            {sessionStorage.getItem('userId') ?
            <>
              <div className='make-comment-userinfo'>
                <div className='userinfo-input'>
                  <input type="text" value={sessionStorage.getItem('userId')} disabled={true} ref={el=>commentInputRef.current[0] = el}/>
                  <input type="password" placeholder='비밀번호' ref={el=>commentInputRef.current[1] = el}/>
                </div>
              </div>
            </>
              :
              <>
                <div className='make-comment-userinfo'>
                  <div className='userinfo-input'>
                    <input type="text" placeholder='닉네임' ref={el=>commentInputRef.current[0] = el}/>
                    <input type="password" placeholder='비밀번호' ref={el=>commentInputRef.current[1] = el}/>
                  </div>
                </div>
              </>
            }
            <div className='make-comment-input'>
                <textarea className='comment-input' maxLength={100}
                placeholder=
                '타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영원칙 및 관련 법률에 제제를 받을 수 있습니다.'
                cols="30" rows="10" ref={el=>commentInputRef.current[2] = el}>
                </textarea>
            </div>
          </div>
          <div className='comment-submit-button'>
            <button>등록</button>
          </div>
        </form>
      </footer>
    </div>
  )
}
