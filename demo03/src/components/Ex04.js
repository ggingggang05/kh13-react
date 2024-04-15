//import
import { useState } from "react";

//function
function Ex04(){

    const [won, setWon] = useState(0);

    return(
        <>
            <h2>은행 이체 화면 문제</h2>

            <hr></hr>

            <input type="text" value={won}></input>원

            <hr/>

            <button onClick={e=>setWon(won + 1000000)}>100만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setWon(won + 500000)}>50만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setWon(won + 100000)}>10만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setWon(won + 50000)}>5만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setWon(won + 10000)}>1만</button>
            &nbsp;&nbsp;
            <button onClick={e=>setWon(0)}>정정</button>

        </>
    );
}

//export
export default Ex04;