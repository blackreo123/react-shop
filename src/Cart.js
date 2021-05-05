/* eslint-disable */
import {React, memo, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
function Cart(props) {
    return (
        <div>
            <div>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>변경</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {props.state.map((item,index)=>{
                            return(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quan}</td>
                                    <td><button onClick={()=>{
                                        props.dispatch({type : '수량증가', payload : item.id})
                                    }}>+</button>
                                    <button onClick={()=>{
                                        props.dispatch({type : '수량감소', payload : item.id})
                                    }}>-</button>
                                    </td>
                            
                                 </tr>
                            )
                        })}
                        
                        
                    </tbody>
                </Table>
                {
                props.alert열렸니 ===true
                ? <div className="my-alert2">
                    <p>지금 구매하시면 신규할일 20%</p>
                    <button onClick={()=>{props.dispatch({type : 'alert닫기'})}}>닫기</button>
                    </div>
                : null
                }
            </div>
            {/* memo연습 */}
            <Parent name='yoon' age='28'></Parent>
        </div>
    )
}
//memo 연습
const Parent = (props)=>{
    return(
    <div>   
        <Child1 name={props.name}></Child1>
        <Child2 age={props.age}></Child2>
    </div>
    )
    
}
const Child1 = (props)=>{
    useEffect(()=>{console.log('render1')});
    return <div>child1</div>
}
const Child2 = memo((props)=>{
    useEffect(()=>{console.log('render2')});
    return <div>child2</div>
});

function state를props화(state){
    return{
        state : state.reducer,
        alert열렸니 : state.reducer2
    }
}
export default connect(state를props화)(Cart)
// export default Cart;