import Jumbotron from "../Jumbotron";
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from "axios"; //비동기 통신 전용 라이브러리
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { Modal } from "bootstrap";
import { FaPlus } from "react-icons/fa";

//function Pocketmon(){}
const Pocketmon = () => {
    //state
    const [pocketmons, setPocketmons] = useState([

    ]);
    const [input, setInput] = useState({
        pocketmonNo: "",
        pocketmonName: "",
        pocketmonType: ""
    });

    //ref(참조)
    // - 리액트에서 태그를 선택하는 대신 사용하는 도구(그 외의 용도도 가능)
    // - 변수명.current를 이용하여 현재 참조하고 있는 대상 태그를 호출할 수 있음
    const bsModal = useRef();//리모컨
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    //effect 
    // : 시작 시점 또는 state가 변경되는 시점에 자동으로 실행되는 코드
    // - 가급적이면 안 쓰거나 적게 쓰는게 좋다(성능에 무리가 가기 때문)
    // - index.js에 있는 <React.StrictMode> 태그의 영향을 받는다 (x2)
    // - useEffect(함수, [연관항목]);

    // : 시작하자마자 서버와 통신해서 pocketmons에 데이터를 넣는다*
    useEffect(() => {
        loadData();
    }, []); //연관항목을 지움으로써 최초 1회만 실행 됨

    //포켓몬 등록
    //callback
    const changeInput = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,//원래input을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [input]);
    const saveInput = useCallback((e) => {
        /*$.ajax({
            url:"http://localhost:8080/pocketmon/",
            method:"post",
            data: input,
            success:function(resp){}
        });*/

        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "post",
            data: input
        })
            .then(resp => {
                //등록이 완료되면 목록 갱신을 진행
                loadData();

                setInput({ //화면 비우기
                    pocketmonNo: "",
                    pocketmonName: "",
                    pocketmonType: ""
                });

                closeModal();
            });
    }, [input]);
    const cancelInput = useCallback((e) => {
        //필요하다면 확인 창 추가

        setInput({
            pocketmonNo: "",
            pocketmonName: "",
            pocketmonType: ""
        });

        closeModal();
    }, [input]);

    //포켓몬 삭제
    const deletePocketmon = useCallback((target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        //삭제 비동기 요청 후 목록 갱신
        axios({
            url: "http://localhost:8080/pocketmon/" + target.pocketmonNo,
            // url:`http://localhost:8080/pocketmon/${target.pocketmonNo}`, //백틱 구문
            method: "delete"
        })
            .then(resp => {
                loadData();
            });
    }, [pocketmons]);

    //목록 불러오기 (useEffect 안에서 사용되는 코드가 다른 곳에서도 사용되므로 함수화 하여 사용)
    const loadData = useCallback(() => {
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
        //axios.get('http://localhost:8080/pocketmon/').then(resp => setPocketmons(resp.data));
        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get",
        })
            .then(resp => { //then이 success의 역할
                //console.log(resp);
                setPocketmons(resp.data);
            });
    }, [pocketmons]);

    return (
        <>
            <Jumbotron title="포켓몬스터 관리" />

            {/*  신규등록버튼(모달띄우기) */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary"
                        onClick={e => openModal()}>
                        <FaPlus />
                        신규등록
                    </button>
                </div>
            </div>

            {/*  목록 출력 */}
            <div className="row mt-4">
                <div className="col text-center">
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
                            {pocketmons.map(pocketmon => (
                                <tr key={pocketmon.pocketmonNo}>
                                    <td>{pocketmon.pocketmonNo}</td>
                                    <td>{pocketmon.pocketmonName}</td>
                                    <td>{pocketmon.pocketmonType}</td>
                                    <td>
                                        <button className="btn btn-danger"
                                            onClick={(e) => deletePocketmon(pocketmon)}>
                                            <HiArchiveBoxXMark />삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/*  Model */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 몬스터 등록</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={e=>cancelInput()}></button>
                        </div>
                        <div className="modal-body">
                            {/*  등록 화면  */}
                            <div className="row mt-4">
                                <div className="col">
                                    <label>번호</label>
                                    <input type="text" name="pocketmonNo" value={input.pocketmonNo}
                                        onChange={e => changeInput(e)} className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>이름</label>
                                    <input type="text" name="pocketmonName" value={input.pocketmonName} onChange={e => changeInput(e)} className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>속성</label>
                                    <input type="text" name="pocketmonType" value={input.pocketmonType} onChange={e => changeInput(e)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="row mt-4">
                                <div className="col text-end">
                                    <button className="btn btn-success me-2" onClick={e => saveInput()}>등록</button>
                                    <button className="btn btn-danger" onClick={e => cancelInput()}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Pocketmon;