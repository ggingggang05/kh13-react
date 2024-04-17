import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";

function Ex04() {

    //state
    const [nations, setNations] = useState([
        {no:1, name:"한국", capital:"서울"},
        {no:2, name:"미국", capital:"워싱턴"},
        {no:3, name:"일본", capital:"도쿄"},
        {no:4, name:"중국", capital:"베이징"},
        {no:5, name:"영국", capital:"런던"},
        {no:6, name:"프랑스", capital:"파리"},
        {no:7, name:"독일", capital:"베를린"},
        {no:8, name:"인도", capital:"뉴델리"},
        {no:9, name:"호주", capital:"캔버라"},
        {no:10, name:"스페인", capital:"마드리드"},
    ]);

    //function(callback)
    // - const 함수명 = useCallback(함수, [연관항목]);
    // - 연관항목이 변했을 경우만 함수를 재설정하게 되어 최적화 가능
    // - 연관항목이 없으면 비어있는 배열로 설정
    
    //function deleteNation(target){} 
    //const deleteNation = (target)=>{}; 화살표 함수(arrow function)사용 (this 사용을 막기 위해)
    const deleteNation = useCallback((target)=>{
        const searchResult = nations.filter((nation)=>nation.no !== target.no);
        setNations(searchResult);
    }, [nations]);

    const clearNations = useCallback(()=>{
        setNations([]);
    }, [nations]);

    return (
        <>
            <Jumbotron title="국가 정보" content="목록, 전체삭제, 삭제까지 구현"/>

            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-danger"
                        onClick={e=>clearNations()}>전체삭제</button>
                </div>
            </div>

            <div className="row mt-4 text-center">
                <div className="col-3">번호</div>
                <div className="col-3">국가</div>
                <div className="col-3">수도</div>
                <div className="col-3">메뉴</div>
            </div>
            <hr/>
            {nations.map((nation)=>(
            <div className="row mt-2 text-center align-items-center" key={nation.no}>
                <div className="col-3">{nation.no}</div>
                <div className="col-3">{nation.name}</div>
                <div className="col-3">{nation.capital}</div>
                <div className="col-3">
                    <button className="btn btn-danger"
                            onClick={e=>deleteNation(nation)}>삭제</button>
                </div>
            </div>
            ))}
        </>
    );
}

export default Ex04;