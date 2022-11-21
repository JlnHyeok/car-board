const express = require('express')

const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
const multer = require('multer')  
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
aws.config.loadFromPath(__dirname+'/awsconfig.json')
require('dotenv').config()

const s3 = new aws.S3()

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

// 쿠키 설정 모듈
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const session = require('express-session')
app.use(session({
  secret:'node-session',
  resave:false,
  saveUninitialized:false
}))

// 암호화 모듈
const bcrypt = require('bcrypt')
const saltRounds = 10

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
app.post('/login',(req,res) => {
  let {id, pw} = req.body
  console.log(req.body)
  const sql = 'select id,pw from member where id = ?'
  try{
    db.query(sql , id , (err,row) => {
      if(err) throw(err)
      if(row.length === 0){
        return res.json({success:false, msg:'등록되지 않은 아이디입니다.'})
      }
      else{
        if(bcrypt.compareSync(pw, row[0].pw)){
          res.cookie('userid',id,{
            maxAge:3600*1000,
            path:'/'
          })
          req.session.user = {id:id, pw:pw}
          console.log(req.session.user)
          return res.json({success:true})
        }
        else{
          return res.json({success:false, msg:'비밀번호가 일치하지 않습니다.'})
        }
      }
    })
  }catch(err){
    console.log(err)
    res.json({success:false, msg: '올바른 정보를 입력해주세요.'})
  }
})

app.get('/logout',(req,res) => {
  delete req.session.user
  res.clearCookie('userid')
  res.json({success:true})
})

app.post('/register', (req,res) => {
  let {id, pw, name} = req.body
  pw = bcrypt.hashSync(pw,saltRounds)
  const selectSql = 'select * from member where id = ?'
  const registerSql = 'insert into member (id,pw,name) values (?,?,?)'
  const registerInfo = [id , pw , name]
  db.query(selectSql,id, (err,row) => {
    if(row.length === 0){
      db.query(registerSql, registerInfo, (err, data) => {
        if(!err){
          res.json({success:true})
        }
        else{
          console.log(err)
          res.json({success:false, msg:'올바른 정보를 입력해주세요.'})
        }
      })
    }
    else{
      res.json({success:false, msg:'아이디가 이미 존재합니다.'})
    }
  })
})

app.post('/findId', (req,res) => {
  const {name} = req.body
  console.log(name)
  const sql = 'select * from member where name = ?'
  db.query(sql,name,(err,row) => {
    if(!err){
      if(row.length!==0){
        console.log(row)
        res.json({success:true, data:row})
      }
      else{
        res.json({success:false, msg:'입력하신 정보로 가입된 아이디가 없습니다.'})
      }
    }
    else{
      res.json({success:false, msg:'오류가 발생했습니다. 다시 시도해주세요.'})
    }
  })
})
app.post('/findPw', (req,res) => {
  const {name,id} = req.body
  const sql = 'select * from member where name = ? and id = ?'
  db.query(sql,[name,id], (err,row) => {
    if(!err){
      if(row.length===1){
        res.cookie('user-info',{name:name, id:id},{
          maxAge:600*1000
        })
        res.json({success:true})
      }
      else{
        res.json({success:false,msg:'가입된 정보가 없습니다.'})
      }
    }
  })
})
app.put('/changePw',(req,res) => {
  const {pw} = req.body
  const {name,id} = req.cookies['user-info']
  const sql = 'update member set pw = ? where name = ? and id = ?'
  bcrypt.hash(pw,saltRounds,(err,hashedPw) => {
    db.query(sql,[hashedPw,name,id],(err,data) => {
      if(!err){
        res.clearCookie('user-info')
        res.json({success:true,msg:'비밀번호가 성공적으로 변경되었습니다.'})
      }
      else{
        res.clearCookie('user-info')
        res.json({success:false, msg:'오류가 발생했습니다.'})
      }
    })
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
      res.json({success:true})
    }
    else{
      console.log(err)
      res.json({success:false, msg: '오류가 발생했습니다.'})
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