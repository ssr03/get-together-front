# 스터디 모집 사이트

## :star: Intro

> react 기반으로 개발된 '스터디 모집 사이트'  front-end에 대한 문서 

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/)

### Run in development

```powershell
# 스터디 모집 사이트 레포 클론
> git clone https://github.com/ssr03/get-together-front.git

# 폴더 변경
> cd get-together-front

# 프로젝트 셋업
> npm install

# run server
> npm start
```

### Project folder structure

```
​```
src
├── serviceWorker.js
├── index.js
├── config.js //전역에서 사용하는 설정 파일-backend url설정
├── Root.js
├── App.js
├── App.test.js
├── setupTests.js
├── components
│   ├── Header.js //header
│   ├── TitleNavBar.js // Title을 포함하는 Navbar
│   ├── SubNavBar.js // TitleNavbar의 하위 Navbar
│   ├── SearchBar.js // 검색
│   ├── NotContentFound.js // 검색 결과 없는 경우 component
│   ├── NotFound.js // 없는 페이지
│   ├── LoginForm.js //로그인 입력 form
│   ├── StudyCardList.js //Card형식의 스터디 모집을 모아둔 component
│   ├── StudyCard.js // Card형식의 스터디 모집 component
│   ├── CommentForm.js //댓글 입력 form
│   ├── CommentList.js //댓글 리스트
│   ├── CommentItem.js //댓글 한개
│   ├── ReplyList.js //답글 리스트
│   ├── ReplyItem.js //답글 한개
│   ├── Detail.js //스터디 세부 정보
│   ├── SideBar.js // 사이드바(스터디 디테일 페이지에 있는 SideBar)
│   ├── StudyMemebr.js // 스터디에 참여한 스터디 멤버 리스트
│   ├── GoogleMap.js //구글 지도 map
│   ├── WriteForm.js //스터디 모집 작성 form
│   ├── ScheduleItemList.js //스터디 모집 작성에서 schedule리스트
│   ├── ScheduleItem.js //스터디 모집 작성에서 schedule 한개
│   ├── MyStudyList.js // 내 스터디 리스트
│   ├── MyStudyRow.js // 내 스터디 리스트 중 열 하나
│   ├── NoteDetail.js // 쪽지 내용
│   ├── NoteList.js // 쪽지 리스트
│   ├── NoteRow.js	//쪽지 리스트의 열 하나
├── containers // state를 포함하는 component
│   ├── Login.js //로그인 container
│   ├── MyStudy.js // 내 스터디 관련 container
|   ├── Note.js	// 쪽지 상세 container
|   ├── NoteBox.js // 쪽지함 container
│   ├── StudyDetail.js // 스터디 모집 상세 container
│   ├── StudyList.js // 스터디 리스트 container
│   ├── StudyWrite.js // 스터디 작성 container
├── inculde
│   ├── App.css
│   ├── custom.css
│   ├── comment.css //댓글 관련 css
│   ├── note.css //쪽지관련 css
|   ├── index.css
|   ├── bootstrap.min.css
├── pages
│   ├── index.js
│   ├── Mypage.js
│   ├── NoteBoxPage.js //쪽지함 페이지
│   ├── NoteDetail.js // 쪽지 상세 페이지
|   ├── SingIn.js //로그인 페이지
|   ├── StudyRecruit.js //메인페이지, 스터디 모집 리스트 페이지
|   ├── StudyRecruitDetail.js //스터디 모집 상세 페이지
|   ├── StudyRecruitWrite.js //스터디 모집 작성 페이지
├── public
│   ├── img 
|   ├── index.tml //head를 포함한 전체 html
|   ├── manifest.json
├── package.json // 설치 라이브러리
├── utils //함수들을 모아둔 폴더
|   ├── status.js
│   ├── isCheck.js
​```
```

### npm으로 설치된 패키지

| 패키지           | 버전   |
| ---------------- | ----- |
| react-bootstrap  | 1.0.0  |
| google-map-react | 1.1.6  |
| react-dropzone   | 10.2.1 |
| react-router     | 5.1.2  |
| react-router-dom | 5.1.2  |

### 주요 설정

* config.js 참조

  ```javascript
  // 백엔드 api url입력
  export const SERVICE_URL= "[백엔드 api url]";
  ```

  * 백엔드 api url: `http://[ip주소]:[port]`
  * ex)http://localhost:8080

### 프로젝트 URL

http://localhost:3000/study

## 셋팅 방법

* 새로운 프로젝트 생성

  ```node
  npm install -g create-react-app
  create-react-app my-app
  ```

* react-router

  > * https://velopert.com/3417
  > * https://reacttraining.com/react-router/web/guides/quick-start

  * 여러 페이지가 있는 경우 라우터 사용

  ```node
  npm install --save react-router-dom
  ```

* image drag and drop

  > https://github.com/react-dropzone/react-dropzone
  ```node
  npm install —- save react-dropzone
  ```

* 구글 지도 사용

  > * goole-map-react: https://github.com/google-map-react/google-map-react
  > * google maps javascript api: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/

  ```node
  npm install --save google-map-react
  ```

  * Google Maps JavaScript API 사용

