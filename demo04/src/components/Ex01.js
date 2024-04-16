//import
import {useState, useMemo} from "react";
import { isEqual } from "lodash";

//function
function Ex01(){

    const [member, setMember] = useState({
        memberId : "", memberPw : "", memberPwRe : ""
    });

    const memberInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setMember({
            ...member,
            [name] : value
        });
    };

    const isIdValid = useMemo(() => {
        return /^[a-z][a-z0-9]{7,19}$/.test(member.memberId);
    }, [member.memberId]);

    const isPwValid = useMemo(()=>{
        return /^[A-Za-z0-9!@#$]{6,15}$/.test(member.memberPw);
    }, [member.memberPw]);
    
    const isPwReValid = useMemo(()=>{
        return isEqual(member.memberPw, member.memberPwRe);
    }, [member]);


    return (
        <>
            <h4>아이디</h4>
            <input type="text" name="memberId" value={member.memberId} onChange={memberInfo}/>
            <div style={{ color: isIdValid ? 'green' : 'red' }}>
                {isIdValid ? '아이디 ok' : '다시 입력'}
            </div>

            <h4>비밀번호</h4>
            <input type="password" name="memberPw" value={member.memberPw} onChange={memberInfo} />
            <div style={{ color: isPwValid ? 'green' : 'red' }}>
                {isPwValid ? '비밀번호 ok' : '다시 입력'}
            </div>

            <h4>비밀번호 확인</h4>
            <input type="password" name="memberPwRe" value={member.memberPwRe} onChange={memberInfo} />
            <div style={{ color: isPwReValid ? 'green' : 'red' }}>
                {isPwReValid ? '비밀번호 확인 ok' : '다시 입력'}
            </div>
        </>
    );
}

//export
export default Ex01;