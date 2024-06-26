import Jumbotron from './../Jumbotron';
import CountMinus from './CountMinus';
import CountPlus from './CountPlus';

import { countState } from '../utils/RecoilData'; //recoil 함수 불러오기
import { useRecoilState } from 'recoil';


const CountEx = () =>{
    //state
    // const [coutn, setCount] = useState(0); //이 컴포넌트에서만 사용; 지역변수 개념인듯?
    const [count, setCount] = useRecoilState(countState);//Recoil에서 불러와서 사용
    
    return(
        <>
            <Jumbotron title ="리코일 이해를 돕기 위한 카운트 예제"/>

            <div className='row mt-4 text-center'>
                <div className='col'>
                    <h1>count = {count}</h1>
                </div>
            </div>

            <div className='row mt-4 text-center'>
                <div className='col-6'>
                    <CountMinus />
                </div>
                <div className='col-6'>
                    <CountPlus />
                </div>
            </div>
        </>
    );
};

export default CountEx;