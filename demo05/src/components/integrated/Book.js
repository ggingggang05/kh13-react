import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";

const Book = ()=>{

    //state
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size, setSize] = useState(100);
    const [books, setBooks] = useState([]);

    //effect
    // useEffect(()=>{}, [books]);//books가 변경될 때마다 실행
    useEffect(()=>{
        loadData();
    },[]);//최초 1번 실행

    //callback
    const loadData = useCallback(async () => {
        // const resp = await axios.get("/book/");
        const resp = await axios.get(`/book/page/${page}/size/${size}`);
        setBooks(resp.data);
    }, [books]);
    const loadMoreData = useCallback(async()=>{
        const nextPage = page + 1;
        setPage(nextPage);
        const resp = await axios.get(`/book/page/${nextPage}/size/${size}`);
        setBooks([...books, ...resp.data]);//이어붙이기 //원래있던 배열 펼치고 새로 만든 배열 펼쳐서 하나로 합쳐 덮어쓰기
    }, [books]);

    return (
        <>
            <Jumbotron title="무한 스크롤 예제(도서)"/>

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>출판사</th>
                                <th>저자</th>
                                <th>출간일</th>
                                <th>가격</th>
                                <th>페이지수</th>
                                <th>장르</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {books.map(book=>(
                            <tr>
                                <td>{book.bookId}</td>
                                <td>{book.bookTitle}</td>
                                <td>{book.bookPublisher}</td>
                                <td>{book.bookAuthor}</td>
                                <td>{book.bookPublicationDate}</td>
                                <td>{book.bookPrice}</td>
                                <td>{book.bookPageCount}</td>
                                <td>{book.bookGenre}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 더보기 버튼 */}
                <div className="row mt-2">
                    <div className="col">
                        <button className="btn btn-primary btn-lg w-100" onClick={e=>loadMoreData()}>
                            더보기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;