const express = require('express')

const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
const multer = require('multer')  
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
// aws.config.loadFromPath(__dirname+'/awsconfig.json')
// json 파일을 만들어서 .gitingore에 추가하는 방법도 좋지만, .env파일로 관리하는것도 좋다.
require('dotenv').config()
// 같은 경로에 있는 .env 파일을 읽을 수 있게 해준다.

const s3 = new aws.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_S3_REGION
})

const dir = 'F:/FrontEnd/React_practice/car-board/public'

const storage = multerS3({
  s3 : s3,
  bucket : 'my-jin-practice',
  acl: 'public-read-write',
  key:(req,file,cb)=>{
    cb(null, Date.now()+'__'+file.originalname)
  }
})
const upload = multer({storage:storage})

// 사진 업로드를 위해서 multer를 가져오고, 경로를 설정해준다.
// 입력한 파일이 uploads/폴더 내에 저장된다

let fs = require('fs')
// fs는 node.js에 들어있는 module로, file system의 약자이다.
// 서버의 파일/폴더에 접근할 수 있는 함수들이 들어있다.
// 파일업로드와 직접적인 연관이 있는것은 아니고, 저장할 폴더를 생성하기 위해 사용

const db = require('./config/db.js');
// const { S3 } = require('aws-sdk');
app.use(express.json()) // body-parser 대신 express.json() 사용해도 된다.

// 배포상태면~
// if (process.env.NODE_ENV === "production")
// {
  app.use(express.static(path.join(__dirname,"app/Client/build")));
  // app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname,"app/Client/build","index.html"));
  // });
// }

app.get('/selectAll',(req,res) => {
  console.log('요청')
  db.query('select * from cars order by id desc',(err,data) => {
    if(!err){
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.get('/selectWhere/:id',(req,res) => {
  console.log('선택요청')
  const {id} = req.params
  sql='select * from cars where id = ?'
  db.query(sql,[id],(err,data) => {
    if(!err){
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.post('/insertCar',upload.single('file'), (req,res) => {
  console.log(req.body)
  console.log(req.file)
  const [maker,model,year,distance,price] = [...req.body.text]
  const imgUrl =  req.file.location
  const sql = 'insert into cars (car_maker,car_name,car_model_year,distance,car_price,car_image) values (?,?,?,?,?,?)'
  db.query(sql,[maker,model,year,distance,price,imgUrl], (err,data) => {
    if(!err){
      console.log('입력 완료')
      res.send(req.file.filename)
    }
    else{
      console.log(err)
      res.send()
    }
  })
})

app.delete('/delete',(req,res) => {
  console.log(req.body)
  db.query(`delete from cars where id=${req.body.id}`,(err,data) => {
    if(!err){
      console.log('삭제 완료')
      res.end()
    }
    else{
      console.log(err)
    }
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"app/Client/build","index.html"));
});

app.listen(PORT , ()=>{
  let folder = dir + '/upload'
  if(!fs.existsSync('upload')) fs.mkdirSync('upload')
  // dir폴더가 존재하지 확인하고, 없으면 폴더를 생성
  console.log(`server on! : ${PORT}`)
})