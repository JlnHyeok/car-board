import axios from 'axios'
import React, { useRef, useState } from 'react'
import './css/sellpage.css'
import Portal from './modal/Portal'
import Modal from './modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function SellPage({setCarInfo}) {
  const inputInfo = useRef([])
  const [img, setImg] = useState('')
  const [imgSrc, setImgSrc] = useState()
  const [isSellModal,setIsSellModal] = useState(false)
  const nav = useNavigate()

  // 이미지 미리보기
  const handleChangeImgInput = async(fileBlob) => {
    if(!fileBlob){
      setImgSrc()
      inputInfo.current[5].value = '*사진을 첨부해주세요.'
      inputInfo.current[5].style.border='2px solid #e61332'
      inputInfo.current[5].classList.add('input-empty')
      return
    }
    if(inputInfo.current[5].classList.contains('input-empty')){
      inputInfo.current[5].classList.remove('input-empty')
    }
    inputInfo.current[5].style.border='1px solid black'
    let reader = new FileReader()
    inputInfo.current[5].value = fileBlob.name
    setImg(fileBlob)
    // console.log(fileBlob)
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve)=>{
      reader.onload = () => {
        setImgSrc(reader.result)
        resolve()
      }
    })
  }

  // 등록버튼 누를 때
  const handleSubmitCarInfo = async(e) => {
    e.preventDefault()
    if(!sessionStorage.getItem('userId')){
      alert('로그인 후 이용 가능합니다.') 
      nav('/login')
      return
      }
    if(inputInfo.current[0].value === '') return alert('제조사를 입력해주세요')
    if(inputInfo.current[1].value === '') return alert('모델명을 입력해주세요')
    if(inputInfo.current[2].value === '') return alert('년식을 입력해주세요')
    if(inputInfo.current[3].value === '') return alert('주행거리를 입력해주세요')
    if(inputInfo.current[4].value === '') return alert('가격을 입력해주세요')
    if(inputInfo.current[5].value === '') return alert('사진을 입력해주세요')
    try{
      const formData = new FormData()
      formData.append('file', img)
      formData.append('text',inputInfo.current[0].value)
      formData.append('text',inputInfo.current[1].value)
      formData.append('text',inputInfo.current[2].value)
      formData.append('text',inputInfo.current[3].value)
      formData.append('text',inputInfo.current[4].value)
      inputInfo.current.forEach((cur)=>cur.value='')
      setImgSrc('')
      setIsSellModal(true)
      const response = await axios.post(process.env.REACT_APP_API_URL+'/insertCar', formData)
      axios.get(process.env.REACT_APP_API_URL+'/selectAll').then((result)=>{setCarInfo(result.data)})
      if(response.data.success){
        setIsSellModal(false)
        alert('등록 완료!')
      }
      else{
        const err = new Error(response.data.msg)
        err.name = '서버 500'
        throw err
      }
    }catch(err){
      window.location.reload()
      alert(err)
    }
  }

  // 빈 칸 입력시 
  const onChangeInput = (e) => {
    e.target.value === '' ?  (e.target.className = 'input-emp') : (e.target.className = 'car-input')
  }

  return (
    <div className='total-wrap'>
      {isSellModal &&
      <Portal>
        <Modal isSellModal={isSellModal}/>
      </Portal>}
      <div className='sellpage-wrap'>
        <div className="car-img-thumbnail">
          {imgSrc ? <img className='thumbnail-img' src={imgSrc} alt="" /> : <span className='thmb-span'>차량 사진을 등록해주세요</span>}
        </div>
        <form className='submit-box' onSubmit={handleSubmitCarInfo} encType="multipart/form-data">
          <div className='filebox'>
            <label className='upload-img' htmlFor="car-img">사진 선택</label>
            <input className='car-input'  placeholder='첨부파일' disabled={true} ref={el=>inputInfo.current[5]=el}/>
            <input type="file" accept='image/*' name='file' id='car-img' className="car-img" onChange={(e)=>handleChangeImgInput(e.target.files[0])}/>
          </div>
          <div>
            <label htmlFor="car-maker-input">제조사</label>
            <input type="text" id='car-maker-input' placeholder='*필수항목입니다.' className="car-input" ref={el=>inputInfo.current[0]=el} onChange={(e)=>onChangeInput(e)}/>
          </div>
          <div>
            <label htmlFor="car-model-input">모델명</label>
            <input type="text" id='car-model-input' placeholder='*필수항목입니다.' className="car-input" ref={el=>inputInfo.current[1]=el} onChange={(e)=>onChangeInput(e)}/>
          </div>
          <div>
            <label htmlFor="car-prod-year-input">년식</label>
            <input type="month" id='car-prod-year-input'  className="car-input" ref={el=>inputInfo.current[2]=el} onChange={(e)=>onChangeInput(e)}/>
          </div>
          <div>
            <label htmlFor="car-distance-input">주행 거리</label>
            <input type="number" min='0' max='1000000' step='none' id='car-distance-input' placeholder='*필수항목입니다.' className="car-input" ref={el=>inputInfo.current[3]=el} onChange={(e)=>onChangeInput(e)}/>
          </div>
          <div>
            <label htmlFor="car-price-input">가격</label>
            <input type="number" min='0' max='1000000' id='car-price-input' placeholder='*필수항목입니다.' className="car-input" ref={el=>inputInfo.current[4]=el} onChange={(e)=>onChangeInput(e)}/>
          </div>
          <button className='submit-button'>등록</button>
        </form>
      </div>
    </div>
  )
}
