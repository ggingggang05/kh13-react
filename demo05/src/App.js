import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Ex01 from './components/Ex01';
import Ex02 from './components/Ex02';
import { Route, Routes } from 'react-router';
import Ex03 from './components/Ex03';
import Ex04 from './components/Ex04';
import Ex05 from './components/Ex05';
import Pocketmon from './components/integrated/Pocketmon';
import Emp from './components/integrated/Emp';
import Student from './components/integrated/Student';
import Student2 from './components/integrated/Student2';
import FoodMenu from './components/integrated/Menu';
import CountEx from './components/integrated/CountEx';
import DummyLogin from './components/DummyLogin';
import RealLogin from './components/RealLogin';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginIdState, loginLevelState, isLoginState } from './components/utils/RecoilData';
import { Suspense, useCallback, useEffect } from 'react';
import axios from './components/utils/CustomAxios';

function App() {

  //recoil state
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  
  
  //memo
  // const isLogin = useMemo(() => {
  //   return loginId && loginId.length > 0 && loginLevel && loginLevel.length > 0; //로그인 아이디가 있으면서 길이가 0보다 큰 경우 ← 이렇게 해줘야 undefined를 방지
  // }, [loginId, loginLevel]);

  //recoil value
  //recoil에 isLoginState를 만들어 둠으로써 memo 코드를 매 파일마다 만들지 않아도 됨
  const isLogin = useRecoilValue(isLoginState);
  
  //effect
  useEffect(() => {
    refreshLogin();
  }, []);//최초 1회

//call back
const refreshLogin = useCallback(async () => {
  //7번 - 재인증 요청 작업
  //localStorage에 있는 refreshToken의 유무에 따라 로그인 처리를 수행
  const refreshToken = window.localStorage.getItem("refreshToken");
  // console.log(refreshToken);
  if (refreshToken !== null) {//refreshToken 항목이 존재한다면
    //리프레시 토큰으로 Authorization을 변경하고
    axios.defaults.headers.common["Authorization"] = refreshToken;
    //재로그인 요청을 보낸다
    const resp = await axios.post("/member/refresh");

    //8번 - MemberLoginVO 발급 작업
    //결과를 적절한 위치에 설정한다
    setLoginId(resp.data.memberId);
    setLoginLevel(resp.data.memberLevel);
    axios.defaults.headers.common["Authorization"] = resp.data.accessToken;
    window.localStorage.setItem("refreshToken", resp.data.refreshToken);
  }
}, []);

return (
  <>
    {/* 메뉴 배치 */}
    <Menu />

    {/* 메뉴를 눌렀을 때 나올 화면 배치 */}
    <div className='container-fluid my-5 '>
      <div className='row'>
        <div className='col-sm-10 offset-sm-1'>

          {/* 
                메뉴를 눌렀을 때 나올 화면 배치 
                - path를 통해 주소를 설정
                - element를 통해 연결될 화면을 설정
            */}

          {/* <Suspense  fallback={window.confirm("로딩중")}> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ex01' element={<Ex01 />} />
            <Route path='/ex02' element={<Ex02 />} />
            <Route path='/ex03' element={<Ex03 />} />
            <Route path='/ex04' element={<Ex04 />} />
            <Route path='/ex05' element={<Ex05 />} />
            <Route path='/pocketmon' element={<Pocketmon />} />
            <Route path='/emp' element={<Emp />} />
            <Route path="/student2" element={<Student2 />} />
            <Route path='/menu' element={<FoodMenu />} />
            <Route path='/count' element={<CountEx />} />
            <Route path='/dummy' element={<DummyLogin />} />
            <Route path='/login' element={<RealLogin />} />

            {isLogin && <Route path='/student' element={<Student />} />}

          </Routes>
{/* </Suspense> */}
        </div>
      </div>
    </div>
  </>
);
}

export default App;
