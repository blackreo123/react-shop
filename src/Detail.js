import { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import styled from 'styled-components';
import './Detail.scss';


let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상}
`;

function Detail(props){
  let [inputData, setInputData] = useState('');
  let [보이기안보이기, 보이기안보이기스위치] = useState(true);
  useEffect(()=>{
    console.log('aia');
    //2초후에 알럿창 안 보이게 
   let timer = setTimeout(()=>{
    보이기안보이기스위치('none');
    },2000)

    //끝날때 실행하는
    // return function 어쩌구(){실행할 코드}
    //타이머 버그 방지
    return ()=>{ clearTimeout(timer) }
  },[보이기안보이기]);

    let { id } = useParams();
    let history = useHistory();
    let find = props.shoes.find((item)=>{
        return item.id === parseInt(id);
    });

    return(
        <div className="container">
          <박스>
            <제목 className="red">우랑루아</제목>
          </박스>

          <input onChange={(e)=>{setInputData(e.target.value)}}/>
          {inputData}
          <div className="my-alert2" style={{display : 보이기안보이기}}>
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{find.title}</h4>
              <p>{find.content}</p>
              <p>{find.price}원</p>
              <button className="btn btn-danger">주문하기</button>
              <button className="btn btn-danger" onClick={()=>{history.goBack()}}>뒤로가기</button>
            </div>
          </div>
        </div>
    )
}
export default Detail;