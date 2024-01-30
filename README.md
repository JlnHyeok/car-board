# 중고차 거래 사이트
* React기반으로 만든 중고차 거래 컨셉의 사이트입니다.
### ✨배포Link  
* https://car-board-practice.herokuapp.com/
* 무료기간 만료로 인해 정비중입니다.
### 🕗제작 기간 & 인원  
* 2022.11.01 ~ 2022.11.24 (조금씩 업데이트 중)  
* 1명  
### 🗒️개요  
* Front-end 공부를 진행하면서 각종 스타일링, 상태관리 Library들을 사용하기 전에 내가 React와 Dom의 동작원리 등을 잘 이해하고 있는게 맞는지, 맞다면 ReactJs, 바닐라Js 로 스스로 얼만큼 구현할 수 있을까? 라는 생각이 들어서 하나하나 직접 만들어보고 배포까지 진행해보았습니다.
### ⚙️개발 환경
* Front : React.js(React Hook), JavaScript, html, css
* Back : node.js , express.js
* DB : Mysql
* Deploy : heroku

## ❗주요 기능
#### 회원가입
* ID 중복 체크
* PW 암호화 (bcrypt 사용)
* PW , PW 확인 값 일치 체크
<p align="left">
  <img src="https://user-images.githubusercontent.com/108784431/208563103-1ab8b533-e041-44eb-bc88-9ecfdc063427.jpg" width="30%" />
  <img src="https://user-images.githubusercontent.com/108784431/208563116-3e251ac1-1755-49d9-9c45-605769997156.jpg" width="30%" />
  <img src="https://user-images.githubusercontent.com/108784431/208563111-2ceca890-8241-45b4-8829-76412a9b8b26.jpg" width="30%" />
</p>

#### 로그인
* ID 검증
* 암호화된 PW 비교
* 로그인 시 쿠키, 세션 생성
* ID 찾기, PW 찾기, 회원가입 링크 연결
<p align="left">
  <img src="https://user-images.githubusercontent.com/108784431/208563809-ad4bc05d-d48a-46e7-b863-415a1014073f.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208563823-859e9b0f-5c7c-4a8e-8ac3-cb237a9382f1.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208563828-d0bfad4b-2463-4928-93d8-b82dfcc73b06.jpg" width="30%"/>
</p>

#### 마이페이지
* 로그인 상태 체크
* 사용자 기본 정보 확인
* PW 변경
* 등록한 차량, 게시글, 댓글 확인
* 구매목록 확인 (구현중)
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208564015-6db96286-6758-4e8f-b63e-ea861cbb4032.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564038-241d4b7d-3009-40cf-bacf-8317fb1bf87f.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564071-dd20defe-b3b0-4852-a8b5-722d1b789e28.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564074-c28bc13e-20fc-411e-9610-58b0229128aa.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564085-c0e9d32b-89f2-42c5-a912-94ac1fb5ee16.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564098-16b00726-3142-4bba-afb2-a4fbe31ccb49.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208564107-adc5837b-6b2a-4062-8b33-9300a2f9741e.jpg" width="30%"/>
</p>

#### 로그아웃
* 쿠키, 세션 삭제

#### 홈 화면
* 슬라이드 직접 구현
* 오늘의 추천 차량
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208565165-aa965cda-db01-463c-a254-a1880445c9ac.jpg" width="33%"/>
</p>

#### 판매 등록 화면
* 이미지 미리보기 및 업로드
* 입력 값 valid 체크
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208565576-60041e94-2e31-4a8c-b109-f2dd327ec807.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208565591-797f37a1-7b77-470c-8d54-c1bd897c12b2.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208565601-f211f5b6-2c2b-4952-ae4f-25ced498d64a.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208566727-be4f85f3-6b4c-4135-afcc-5801335be1d8.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208566766-689409fc-f5bf-4e16-a6a6-e807abb38aff.jpg" width="30%"/>
</p>

#### 차량 목록 화면
* 검색기능 구현
* 제조사, 주행 거리, 년식, 가격별 선택 검색 구현
* 페이지네이션 구현
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208565550-30831665-7a33-4017-899c-97db56d640eb.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567234-bb159855-724c-4dcb-be64-091c1a2c20b1.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567248-2eb18b81-d5d6-4329-8862-bf182c3b2f4f.jpg" width="30%"/>
</p>

#### 차량 상세 정보 페이지
* 선수금에 따른 할부금 변화
* 부대비용 체크에 따른 선수금, 할부금 변화
* 할부 기간에 따른 월 납부금 변화
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208567400-c1fbc966-b8d3-4879-9e06-2847da5f1793.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567388-90528bbd-0fb6-4eab-8aa2-6719146f0320.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567409-adadc0bf-f788-4ef1-b98c-6a9e26795aee.jpg" width="30%"/>
</p>

