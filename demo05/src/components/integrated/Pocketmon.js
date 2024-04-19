import Jumbotron from "../Jumbotron";
import { useEffect, useState } from 'react';
import axios from "axios"; //비동기 통신 전용 라이브러리

//function Pocketmon(){}
const Pocketmon = ()=>{
    //state
    const[pocketmons, setPocketmons] = useState([
        
    ]);

    //effect 
    // : 시작 시점 또는 state가 변경되는 시점에 자동으로 실행되는 코드
    // - 가급적이면 안 쓰거나 적게 쓰는게 좋다(성능에 무리가 가기 때문)
    // - index.js에 있는 <React.StrictMode> 태그의 영향을 받는다 (x2)
    // - useEffect(함수, [연관항목]);

    // : 시작하자마자 서버와 통신해서 pocketmons에 데이터를 넣는다*
    useEffect(()=>{
        /*
            //jquery를 썼다면 아래 코드를 사용
            $.ajax({
                url:"http://localhost:8080/pocketmon/",
                method:"get",
                //data:{},
                success:function(resp){ //resp에 json의 List<PocketmonDto>가 들어옴 이를 State에 집어 넣으면 됨!!!!**
                    setPocketmons(resp);
                },
                //error:function(){},
                //complete:function(){}
            });
        */

        //jquery는 태그제어가 주요 목적 (세부 기능 중 ajax가 있을 뿐) 
        // → 따라서 다른 라이브러리를 사용함(Axios- https://axios-http.com/kr/docs/intro)
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"get",
        })
        .then(resp=>{ //then이 success의 역할
            //console.log(resp);
            setPocketmons(resp.data);
        }); 
    }, []); //연관항목을 지움으로써 최초 1회만 실행 됨

    return (
        <>
            <Jumbotron title="포켓몬스터 관리" />

            {/*  목록 출력 */}
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocketmons.map(pocketmon =>(
                                <tr key={pocketmon.pocketmonNo}>
                                    <td>{pocketmon.pocketmonNo}</td>
                                    <td>{pocketmon.pocketmonName}</td>
                                    <td>{pocketmon.pocketmonType}</td>
                                    <td>버튼</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Pocketmon;