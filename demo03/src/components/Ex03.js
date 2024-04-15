//import
import { useState } from "react";

//function
function Ex03(){

    //const[변수명, 세터함수명] = useState(초기값);
    const [size, setSize] = useState(300);

    return (
        <>
            <h2>3번화면 - 이미지 크기 조절</h2>

            <button onClick={e=>setSize(150)}>작게</button>
            &nbsp;&nbsp;
            <button onClick={e=>setSize(300)}>보통</button>
            &nbsp;&nbsp;
            <button onClick={e=>setSize(450)}>크게</button>
            
            <hr/>
            
            <input type="range" min={150} max={450} value={size}
                        onChange={e=>setSize(parseInt(e.target.value))}/>

            <hr/>

            <img class="dummy" 
                        src="https://picsum.photos/id/1001/500/500" 
                        width={size} height={size}></img>
        </>
    );
}

//export
export default Ex03;