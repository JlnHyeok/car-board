# 중고차 거래 사이트
* React기반으로 만든 중고차 거래 컨셉의 사이트입니다.
### ✨배포Link  
* https://car-board-practice.herokuapp.com/
* 무료기간 만료로 인해 정비중입니다.
### 🕗제작 기간 & 인원  
* 2022.11.01 ~ 2022.11.24 (조금씩 업데이트 중)  
* 1명  
### 🗒️개요  
* React.js와 JavaScript를 활용하여 중고차 판매 플랫폼을 개발 및 배포하였습니다. 
* F/E와 B/E를 직접 구현하며, 배포 및 운영 과정에서 발생한 문제를 해결하며 실무적인 경험을 쌓았습니다. 
* 이 프로젝트는 상태 관리와 스타일링을 비롯한 전반적인 개발 지식을 확인하고 확장하는 계기가 되었습니다.
### ⚙️개발 환경
* Front : React.js(React Hook), JavaScript, html, css
* Back : node.js , express.js
* DB : Mysql
* Deploy : heroku

### 🏈주요 성과 및 기여
1. **회원가입 및 로그인 시스템 구현**
    - **ID 중복 체크** 및 **비밀번호 암호화(bcrypt)**를 통해 보안 강화.
    - 로그인 시 **세션 및 쿠키**를 활용해 사용자 인증 및 상태 관리.
    - ID/비밀번호 찾기 기능과 회원가입 링크 연결로 사용자 편의성 증대.
2. **마이 페이지 및 사용자 인터페이스 구현**
    - 사용자가 등록한 차량 및 게시글, 댓글을 조회 및 관리 가능.
    - 로그인 상태를 실시간으로 확인하고, 비밀번호 변경 기능 제공.
3. **중고차 등록 및 관리 기능**
    - 차량 등록 화면에서 **이미지 미리보기 및 업로드**, **입력 값 유효성 검사** 구현.
    - **AWS S3**를 활용해 이미지를 업로드 및 관리하며, 저장소 URL을 데이터베이스와 연동.
    - 차량 목록 화면에서 **제조사, 주행 거리, 가격** 등 세부 검색 및 **페이지네이션** 제공.
4. **차량 상세 정보 페이지**
    - 선수금, 할부금, 부대비용, 할부 기간에 따른 **동적 계산 기능** 구현으로 사용자 경험 향상.
5. **게시판 기능 구현**
    - **CRUD 기능**(게시글 작성, 조회, 수정, 삭제)과 **댓글 관리 기능**(작성, 수정, 삭제) 개발.
    - 조회수 중복 방지 기능을 **쿠키**로 구현하여 정확한 데이터 제공.
    - 제목 및 내용 검색, 페이지네이션을 통해 편리한 정보 탐색 제공.
6. **반응형 웹 구현**
    - **모바일 중심의 반응형 디자인**을 통해 다양한 기기에서 최적화된 UI 제공.
7. **배포 및 운영 경험**
    - Heroku를 활용해 프로젝트를 배포하며, **빌드 에러**, **CORS 문제** 등 다양한 장애를 해결.
    - 환경변수 파일 관리 및 보안을 고려해 Git에 민감 정보를 노출하지 않도록 설정.

---

### **🧯트러블슈팅**

1. **CORS 문제 해결**
    - **문제 상황**
        - 개발 환경(Dev Mode)에서는 발생하지 않던 **CORS(Cross-Origin Resource Sharing)** 오류가 배포 환경에서 처음 발생.
    - **원인 분석**
        - 클라이언트와 서버 간의 도메인이 달라 브라우저에서 요청을 차단.
    - **해결 방법**
        - 서버 측에서 CORS 정책을 설정하여 허용 도메인을 명시하고, HTTP 헤더를 수정하여 문제를 해결.
    - **배운 점**
        - 배포 환경에서는 네트워크 보안과 정책 설정이 중요하며, CORS와 같은 웹 표준의 동작 원리를 이해함.
2. **React 생명주기 및 데이터 로딩 이슈**
    - **문제 상황**
        - Dev 모드에서는 React의 생명주기를 고려하지 않아도 데이터가 정상적으로 로드되었으나, 배포 환경에서는 데이터 로딩 시점이 잘못되어 에러 발생.
    - **해결 방법**
        - **마운트(Mount) 이후** 데이터를 가져오는 로직으로 수정.
        - React의 생명주기 메서드(`useEffect`)를 활용하여 데이터를 비동기적으로 불러오고, 로딩 상태를 관리하여 화면에 표시.
    - **배운 점**
        - React의 생명주기를 활용한 데이터 로딩의 중요성을 깨닫고, 렌더링 프로세스를 효과적으로 다루는 법을 학습.
3. **빌드 및 배포 오류**
    - **문제 상황**
        - Heroku 배포 시 빌드 실패 및 환경 변수 누락으로 인해 배포 중단.
    - **해결 방법**
        - 환경변수를 `.env` 파일로 관리하고, Git에 민감 정보를 추가하지 않도록 `.gitignore` 설정.
        - 배포 환경과 개발 환경의 설정 차이를 명확히 구분.
    - **배운 점**
        - 배포 환경 구성 및 보안 설정의 중요성을 이해하고, 빌드 실패 시 로그 분석을 통해 문제를 해결하는 능력을 키움.
4. **F/E와 B/E 배포 경로 매칭 문제**
    - **문제 상황**
        - 배포 과정에서 F/E와 B/E를 한 번에 배포하려고 시도했으나, 배포 중 에러가 계속 발생.로그를 확인한 결과, F/E와 B/E 간의 경로가 잘못 매칭되어 요청이 실패하는 문제를 발견.
    - **해결 방법**
        - F/E와 B/E의 경로를 명확히 분리하여 새로 매핑.
        - B/E 코드에서 경로를 동적으로 탐색하도록 **`__dirname`*과 같은 현재 경로 확인 명령어를 사용해 경로 설정을 수정.
        - 경로 매칭 문제 해결 후 배포에 성공.
- **배운 점**
    - F/E와 B/E 통합 배포 시 경로 설정이 배포 환경에 따라 다르게 동작할 수 있음을 이해.
    - 배포 중 발생한 에러 로그를 분석하여 문제를 추적하고, 설정을 변경하는 과정을 통해 디버깅 능력을 향상.

---

### **학습 및 개선 방향**

- **상태 관리의 중요성 이해:** Redux나 Recoil과 같은 상태 관리 라이브러리를 사용하지 않고 진행하며, 상태 관리에서 발생하는 문제를 직접 경험. 이후 프로젝트에서는 상태 관리 라이브러리를 적용해 효율적인 데이터 흐름을 구현할 계획.
- **빌드 및 배포 경험:** 배포 과정에서 환경 변수 관리와 보안 설정, CORS 에러 해결 등의 경험을 통해 실무적인 지식을 습득.
- **효율적인 코드 작성 목표:** 다음 프로젝트에서는 스타일링 라이브러리와 상태 관리 도구를 적극 활용해 유지보수성을 향상시킬 계획.

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
