import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import './index.css';

import "bootstrap"; //js는 경로를 생략해도 기본 경로로 설정됨
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
//<React.StrictMode>가 있으면 리액트가 화면을 두 번씩 실행한다.(한 번은 테스트)
//통신 등에서 문제가 될 수 있으므로 사용하지 않는 것을 권장
root.render(
  <>
    {/* 리액트 라우터를 사용하는 영역을 지정 */}
    <HashRouter>
    <App />
    </HashRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
