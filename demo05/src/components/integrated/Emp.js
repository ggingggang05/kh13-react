import Jumbotron from "../Jumbotron";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios"; //비동기 통신 전용 라이브러리
import { Modal } from "bootstrap";


function Emp() {
    //state
    const [emps, setEmps] = useState([]);
    const [input, setInput] = useState({
        empName: "",
        empDept: "",
        empDate: "",
        empSal: ""
    });

    const loadData = useCallback(() => {
        axios.get("http://localhost:8080/emp/").then(resp => {
            setEmps(resp.data);
        });
    }, [emps]);

    //목록
    useEffect(() => {
        loadData();
    }, []);

    //등록
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);
    const saveInput = useCallback((e) => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "post",
            data: input
        }).then(resp => {
            loadData();

            setInput({
                empName: "",
                empDept: "",
                empDate: "",
                empSal: ""
            });

            closeModal();
        });
    }, [input]);
    const cancelInput = useCallback((e) => {
        const choice = window.confirm("정말 취소하시겠습니까?");
        if (choice === false) return;

        setInput({
            empName: "",
            empDept: "",
            empDate: "",
            empSal: ""
        });

        closeModal();
    });

    //회원삭제
    const deleteEmp = useCallback((target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: "http://localhost:8080/emp/" + target.empNo,
            method: "delete",
        }).then(resp => {
            loadData();
        });
    }, [emps]);

    //ref
    const bsModal = useRef();
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current)
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    return (
        <>
            <Jumbotron title="사원관리" />


            {/* 신규등록버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary" onClick={e=>openModal()}>
                        신규등록
                    </button>
                </div>
            </div>

            {/*  목록 출력 */}
            <div className="row mt-4">
                <div className="col text-center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>사원번호</th>
                                <th>사원명</th>
                                <th>부서명</th>
                                <th>입사일</th>
                                <th>급여액</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emps.map(emp => (
                                <tr key={emp.empNo}>
                                    <td>{emp.empNo}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empDept}</td>
                                    <td>{emp.empDate}</td>
                                    <td>{emp.empSal}</td>
                                    <td>
                                        <button className="btn btn-danger"
                                            onClick={e => deleteEmp(emp)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 등록 */}
            <div ref={bsModal} class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">사원 등록</h1>
                            <button type="button" class="btn-close" aria-label="Close" onClick={e=>cancelInput()}></button>
                        </div>
                        <div class="modal-body">
                            <div className="row mt-4">
                                <div className="col">
                                    <label>사원명</label>
                                    <input type="text" name="empName" value={input.empName}
                                        onChange={e => changeInput(e)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>부서명</label>
                                    <input type="text" name="empDept" value={input.empDept}
                                        onChange={e => changeInput(e)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>입사일</label>
                                    <input type="text" name="empDate" value={input.empDate}
                                        onChange={e => changeInput(e)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>급여액</label>
                                    <input type="text" name="empSal" value={input.empSal}
                                        onChange={e => changeInput(e)} className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button className="btn btn-success me-2" onClick={e => saveInput()}>등록</button>
                            <button className="btn btn-danger" onClick={e => cancelInput()}>취소</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Emp;