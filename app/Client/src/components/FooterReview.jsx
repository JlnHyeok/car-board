import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./css/footer-review.css";
import Portal from "./modal/Portal";
import Modal from './modal/Modal';

export default function FooterReview({ buttonLen, pageNum, setPageNum, setReviewList}) {
  const btnArr = [];
  const searchCategory = useRef();
  const searchCategoryList = useRef([]);
  const searchArrow = useRef();
  const [pageNumLength, setPageNumLength] = useState(10);
  const [reviewSearchCategory , setReviewSearchCategory] = useState('all')
  const [reviewSearchValue , setReviewSearchValue] = useState('')
  const [isReviewLoading, setIsReviewLoading] = useState(false)

  let i = 1;
  while (i <= buttonLen) {
    btnArr.push(i);
    i++;
  }
  // 새로고침시 현재위치를 기억하여 그 자리를 유지
  window.history.scrollRestoration = "auto";

  const handlePrev = () => {
    setPageNum(pageNum - 1);
  };

  const handleMorePrev = () => {
    if (pageNum <= pageNumLength) return setPageNum(1);
    setPageNum(
      Math.ceil(pageNum / pageNumLength) * pageNumLength - pageNumLength
    );
  };

  const handleNext = () => {
    setPageNum(pageNum + 1);
  };

  const handleMoreNext = () => {
    if (
      Math.ceil(buttonLen / pageNumLength) ===
      Math.ceil(pageNum / pageNumLength)
    ) {
      setPageNum(buttonLen);
      return;
    }
    if (pageNum === pageNumLength * Math.floor(pageNum / pageNumLength)) {
      setPageNum(pageNum + 1);
      return;
    }
    setPageNum(
      Math.floor(pageNum / pageNumLength) * pageNumLength + (pageNumLength + 1)
    );
  };

  const clickSearchCategory = (e) => {
    searchCategory.current.classList.contains("search-clicked")
      ? (searchCategory.current.className = "search-selected")
      : (searchCategory.current.className = "search-clicked");
    searchArrow.current.classList.contains('search-img-clicked')
      ? searchArrow.current.className = 'search-img-selected'
      : searchArrow.current.className = 'search-img-clicked'
  };
  
  const clickCategoryList = (e) => {
    searchCategoryList.current[0].textContent = e.target.textContent
    if(e.target.textContent === '전체') setReviewSearchCategory('all')
    else if(e.target.textContent === '제목') setReviewSearchCategory('title')
    else if(e.target.textContent === '내용') setReviewSearchCategory('content')
  }

  
  const submitSearchReview = async(e) => {
    e.preventDefault();
    setIsReviewLoading(true)
    if(!reviewSearchValue){
      const response = await axios.get('/reviewList')
      console.log(response.data)
      setReviewList(response.data)
    }
    else{
      const response = await axios.get(`/review/search/${reviewSearchCategory}&${reviewSearchValue}`)
      console.log(response)
      if(response.data.success){
        setReviewList(response.data.data)
      }
    }
    setIsReviewLoading(false)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // window 의 너비값 변경 감지
    window.innerWidth < 540 ? setPageNumLength(3) : setPageNumLength(10);
  }, [pageNum]);

  return (
    <div className="footer-review">
      {isReviewLoading &&
      <Portal>
        <Modal isReviewLoading={isReviewLoading}/>
      </Portal>}
      <div className="footer-upper">
        <div className="search-review">
          <form className="search-review-form" onSubmit={submitSearchReview}>
            <ul ref = {searchCategory} onClick={clickSearchCategory}>
              <li onClick={(e)=>clickCategoryList(e)} ref={el=>searchCategoryList.current[0]=el}>전체</li>
              <li onClick={(e)=>clickCategoryList(e)} ref={el=>searchCategoryList.current[1]=el}>전체</li>
              <li onClick={(e)=>clickCategoryList(e)} ref={el=>searchCategoryList.current[2]=el}>제목</li>
              <li onClick={(e)=>clickCategoryList(e)} ref={el=>searchCategoryList.current[3]=el}>내용</li>
            </ul>
            <img className="search-img-clicked" onClick={clickSearchCategory} src="/img/arrow.svg" alt="화살표" ref={searchArrow}/>
            <input type="text" onChange={(e)=>(setReviewSearchValue(e.target.value))} placeholder="검색어를 입력하세요." />
            <button>검색</button>
          </form>
        </div>
        <div className="page-info-review">
          <span>
            {pageNum} page / {buttonLen} page
          </span>
        </div>
      </div>

      <div
        className="btn-total-box-review"
        style={{ width: window.innerWidth < 540 ? 330 : 450 }}
      >
        <button
          className="btn-list"
          onClick={handleMorePrev}
          disabled={pageNum === 1}
          style={{
            cursor: pageNum === 1 ? "default" : undefined,
          }}
        >
          {"<<"}
        </button>
        <button
          className="btn-list"
          onClick={handlePrev}
          disabled={pageNum === 1}
          style={{
            cursor: pageNum === 1 ? "default" : undefined,
          }}
        >
          {"<"}
        </button>
        <div
          className="btn-list-box-review"
          style={{ width: 30 * pageNumLength }}
        >
          {btnArr.map((num) => {
            return (
              <button
                key={num}
                style={{
                  transform: `translateY(-${
                    30 * Math.floor((pageNum - 1) / pageNumLength)
                  }px)`,
                }}
                className={pageNum === num ? "btn-list clicked" : "btn-list"}
                onClick={() => setPageNum(num)}
              >
                {num}
              </button>
            );
          })}
        </div>
        <button
          className="btn-list"
          onClick={handleNext}
          disabled={pageNum === buttonLen}
          style={{
            cursor: pageNum === buttonLen ? "default" : undefined,
          }}
        >
          {">"}
        </button>
        <button
          onClick={handleMoreNext}
          className="btn-list"
          disabled={pageNum >= buttonLen}
          style={{
            cursor: pageNum >= buttonLen ? "default" : undefined,
          }}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
