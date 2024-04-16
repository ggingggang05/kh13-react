//import
import { useMemo, useState } from "react";

//function
function Ex06() {

    //state - 화면의 근원 데이터, useState로 선언
    const [javaScore, setJavaScore] = useState(0);
    const [reactScore, setReactScore] = useState(0);
    const [dbScore, setDbScore] = useState(0);
    const [designScore, setDesignScore] = useState(0);

    //memo - state에서 계산하는 데이터, useMemo(함수, [감지항목])로 선언
    const total = useMemo(() => {
        return javaScore + reactScore + dbScore + designScore;
    }, [javaScore, reactScore, dbScore, designScore]);
    const average = useMemo(() => {
        return total / 4;
    }, [total]);

    return (
        <>
            <h1>6번화면 - 성적계산기</h1>

            자바 <input type="text" value={javaScore}
                onChange={e => setJavaScore(parseInt(e.target.value))} />
            <br /><br />
            리액트 <input type="text" value={reactScore}
                onChange={e => setReactScore(parseInt(e.target.value))} />
            <br /><br />
            DB <input type="text" value={dbScore}
                onChange={e => setDbScore(parseInt(e.target.value))} />
            <br /><br />
            디자인 <input type="text" value={designScore}
                onChange={e => setDesignScore(parseInt(e.target.value))} />
            <hr />

            총점 : {total} 점
            <br /><br />
            평균 : {average.toFixed(2)}점  {/* 평균 값을 소수점 2자리까지 표시 */}
        </>
    );
}

//export
export default Ex06;