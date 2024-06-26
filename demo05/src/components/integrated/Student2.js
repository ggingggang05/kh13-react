import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import { FaSquareXmark } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import axios from "../utils/CustomAxios";
import { Modal } from "bootstrap";
import Row from "../Row";

const Student = () => {

    //state
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState({
        name:"",
        koreanScore:"",
        englishScore:"",
        mathScore:""
    });

    //effect
    useEffect(() => {
        loadData();
    }, []);

    //callback
    // const loadData = useCallback(()=>{
    //     axios.get("/student/")
    //     .then(resp=>{
    //         setStudents(resp.data);
    //     });
    // }, [students]);

    //- 자바스크립트는 너무나도 많은 비동기 코드를 가지고 있다(특히 ajax)
    //- 필요 이상으로 코드가 중첩되는 것을 막기 위해 ES6에서 Promise 패턴이 나온다
    //- async 함수를 만들고 내부에서 await 키워드를 사용하면 비동기 코드를 동기처럼 사용 가능
    const loadData = useCallback(async ()=>{
        const resp = await axios.get("/student/"); 
        setStudents(resp.data);
    }, [students]);

    const deleteStudent = useCallback(async (target)=>{
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        //target에 있는 내용을 서버에 지워달라고 요청하고 목록을 다시 불러온다
        const resp = await axios.delete("/student/"+target.studentId);
        loadData();
    }, [students]);

    //신규 등록 화면 입력값 변경
    const changeInput = useCallback((e)=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);
    //등록
    const saveInput = useCallback(async ()=>{
        //입력값에 대한 검사 코드가 필요하다면 이자리에 추가하고 차단!
        //if(검사결과 이상한 데이터가 입력되어 있다면) return;

        //input에 들어있는 내용을 서버로 전송하여 등록한 뒤 목록 갱신 + 모달 닫기
        const resp = await axios.post("/student/", input);
        loadData();
        clearInput();
        closeModal();
    }, [input]);
    //등록 취소
    const cancelInput = useCallback(()=>{
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if(choice === false) return;
        clearInput();
        closeModal();
    }, [input]);
    //입력값 초기화
    const clearInput = useCallback(()=>{
        setInput({
            name:"", koreanScore:"", englishScore: "", mathScore:""
        });
    }, [input]);

    //ref + modal
    const bsModal = useRef();
    const openModal = useCallback(()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    //view
    return (
        <>
            {/* 제목 */}
            <Jumbotron title="학생 관리" content="학생 관련 C.R.U.D" />

            {/* 추가 버튼 */}
            <Row>
                <button className="btn btn-primary" 
                        onClick={e=>openModal()}>
                    <IoMdAdd/>
                    신규 등록
                </button>
            </Row>
            

            {/* 데이터 출력(표) */}
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>국어</th>
                                <th>영어</th>
                                <th>수학</th>
                                <th>메뉴</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {students.map(student => (
                                <tr key={student.studentId}>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.koreanScore}</td>
                                    <td>{student.englishScore}</td>
                                    <td>{student.mathScore}</td>
                                    <td>
                                        <FaSquareXmark className="text-danger" 
                                            onClick={e=>deleteStudent(student)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 학생 등록</h1>
                        <button type="button" className="btn-close" aria-label="Close"
                                onClick={e=>cancelInput()}></button>
                    </div>
                    <div className="modal-body">
                        {/* 등록 화면 */}
                        
                        <div className="row">
                            <div className="col">
                                <label>학생명</label>
                                <input type="text" name="name" 
                                    value={input.name} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>국어점수</label>
                                <input type="text" name="koreanScore" 
                                    value={input.koreanScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>영어점수</label>
                                <input type="text" name="englishScore" 
                                    value={input.englishScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>수학점수</label>
                                <input type="text" name="mathScore" 
                                    value={input.mathScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-success me-2' onClick={e=>saveInput()}>
                            등록
                        </button>
                        <button className='btn btn-danger' onClick={e=>cancelInput()}>
                            취소
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Student;