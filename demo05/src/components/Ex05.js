import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";


function Ex05() {

    //state
    const [persons, setPersons] = useState([
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Smith", age: 30 },
        { id: 3, name: "Emily Brown", age: 22 },
        { id: 4, name: "Michael Johnson", age: 28 },
        { id: 5, name: "Sarah Williams", age: 35 },
        { id: 6, name: "James Wilson", age: 40 },
        { id: 7, name: "Emma Jones", age: 27 },
        { id: 8, name: "William Davis", age: 32 },
        { id: 9, name: "Olivia Miller", age: 29 },
        { id: 10, name: "Daniel Taylor", age: 26 }
    ]);
    const [input, setInput] = useState({ id: "", name: "", age: "" });

    //callback
    const deletePerson = useCallback((target)=>{
        const searchPersons = persons.filter((person)=>person.id !== target.id);
        setPersons(searchPersons);
        //setPersons(persons.filter((person)=>person.id !== target.id));
    }, [persons]);

    const changeInput = useCallback((e)=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);

    const saveInput = useCallback(()=>{
        const choice = window.confirm("작성중인 내용을 저장하시겠습니까?");
        if(choice === false) return;

        setPersons([...persons, {...input}]);

        clearInput();
    }, [input, persons]);

    const cancelInput = useCallback(()=>{
        const choice = window.confirm("작성중인 내용을 취소하시겠습니까?");
        if(choice === false) return;

        clearInput();
    }, [input]);

    const clearInput = useCallback(()=>{
        setInput({ id: "", name: "", age: "" });
    }, [input]);

    return (
        <>
            <Jumbotron title="Person 등록,조회,삭제"/>

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>MENU</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle text-center">
                            {persons.map((person)=>(
                            <tr key={person.id}>
                                <th>{person.id}</th>
                                <th>{person.name}</th>
                                <th>{person.age}</th>
                                <th>
                                    <button className="btn btn-danger"
                                            onClick={e=>deletePerson(person)}>삭제</button>
                                </th>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 등록 화면 */}
            <div className="row mt-4">
                <div className="col">
                    <h1>사람 신규 등록</h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <label>ID</label>
                    <input type="text" name="id" value={input.id}
                        onChange={e=>changeInput(e)} className="form-control"/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <label>NAME</label>
                    <input type="text" name="name" value={input.name}
                        onChange={e=>changeInput(e)} className="form-control"/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <label>AGE</label>
                    <input type="text" name="age" value={input.age}
                        onChange={e=>changeInput(e)} className="form-control"/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success"
                            onClick={e=>saveInput()}>등록</button>
                    <button className="btn btn-danger ms-2"
                            onClick={e=>cancelInput()}>취소</button>
                </div>
            </div>
        </>
    );
}

export default Ex05;