#### 게시판 화면
* 글 작성, 읽기, 수정, 삭제 (CRUD) 구현
* 댓글 작성, 읽기, 수정, 삭제 (CRUE) 구현
* 게시판 전체, 제목, 내용별 검색 기능 구현
* 쿠키를 사용해 조회수 중복 방지 구현
* 페이지네이션 구현
<p>
  <img src="https://user-images.githubusercontent.com/108784431/208567568-6f84c3dd-16b8-4c18-9510-906dc335bc9c.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567620-ca8592d7-816f-4f47-b0ab-3b3f37a8d745.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567619-614c3630-3370-4f31-90f1-0ede756fc7c7.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567610-7aca73b2-f0f1-4106-8117-1a0ff78e3b42.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567611-7aa905cb-fd8b-46d4-975d-beb4da02bacf.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567614-8bf3f273-46c4-4486-bd38-59141b208159.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567617-14efeee3-9ff8-49a5-ae68-f75f2920c8a6.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567609-79554739-7d6e-4156-b53d-5923459c4bc2.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567605-224e37c9-4c1a-4962-be2f-6ac07bc5f7ac.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567600-ab9c178b-0a75-42e7-9197-b4a2990591dd.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567599-2d8d1f56-4af0-45f0-8feb-5472dfbf3dee.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567595-9b8af8c8-13a4-4c97-97e1-5e237064e2c1.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567597-e5d53d73-2cdc-4c5f-8f8c-93d8b4072f87.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567593-7db8a8c0-0156-4b8e-9baf-aa0da479dfca.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567587-febdd070-a62a-4e11-bf7b-1a9ef7b4ebb8.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567590-954acebf-a5a0-41fb-aa37-f93bf8b11331.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567591-4a27903a-7cbc-4b80-9623-54bf1decddc9.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567581-d532a00d-435e-44e9-8ad8-4b0de76dd87e.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567583-e5e87c7a-e12d-4a54-931c-9d849f6bf577.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567585-f97ea822-61e8-4083-902a-23514e714b36.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567580-7ccf0d9a-a576-46f8-a4cc-e120caef1132.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567579-80b31edf-5954-44d0-8396-0686fd118ddd.jpg" width="30%"/>
  <img src="https://user-images.githubusercontent.com/108784431/208567577-5729a160-06cd-434e-8119-20fe22a6802a.jpg" width="30%"/>
  <img src="(https://user-images.githubusercontent.com/108784431/208567573-3fa96402-7fd4-407e-84dc-5e6e121c3a87.jpg" width="30%"/>
</p>


#### 반응형
* 모바일 사용자도 이용 가능하게 반응형으로 구현
---
### ✍️회고
* 공부를 시작하고나서부터 저의 진정한 개발 공부는 혼자서 프로젝트를 진행하기 전과 후로 나뉘었습니다.  
프로젝트를 진행하면서 배포를 해보기 전까지는 build 해야한다는 것도 몰랐기에 그냥 프론트 단 만들고, 백 단 만들어서 로컬환경에서만 돌려보기만 하고 끝냈었는데, 배포작업을 진행하면서 build는 왜 하는지, 또 build하면서 나오는 에러들도 경험해보고, 배포는 성공했지만 CORS 에러가 나서 통신문제가 발생했던 문제와 배포할때에는 환경변수 파일을 만들어서 git에 commit할때 DB정보나 aws키 같은 개인정보들이 올라가지않게 해서 보안에 신경써줘야한다는 경험을 하면서 조금 더 지식이 쌓이는것을 느낄 수 있었습니다.  
또, 상태관리 라이브러리(Redux , recoil 등) 을 약간이나마 공부했지만 왜 써야하는것인지 정확한 이유를 모르고 무작정 학습하기만 했었는데, 규모가 작긴하지만 그러한 라이브러리 없이 사이트를 하나 만들어보니 상태를 관리하기 위해 props가 계속 전달되어야하는 현상들이 많이 발생하였고, 사이트 하나 만드는것을 끝마친 지금에야 '아 내가 그때 상태관리 redux나 recoil을 썼다면 훨씬 더 간결해졌을거같은데' 라는 생각이 들게 되었습니다.  
다음에 만들 프로젝트에서는 스타일링 라이브러리와 상태관리 라이브러리를 적용하여 더 효율적인 관리를 할수있도록 만드는것이 목표입니다.
