import { FaPlus } from 'react-icons/fa6';

import { countState } from '../utils/RecoilData';
import { useRecoilState } from 'recoil';

const CountPlus = ()=>{

    //state
    const [count, setCount] = useRecoilState(countState);//Recoil에서 불러와서 사용

    return (
        <>
            <h1>CountPlus.js</h1>
            <button className="btn btn-lgn btn-primary" onClick={e=>setCount(count+1)}>
                <FaPlus />
            </button>
        </>
    );
};

export default CountPlus;