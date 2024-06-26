//JS파일의 최상단에는 import 키워드가 들어온다
// - 이미지, CSS, 다른 JS 파일 등을 불러올 수 있다
// - ES6 Module 시스템, RequireJS 등을 사용
import logo from './logo.svg';
import './App.css';
import Ex01 from './components/Ex01';
import Ex02 from './components/Ex02';
import Ex03 from './components/Ex03';
import Ex04 from './components/Ex04';
import Ex05 from './components/Ex05';
import Ex06 from './components/Ex06';
import Ex07 from './components/Ex07';

//모든 컴포넌트(JS) 파일에는 함수가 하나 존재한다
// - 함수가 하나의 화면 조각을 의미한다
// - 함수의 이름이 화면의 이름이다
function App() {

  //화면에 필요한 데이터들을 선언하고 계산하는 코드 배치

  //return 뒤에는 반ㄷ시 화면에 대한 코드가 있어야 한다(JSX)
  //JSX는 JSP처럼 HTML을 만들어내는 도구 역할을 수행(순수 HTML이 아님)
  //(중요) 반환되는 화면은 반드시 한 개의 태그로 감싸져야 한다
  // - class 대신 className을 사용해야 한다
  // - 속성에 ""를 쓰면 정적, {}를 쓰면 동적 데이터를 설정해야 한다
  // - 모든 태그는 종료 태그가 있어야 한다(input, img도 마찬가지)
  return (
    <>
      <h1>리액트 컴포넌트 만들기</h1>
      <Ex01></Ex01>
      <hr></hr>
      <Ex02></Ex02>
      <hr></hr>
      <Ex03></Ex03>
      <hr></hr>
      <Ex04></Ex04>
      <hr></hr>
      <Ex05></Ex05>
      <hr></hr>
      <Ex06></Ex06>
      <hr></hr>
      <Ex07></Ex07>
    </>
  );
}

//외부에서 이 파일을 이용할 수 있도록 내보내기 설정
//- 함수 이름(화면 이름)을 내보내기 하여 사용할 수 있도록 처리
export default App;
