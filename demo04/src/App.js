import logo from './logo.svg';
import './App.css';
import { useMemo, useState } from 'react';
import Ex01 from './components/Ex01';


function App() {

  //state - 입력창의 name과 이름이 같아야 편하게 객체 state를 이용할 수 있다
  const[member, setMember] = useState({//입력값
    memberId : "", 
    memberPw : "", 
    memberPwRe : ""
  });
  const [result, setResult] = useState({//판정결과
    memberId : null,
    memberPw : null,
    memberPwRe : null
  });


  //function
  const changeMember = e =>{
    //e는 이벤트 정보이며, e.target은 이벤트 발생 대상 태그이다
    //태그의 name과 value를 추출해서 member를 변경(setMember 호출)
    setMember({
      ...member, //member의 나머지 항목은 유지를 시키고
      [e.target.name] : e.target.value //입력된 창의 이름에 대한 값만 변경하겠다
    });
  };

  const changeResult = e => {
    //입력이 발생한 항목에 따라 검사를 다르게 한 뒤 결과를 설정
    const name = e.target.name;//입력 창의 name 속성
    // const value = e.target.value;//입력 창의 value 속성
    // const value = member[name];//member 객체의 name 필드 값

    if(name == "memberId") {
      const regex = /^[a-z][a-z0-9]{7,19}$/;
      setResult({
        ...result, //나머지 result 항목은 유지시키고
        memberId : regex.test(member.memberId)
      });
    }
    else if(name == "memberPw") {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{6,15}$/;
      setResult({
        ...result, //나머지 result 항목은 유지시키고
        memberPw: regex.test(member.memberPw) //비밀번호 판정결과 갱신
      });
    }
    else if(name == "memberPwRe") {
      const isValid = member.memberPw.length > 0 && member.memberPw == member.memberPwRe;
      setResult({
        ...result, //나머지 result 항목은 유지시키고
        memberPwRe : isValid //비밀번호 확인 판정결과 갱신
      });
    }
  };

  //memo - 하나의 결론을 낼 수 있는 값을 계산할 때 사용
  const ok = useMemo(()=>{
    return result.memberId && result.memberPw && result.memberPwRe;
  }, [member, result]);

  return(
    <div className="container-fluid">
      {/*기본 폭 설정*/ }
      <div className='row'>
        <div className='col-md-10 offset-md-1'>


        {/*점보트론*/ }
      <div className='row mt-5'>
        <div className='col'>
          <div className='p-4 bg-dark text-light rounded text-center'>
            <h1>회원가입</h1>
          </div>
        </div>
      </div>

        {/*각종 입력창(아이디, 비밀번호, 비밀번호 확인)*/}
        <div className='row mt-4'>
          <div className='col'>
            <label>아이디</label>
            <input type='text' name='memberId' 
                        //className={'form-control' + ' ' + (result.memberId ? 'is-valid' : 'is-invalid')}
                        className={`
                            form-control
                            ${result.memberId === true ? 'is-valid' : ''}
                            ${result.memberId === false ? 'is-invalid' : ''}
                        `}
                        value={member.memberId} onChange={changeMember} onBlur={changeResult} />
          </div>
        </div>

        {/* 실행을 내가 시키는게 아님  -> 함수 이름만 
              실행을 내가 시키고 싶음  -> 함수() 로 호출
        */}
        <div className='row mt-4'>
          <div className='col'>
            <label>비밀번호</label>
            <input type='password' name='memberPw' 
                        //className={'form-control ' + (result.memberPw ? 'is-valid' : 'is-invalid')}
                        className={`
                            form-control
                            ${result.memberPw === true ? 'is-valid' : ''}
                            ${result.memberPw === false ? 'is-invalid' : ''}
                        `}
                        value={member.memberPw} onChange={changeMember} onBlur={changeResult} />
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col'>
            <label>비밀번호 확인</label>
            <input type='password' name='memberPwRe' 
                        className={`
                            form-control  //고정 클래스
                            ${result.memberPwRe === true ?  'is-valid' : ''} //가변 클래스
                            ${result.memberPwRe === false ? 'is-invalid' : ''}
                        `}
                        value={member.memberPwRe} onChange={changeMember} onBlur={changeResult} />
          </div>
        </div>

        <div className='col mt-4'>
          <div className='col'>
            <button type='button' className='btn btn-success w-100' disabled={ok !== true}>
              회원가입
            </button>
          </div>
        </div>

        </div>
      </div>
    </div>

    
  );
}

export default App;