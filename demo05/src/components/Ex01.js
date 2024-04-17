import { useState } from "react";
import Jumbotron from "./Jumbotron";


function Ex01() {

    //state
    const [students, setStudents] = useState([
        { studentNo: 1, studentName: "손흥민", studentScore: 100 },
        { studentNo: 2, studentName: "이예림", studentScore: 77 },
        { studentNo: 3, studentName: "권서영원한건절대없어", studentScore: 0 },
        { studentNo: 4, studentName: "권유정", studentScore: 47 },
        { studentNo: 5, studentName: "방정은", studentScore: 20 },
    ]);

    return (
        <>
            <Jumbotron title="예제1번" content="객체 배열 State" />

            {/* ES6에서 배열을 변환할 때는 map 함수를 사용한다 */}
            {/*  
                <c:forEach var="student" items="${students}">
                    <div>
                        <span>${student.studentNo}</span>
                        <span>${student.studentName}</span>
                        <span>${student.studentScore}점</span>
                    </div>
                </c:forEach>
            */}
            {students.map((student, index) => (
                <div>
                    <span>{student.studentNo}</span>
                    <span>{student.studentName}</span>
                    <span>{student.studentScore}점</span>
                </div>
            ))}
        </>
    );
}

export default Ex01;