/* eslint-disable */
import './App.css';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import React, { useContext, useState, lazy,Suspense } from 'react';
import shoesData from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Modal } from 'bootstrap';
import ShoeBox from './ShoeBox.js';


//remind
let remind = localStorage.getItem('remind');


//lazy로 다이나믹 임포트
let Detail = lazy(()=>{return import('./Detail.js')});
// import Detail from './Detail';

import axios from 'axios';
import Cart from './Cart';
import { connect } from 'react-redux';

let 재고context = React.createContext();
function App(props) {

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

        {/* remind */}
        <div>{remind}</div>


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
        <Suspense fallback={<div>로딩중</div>}>
        <Detail shoes={shoes} remind={props.remind}></Detail>

        </Suspense>
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

// function ShoeBox(props) {
//   let 재고 = useContext(재고context);
//   let history = useHistory();
//   return (
//     props.shoes.map((item) => {
//       return (

//         <div className="col-md-4" onClick={()=>{history.push('/detail/' + item.id); props.dispatch({type : 'addRemind' , payload : item.id})}}>
//           <img src={"https://codingapple1.github.io/shop/shoes" + (item.id + 1) + ".jpg"} width="100%" />
//           <h4>{item.title}</h4>
//           <p>{item.content} & {item.price}</p>
//           <Test></Test>
//         </div>
//       )
//     })
//   )
// }
// function Test(){
//   let 재고 = useContext(재고context);
//   return(
//     <p>재고 : {재고}</p>
//   )
// }
function state를props화(state){
  return{
      state : state.reducer,
      alert열렸니 : state.reducer2,
      remind : state.reducer3
  }
}
export default connect(state를props화)(App)
// export default App;
