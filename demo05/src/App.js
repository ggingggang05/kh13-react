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

function App() {
  return (
    <>
      {/* 메뉴 배치 */}
      <Menu/>

      {/* 메뉴를 눌렀을 때 나올 화면 배치 */}
      <div className='container-fluid my-5 '>
        <div className='row'>
          <div className='col-sm-10 offset-sm-1'>
            
            {/* 
                메뉴를 눌렀을 때 나올 화면 배치 
                - path를 통해 주소를 설정
                - element를 통해 연결될 화면을 설정
            */}
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/ex01' element={<Ex01/>}/>
              <Route path='/ex02' element={<Ex02/>}/>
              <Route path='/ex03' element={<Ex03/>}/>
              <Route path='/ex04' element={<Ex04/>}/>
              <Route path='/ex05' element={<Ex05/>}/>
              <Route path='/pocketmon' element={<Pocketmon/>}/>
              <Route path='/emp' element={<Emp/>}/>
              <Route path='/student' element={<Student/>}/>
              <Route path="/student2" element={<Student2/>}/>
              <Route path='/menu' element={<FoodMenu/>}/>
            </Routes>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
