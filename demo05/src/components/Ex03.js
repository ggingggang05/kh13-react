import { useState } from "react";
import Jumbotron from "./Jumbotron";


function Ex03(){

    const [items, setItems] = useState(
        [
            {itemNo:1, itemName:"참이슬", itemPrice:1200, edit:false},
            {itemNo:2, itemName:"처음처럼", itemPrice:1500, edit:false},
            {itemNo:3, itemName:"새로", itemPrice:1700, edit:false},
            {itemNo:4, itemName:"좋은데이", itemPrice:1000, edit:false},
            {itemNo:5, itemName:"청하", itemPrice:2200, edit:false}
        ]
    );

    //전체 삭제란 비어있는 배열로 state를 덮어쓰기 한다는 것을 의미한다
    //(중요) React는 절대로 state를 고치면 안 된다(새로 만들어 덮어쓰기 해야 함)
    
    //function clearItems(e) {}
    const clearItems = (e) => {
        setItems([]);//삭제
    };

    const deleteItem = (target) => {
        //items에서 item이 아닌 항목만 검색해서 재설정(삭제 효과)
        // const searchItems = items.filter(function(item){
        //     return item.itemNo !== target.itemNo;
        // });
        const searchItems =
                items.filter((item)=>item.itemNo !== target.itemNo);

        setItems(searchItems);//검색 결과로 state를 덮어쓰기
    };

    return(
        <>
            <Jumbotron title="예제3번" content="예제 3번일까나?"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    {/* <button className="btn btn-danger" onClick={clearItems}>전체삭제</button> */}
                    <button className="btn btn-danger" onClick={e => clearItems(e)}>전체삭제</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>품명</td>
                                <td>가격</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 
                                map을 이용한 반복을 할 때
                                생성하는 태그에 제어가 가능한 고유 식별자를 추가(key)

                                안해도 구동은 되지만 지속적인 오류 + 순서 변환 안 됨
                            */}
                            {items.map((item) => (
                                <tr key={item.itemNo}>
                                    {item.edit === true ?(
                                        <>
                                            <td>
                                                <input type="text" value={item.itemNo} />
                                            </td>
                                            <td>입력창</td>
                                            <td>입력창</td>
                                            <td>버튼</td>
                                        </>
                                    ):(
                                        <>
                                        <td>{item.itemNo}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemPrice}원</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={e=>deleteItem(item)}> &minus; </button>
                                        </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Ex03;