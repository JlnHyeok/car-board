const express = require('express')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors({
  origin:['http://localhost:3000','http://localhost:5000','https://car-board-practice.herokuapp.com'],
  credentials:true,
}))
const multer = require('multer')  
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region : process.env.region
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

// 쿠키 설정 모듈
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const session = require('express-session')
const mySqlStore = require('express-mysql-session')(session)
const options = {
  host : process.env.HOST,
  user : process.env.USER,
  password : process.env.PW,
  port : 3306,
  database: process.env.DATABASE,
}
app.use(session({
  secret:'node-session',
  resave:false,
  saveUninitialized:false,
  rolling:true,
  store:new mySqlStore(options),
  cookie:{
    maxAge:3600*1000
  }
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
app.get('/reviewList',(req,res) => {
  if(!req.cookies.visited) res.cookie('visited', [], {maxAge:3600*1000})
  const sql = 'select * from review_info order by date desc'
  db.query(sql,(err,data) => {
    if(!err){
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.get('/reviewClick/:idx', (req,res) => {
  const sql = 'select count from review_info where idx = ?'
  const {idx} = req.params
  if(!req.cookies.visited) res.cookie('visited', [], {maxAge:3600*1000})
  if(!req.cookies.visited.includes(idx)){
    res.cookie(`visited`,[...req.cookies.visited,idx],{
      maxAge:3600*1000
    })
    db.query(sql,[idx],(err,row) => {
      if(!err){
        const countAdd = `update review_info set count = ${row[0].count+1} where idx = ?`
        db.query(countAdd,[idx],(err,row) => {
          if(!err){
            res.json({success:true, msg:'조회 추가 성공'})
          }
          else{
            console.log(err)
            res.json({success:false, msg:'서버에 문제가 발생하였습니다'})
          }
        })
      }
      else{
        console.log(err)
        res.json({success:false, msg:'서버에 문제가 발생하였습니다.'})
      }
    })
  }
  else{
    res.json({success:true, msg:'아직 대기시간입니다.'})
  }
})

app.get('/check-auth',(req,res) => {
  if(req.session.user){
    res.json({success:true})
  }
  else{
    res.json({success:false, msg:'회원 전용 입니다. 로그인페이지로 이동하시겠습니까?'})
  }
})

app.get('/logout',(req,res) => {
  console.log(req.session.user.id)
  req.session.destroy()
  res.clearCookie('userid')
  res.json({success:true})
})

app.get('/comment/:postIdx',(req,res) => {
  const {postIdx} = req.params
  const sql = 'select * from review_comment where post_idx = ?'
  db.query(sql,postIdx,(err,row) => {
    if(!err){
      res.send(row)
    }
    else{
      console.log(err)
      res.end()
    }
  })
})


app.post("/login", (req, res) => {
  let { id, pw } = req.body;
  const sql = "select id,pw from member where id = ?";
  db.query(sql, id, (err, row) => {
    if (!err) {
      if (row.length === 0) {
        return res.json({ success: false, msg: "등록되지 않은 아이디입니다." });
      } else {
        if (bcrypt.compareSync(pw, row[0].pw)) {
          res.cookie("userid", id, {
            maxAge: 3600 * 1000,
            sameSite: 'None',
            secure:true,
          });
          req.session.user = { id: id, pw: pw };
          req.session.save()
          res.json({ success: true });
        } else {
          return res.json({
            success: false,
            msg: "비밀번호가 일치하지 않습니다.",
          });
        }
      }
    } else {
      console.log(err);
      res.json({ success: false, msg: "서버에 오류가 발생하였습니다." });
    }
  });
  
});



app.post('/register', (req,res) => {
  let {id, pw, name} = req.body
  pw = bcrypt.hashSync(pw,saltRounds)
  const selectSql = 'select * from member where id = ?'
  const registerSql = 'insert into member (id,pw,name,date) values (?,?,?,?)'
  const today = dayjs().tz('Asia/seoul').format('YYYY-MM-DD HH:mm:ss') // 현재시간
  const registerInfo = [id , pw , name, today]
  db.query(selectSql,id, (err,row) => {
    if(!err){
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
    }
    else{
      res.json({success:false, msg:'서버 오류가 발생하였습니다.'})
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
          maxAge:600*1000,
          sameSite:"Lax"
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
  const id = req.session.user.id
  console.log(req.body)
  console.log(req.file)
  const [maker,model,year,distance,price] = [...req.body.text]
  // const writer = req.session.user.id
  const imgUrl =  req.file.location
  const sql = 'insert into cars (car_maker,car_name,car_model_year,distance,car_price,car_image,writer) values (?,?,?,?,?,?,?)'
  db.query(sql,[maker,model,year,distance,price,imgUrl,id], (err,data) => {
    if(!err){
      console.log('입력 완료')
      res.json({success:true})
    }
    else{
      console.log(err)
      res.json({success:false,msg:'서버에 오류가 생겼습니다.'})
    }
  })
})
app.post('/reviewWrite', (req,res) => {
  const writer = req.session.user.id
  const date = dayjs().tz('Asia/seoul').format('YYYY-MM-DD HH:mm:ss')
  const {category,title,content} = req.body
  const review_info = [writer,title,content,category,date]
  const sql = 'insert into review_info (writer,title,content,category,date) values (?,?,?,?,?)'
  db.query(sql,review_info,(err,data) => {
    if(!err){
      res.json({success:true, msg:'등록되었습니다.'})
    }
    else{
      console.log(err)
      res.json({success:false, msg:'에러가 발생했습니다.'})
    }
  })
})
app.post('/reviewWriteComment',(req,res) => {
  const {writer,pw,comment,postIdx} = req.body
  const today = dayjs().tz('Asia/seoul').format('YYYY-MM-DD HH:MM:ss')
  const commentInfo = [writer,pw,comment,today,postIdx]
  const sql = 'insert into review_comment (writer,pw,comment,date,post_idx) values (?,?,?,?,?)'
  db.query(sql,commentInfo,(err,data) => {
    if(!err){
      res.json({success:true, msg:'댓글이 등록되었습니다.'})
    }
    else{
      res.json({success:false,msg:'서버에 오류가 생겼습니다.'})
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