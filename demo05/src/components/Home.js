

function Home(){

    return(
        <>
            <h1>메인 페이지</h1>
            {/*  .env에 작성된 REACT_APP_TITLE을 불러와서 출력하도록 설정 */}
            <h2>현재 상태 : {process.env.REACT_APP_TITLE} </h2> 
            {/* process : node.js의 최상위 객체 */}
        </>
    );
}

export default Home;