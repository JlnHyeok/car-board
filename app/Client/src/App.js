import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './components/Home';
import SellPage from './components/SellPage';
import Review from './components/Review';
import searchSort from './hooks&functions/searchSort';
import DetailCar from './components/DetailCar';
import Login from './components/Login';
import Register from './components/Register';
import ReviewDetail from './components/ReviewDetail';
import ReviewWrite from './components/ReviewWrite';
import Mypage from './components/Mypage';

function App() {

  const postPerPage = 12
  const currentPageNum = 1
  const [carInfo, setCarInfo] = useState([])
  const [pageNum , setPageNum] = useState(currentPageNum)
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [easySearchSort, setEasySearchSort] = useState({
    maker:[],dis:[null,null],price:[null,null],year:[null,null]})
  const [isAdmin, setIsAdmin] = useState(false)  
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  
  // 홈화면 추천 인덱스 생성
  // console.log(process.env.REACT_APP_API_URL)
  useEffect(() => {
    axios.get('/selectAll').then((result)=>{setCarInfo(result.data)})
    if(sessionStorage.getItem('userId')){
      axios.get('/check-auth').then((res)=>{
        if(!res.data.success){
          sessionStorage.clear()
          alert('세션이 만료되었습니다.')
        }
      })
    }
  },[])

  // 한 페이지에 띄울 인덱스 추출
  const firstIndex = (pageNum-1)*postPerPage
  const lastIndex = firstIndex + postPerPage

  useEffect(() => {
    setPageNum(1)
  },[easySearchSort])
  
  if(!carInfo){
    return (
      <div style={{margin:'0 auto',fontSize:'1.1rem',width:'100%',textAlign:'center'}}>Loading</div>
      )
    }
  // postList : 한 페이지에 나타낼 정보들 추출
  // newPostList : 전체 정보중에서 선택한 조건들을 골라서 추출 후 postList 에 전달
  let [postList, newPostList] = searchSort(easySearchSort,carInfo,firstIndex,lastIndex,isSearch,searchValue)

  let random = Math.floor(Math.random()*carInfo.length)
  let randInt = []
  if(random>0 && random < carInfo.length-1){
    randInt = [random-1, random, random+1]
  }
  else if(random===0){
    randInt = [random, random+3, random+22]
  }
  else{
    randInt = [random-22, random-65, random]
  }
  
  // 차 주행거리, 가격 최대 최소 값 구하기
  const carMinMaxInfo = (whatYouWantOnlyNum,unit) => {
    let info = copyCarList.map((cars)=>Number(cars[whatYouWantOnlyNum]))
    let max = Math.ceil(info.sort((a,b)=>(a-b))[info.length-1]/unit)*unit
    const minmaxList = []
    // console.log(min,max)
    for(let i = 1 ; i<=Number(max/(unit)) ; i ++){
      minmaxList.push(i*unit)
    }
    return minmaxList
  }

  // 차 종류 중복 제거
  const copyCarList = [...carInfo]
  const carMaker = [...new Set(copyCarList.map((cars)=>(cars.car_maker)))]
  // const yearList = [...new Set(copyCarList.map((cars)=>(cars.car_model_year)).map((year)=>(year.slice(0,4))))]
  const yearList = []
  for(let y = 2010 ; y<=new Date().getFullYear() ; y++){
    yearList.push(y)
  }
  // console.log(yearList, new Date().getFullYear())
  
  let disList = carMinMaxInfo('distance',10000)
  let priceList = carMinMaxInfo('car_price', 1000)
  

  return ( 
    <BrowserRouter>
      <div className="App">
        <Header 
        setIsSearch={setIsSearch} 
        setSearchValue={setSearchValue} 
        setPageNum={setPageNum}
        setEasySearchSort={setEasySearchSort}
        setCarInfo={setCarInfo}
        setIsAdmin={setIsAdmin}
        isAdmin={isAdmin}
        id={id}
        />
        <Routes>
          <Route path='/' element={<Home randInt={randInt} carInfo={carInfo}/>}/>
          <Route 
            path='/buy'
            element={
            <Board postList={postList} totalCar={newPostList.length} buttonLen={Math.ceil(newPostList.length/postPerPage)}
            pageNum={pageNum} setPageNum={setPageNum} carMaker={carMaker} setEasySearchSort={setEasySearchSort} easySearchSort={easySearchSort}
            disList={disList} priceList={priceList} yearList={yearList} isAdmin={isAdmin} setCarInfo={setCarInfo} carInfo={carInfo}
            />}
            />
            <Route path='/buy/:id' element={<DetailCar/>}/>
            <Route path='/sell' element={<SellPage setCarInfo={setCarInfo}/>}/>
            <Route path='/login' element={<Login id={id} setId={setId} pw={pw} setPw={setPw}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/review' element={<Review/>}/>
            <Route path='/review/:id' element={<ReviewDetail/>}/>
            <Route path='/review/write/' element={<ReviewWrite/>}/>
            <Route path='/review/edit/:idx' element={<ReviewWrite/>}/>
            <Route path='/mypage' element={<Mypage buttonLen={Math.ceil(newPostList.length/postPerPage)} pageNum={pageNum} setPageNum={setPageNum}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;