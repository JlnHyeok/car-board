// postList : 한 페이지당 나타날 목록
// newPostList : 전체 목록에서 조건에 맞게 고른것
export default function searchSort(easySearchMaker,carInfo,firstIndex,lastIndex,isSearch,searchValue) {
  let postList = carInfo.slice(firstIndex , lastIndex) 
  let newPostList = [...carInfo]

  if(easySearchMaker.maker.length>=1){
    newPostList = carInfo.filter((cars)=>(
      easySearchMaker.maker.includes(cars.car_maker)
      ))
  }

  if(easySearchMaker.dis[0] && (easySearchMaker.dis[1])){
    newPostList = newPostList.filter((cars)=>(
      parseInt(cars.distance) >= parseInt(easySearchMaker.dis[0]) && parseInt(cars.distance) <= parseInt(easySearchMaker.dis[1])  
    ))
  }
  
  if(easySearchMaker.price[0] && (easySearchMaker.price[1])){
    newPostList = newPostList.filter((cars)=>(
      (parseInt(cars.car_price)-parseInt(easySearchMaker.price[0]) >= 0) && (parseInt(cars.car_price) <= parseInt(easySearchMaker.price[1]))
      ))
    }

  if(easySearchMaker.year[0] && (easySearchMaker.year[1])){
    newPostList = newPostList.filter((cars)=>(
      (parseInt(cars.car_model_year.slice(0,4))-parseInt(easySearchMaker.year[0]) >= 0) && (parseInt(cars.car_model_year.slice(0,4)) <= parseInt(easySearchMaker.year[1]))
      ))
    }
  


  if (isSearch){
    newPostList = newPostList.filter(cars=>(
      cars.car_name.toUpperCase().includes(searchValue.toUpperCase()) || 
      cars.car_maker.toUpperCase().includes(searchValue.toUpperCase()
      )))
    }  
    postList = newPostList.slice(firstIndex, lastIndex)


  return [postList, newPostList]
}
