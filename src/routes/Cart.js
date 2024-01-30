import {Table} from 'react-bootstrap';
import {useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { changeName,increase } from './../store/userSlice.js';
import { changeNumber } from './../store.js';

//memo 재런더링 막아줌
//useMemo
//lazy import
//useTransition
//startTranstion
//useDeferredValue
//PWA


let Child =  function(){
    return <div>자식임</div>
}



function Cart(){

        let state = useSelector((state)=>{ return state})
        let dispatch = useDispatch()
        let [count, setCount] = useState(0)
    return (
        <div>
            <Child></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            {state.user.name} {state.user.age}의 가방
            <button onClick={()=>{
                dispatch(increase(100))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i)=>{
                            return(
                    <tr key={i}>
                      <td>{state.cart[i].id}</td>
                      <td>{state.cart[i].name}</td>
                      <td>{state.cart[i].count}</td>
                      <td>
                        <button onClick={()=>{
                            dispatch(changeNumber(state.cart[i].id))
                        }}>+</button>
                      </td>
                    </tr>
                            )
                        })
                    }
                    
                </tbody>
</Table> 
        </div>
    )
}


export default Cart;