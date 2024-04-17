import { useState } from "react";
import Jumbotron from "./Jumbotron";


function Ex03(){

    const [items, setItems] = useState(
        [
            {itemNo:1, itemName:"참이슬", itemPrice:1200},
            {itemNo:2, itemName:"처음처럼", itemPrice:1500},
            {itemNo:3, itemName:"새로", itemPrice:1700},
            {itemNo:4, itemName:"좋은데이", itemPrice:1000},
            {itemNo:5, itemName:"청하", itemPrice:2200}
        ]
    );

    return(
        <>
            <Jumbotron title="예제3번" content="예제 3번일까나?"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-danger text-center">
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>품명</td>
                                <td>가격</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.itemNo}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemPrice}원</td>
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