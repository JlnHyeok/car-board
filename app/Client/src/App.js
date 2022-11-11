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


function App() {
  // const [users, setUsers] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // const fetchUsers = async() => {
  //   try{
  //     setError(null)
  //     setUsers(null)
  //     setLoading(true)
  //     const response = await axios.get('/selectAll')
  //     setUsers(response.data)
  //   }
  //   catch(e){
  //     setError(e)
  //   }
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   fetchUsers()
  // },[])

  // if(loading){
  //   return <div>로딩중..</div>
  // }
  // if(error){
  //   return <div>에러 발생</div>
  // }
  // if(!users){
  //   return null
  // } 로딩, 에러하는동안 화면 표시 방지

  const postPerPage = 12
  const currentPageNum = 1

  const [carInfo, setCarInfo] = useState([])
  const [pageNum , setPageNum] = useState(currentPageNum)
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [easySearchSort, setEasySearchSort] = useState({
    maker:[],dis:[null,null],price:[null,null],year:[null,null]})
  const [isAdmin, setIsAdmin] = useState(false)  
  
  // 홈화면 추천 인덱스 생성
  console.log(process.env.REACT_APP_API_URL)
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/selectAll').then((result)=>{setCarInfo(result.data)})
  },[])
  
  // 한 페이지에 띄울 인덱스 추출
  const firstIndex = (pageNum-1)*postPerPage
  const lastIndex = firstIndex + postPerPage
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
  
  useEffect(() => {
    setPageNum(1)
  },[easySearchSort])
  // postList : 한 페이지에 나타낼 정보들 추출
  // newPostList : 전체 정보중에서 선택한 조건들을 골라서 추출 후 postList 에 전달
  let [postList, newPostList] = searchSort(easySearchSort,carInfo,firstIndex,lastIndex,isSearch,searchValue)
  

  if(carInfo[0] === undefined){
    console.log('로딩중')
    return (
      <div>Loading..</div>
    )
  }
  
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
            <Route path='/sell' element={<SellPage/>}/>
            <Route path='/review' element={<Review/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;