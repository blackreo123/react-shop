import { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import styled from 'styled-components';
import './Detail.scss';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';
let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${props => props.색상}
`;

function Detail(props) {
  let [inputData, setInputData] = useState('');
  let [보이기안보이기, 보이기안보이기스위치] = useState(true);
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);
  useEffect(() => {
    
    //2초후에 알럿창 안 보이게 
    let timer = setTimeout(() => {
      보이기안보이기스위치('none');
    }, 2000)

    //끝날때 실행하는
    // return function 어쩌구(){실행할 코드}
    //타이머 버그 방지
    return () => { clearTimeout(timer) }
  }, [보이기안보이기]);

  let { id } = useParams();
  let history = useHistory();
  let find = props.shoes.find((item) => {
    return item.id === parseInt(id);
  });

  return (
    <div className="container">
      <박스>
        <제목 className="red">우랑루아</제목>
      </박스>

      
      
      <div className="my-alert2" style={{ display: 보이기안보이기 }}>
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
          <button className="btn btn-danger" onClick={() => { history.goBack() }}>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false); 누른탭변경(0);}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false); 누른탭변경(1);}}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
      <TabContent 누른탭={누른탭} 스위치변경={스위치변경}></TabContent>
      </CSSTransition>
    </div>
  )
}
function TabContent(props){
  useEffect(()=>{
    props.스위치변경(true)
  });
  if(props.누른탭 ===0){
    return <div>0번째</div>
  }else if(props.누른탭 ===1){
    return <div>1번째</div>
  }
}
export default Detail;