//import
import { useState } from "react";

//function
function Ex04(){

    const [money, setMoney] = useState(0);

    return(
        <>
            <h2>은행 이체 화면 문제</h2>

            <hr/>

            <input type="text" value={money} readOnly></input>원

            <hr/>

            <button onClick={e=>setMoney(money + 1000000)}>100만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setMoney(money + 500000)}>50만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setMoney(money + 100000)}>10만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setMoney(money + 50000)}>5만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setMoney(money + 10000)}>1만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setMoney(0)}>정정</button>

        </>
    );
}

//export
export default Ex04;