import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { TbPencilCancel } from "react-icons/tb";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

const Menu = ()=>{

    //state
    const[menus, setMenus] = useState([]);
    const[input, setInput] = useState({
        menuNameKor:"",
        menuNameEng:"",
        menuType:"",
        menuPrice:""
    });
    const[backup, setBackup] = useState(null);

    //effect
    useEffect(() => {
        loadData();
    }, []);

    //callback
    //목록
    const loadData = useCallback(async() => {
        const resp = await axios.get("/menu/");
        setMenus(resp.data);
    }, [menus]);

    //등록
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);
    const saveInput = useCallback(async ()=>{
        await axios.post("/menu/", input);
        loadData();
        clearInput();
        closeModal();
    }, [input]);
    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if(choice === false) return;

        clearInput();
        closeModal();
    }, [input]);
    const clearInput = useCallback(() => {
        setInput({
            menuNameKor:"",
            menuNameEng:"",
            menuType:"",
            menuPrice:""
        });
    }, [input]);

    //수정
    const changeMenu = useCallback((e, target)=> {
        const copy = [...menus];
        const copy2 = copy.map(menu =>{
            if(target.menuNo === menu.menuNo) {
                return {
                    ...menu,
                    [e.target.name] : e.target.value
                };
            }
            else {
                return {...menu};
            }
        });
        setMenus(copy2);
    }, [menus]);

    const editMenu = useCallback((target) =>{
        const copy = [...menus];

        const recover = copy.map(menu=> {
            if(menu.edit === true) {
                return {...backup, edit:false};
            }
            return {...menu};
        });

        setBackup({...target});

        const copy2 = recover.map(menu => {
            if(target.menuNo === menu.menuNo) {
                return {
                    ...menu,
                    edit:true,
                };
            }
            else {
                return {...menu};
            }
        });

        setMenus(copy2);
    }, [menus]);

    const saveEditMenu = useCallback(async(target)=>{
        await axios.patch("/emp/", target);
        loadData();
    },[menus]);
    const cancelEditMenu = useCallback((target) => {
        const copy = [...menus];

        const copy2 = copy.map(menu=>{
            if(target.menuNo === menu.menuNo) {
                return {
                    ...backup, 
                    edit:false,
                };
            }
            else {
                return {...menu};
            }
        });

        setMenus(copy2);
    }, [menus]);

    //삭제
    const deleteMenu = useCallback(async(target) => {
        const choice = window.confirm("정말 삭제할꾸임?");
        if(choice === false) return;

        await axios.delete("/menu/"+ target.menuNo);
        loadData();
    }, [menus]);


    //ref + modal
    const bsModal = useRef();

    const openModal = useCallback(() =>{
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    //view
    return(
        <>
            {/* 주석 */}
            <Jumbotron title="메뉴 관리" content ="메뉴관리해보자" />

            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col">
                    <button className='btn btn-primary' onClick={e=>openModal()}>
                        신규등록
                    </button>
                </div>
            </div>

            {/* 목록 */}
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-hover">
                        <thead className="text-center">
                            <tr>
                                <th width="100">번호</th>
                                <th>메뉴명(한글)</th>
                                <th>메뉴명(영어)</th>
                                <th>종류</th>
                                <th>가격</th>
                                <th width="100">관리</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {menus.map(menu=>(
                                <tr key={menu.menuNo}>
                                    {menu.edit === true ? (
                                        <>
                                            <td>{menu.menuNo}</td>
                                            <td>
                                                <input type="text" className="form-control" name="menuNameKor"
                                                            value={menu.menuNameKor} onClick={e=>changeMenu(e, menu)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="menuNameEng"
                                                            value={menu.menuNameEng} onClick={e=>changeMenu(e, menu)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="menuType"
                                                            value={menu.menuType} onClick={e=>changeMenu(e, menu)}/>
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" name="menuPrice"
                                                            value={menu.menuPrice} onClick={e=>changeMenu(e, menu)}/>
                                            </td>
                                            <td>
                                                <FaCheck className="text-success me-2" 
                                                    onClick={e=>saveEditMenu(menu)}/>
                                                <TbPencilCancel className='text-danger' 
                                                    onClick={e=>cancelEditMenu(menu)} />
                                            </td>
                                        </>
                                    ):(
                                        <>
                                            <td>{menu.menuNo}</td>
                                            <td>{menu.menuNameKor}</td>
                                            <td>{menu.menuNameEng}</td>
                                            <td>{menu.menuType}</td>
                                            <td>{menu.menuPrice}</td>
                                            <td>
                                                <FiEdit className="text-warning me-2" onClick={e=> editMenu(menu)} />
                                                <HiArchiveBoxXMark className="text-danger" onClick={(e)=>deleteMenu(menu)}/>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                            
            {/*  Model */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 메뉴 등록</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={e=>cancelInput()}></button>
                        </div>
                        <div className="modal-body">
                            {/*  등록 화면  */}
                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>메뉴명(한글)</label>
                                    <input type='text' name='menuNameKor' value={input.menuNameKor} onChange={e=>changeInput(e)} className='form-control'/>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>메뉴명(영어)</label>
                                    <input type='text' name='menuNameEng' value={input.menuNameEng} onChange={e=>changeInput(e)} className='form-control'/>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>메뉴종류</label>
                                    <input type='text' name='menuType' value={input.menuType} onChange={e=>changeInput(e)} className='form-control'/>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>가격</label>
                                    <input type='text' name='menuPrice' value={input.menuPrice} onChange={e=>changeInput(e)} className='form-control'/>
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
}

export default Menu;