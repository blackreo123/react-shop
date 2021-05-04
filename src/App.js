/* eslint-disable */
import './App.css';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import shoesData from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import { Modal } from 'bootstrap';
import Detail from './Detail';
import axios from 'axios';
import Cart from './Cart';

let 재고context = React.createContext();
function App() {

  let [shoes, setShoes] = useState(shoesData);
  let [로딩보안보, 로딩보안보변경] = useState('none');
  let [더보기보안보, 더보기보안보변경] = useState();
  let [더보기누른횟수, 더보기누른횟수변경] = useState(0);
  let [재고, 재고변경] = useState([10,11,12]);
  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" >
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home </Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 스위치 -> 중복 허용 안함 */}
      <Switch>

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>신발 팝니다</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
        </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">
          <재고context.Provider value={재고}>
          <div className="row">
            <ShoeBox shoes={shoes}></ShoeBox>
          </div>
          </재고context.Provider>
          <div style={{display : 로딩보안보}}>로딩중...</div>
          
          <button style={{display : 더보기보안보}} sty className="btn btn-primary" onClick={()=>{

            //로딩중이라는 UI
            로딩보안보변경('block');
            더보기누른횟수변경(더보기누른횟수+1);
            
            let 경로 = "https://codingapple1.github.io/shop/data"+(더보기누른횟수+2)+".json"
            axios.get(경로)
            .then((result)=>{
              //로딩중이라는 UI 안 보이게
              로딩보안보변경('none');
              setShoes([...shoes, ...result.data])
            })
            .catch(()=>{
              //로딩중이라는 UI 안 보이게
              로딩보안보변경('none');
              console.log('실패')
            })
          }}>더보기</button>
          
          
        </div>
      </Route>
      
      
      
      <Route path="/detail/:id">
        <Detail shoes={shoes}></Detail>
      </Route>

      {/* <Route path="/:id">
        <div>아무거나 적었을때</div>
      </Route> */}


      <Route path="/cart">
          <Cart></Cart>
      </Route>

      </Switch>
      {/* 다른 방법 */}
      {/* <Route path="/어쩌구" component={Modal}></Route> */}





    </div>
  );
}

function ShoeBox(props) {
  let 재고 = useContext(재고context);
  return (
    props.shoes.map((item) => {
      return (

        <div className="col-md-4">
          <img src={"https://codingapple1.github.io/shop/shoes" + (item.id + 1) + ".jpg"} width="100%" />
          <h4>{item.title}</h4>
          <p>{item.content} & {item.price}</p>
          <Test></Test>
        </div>
      )
    })
  )
}
function Test(){
  let 재고 = useContext(재고context);
  return(
    <p>재고 : {재고}</p>
  )
}

export default App;
