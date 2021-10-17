import './App.css';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import React, { useContext, useState, lazy,Suspense } from 'react';
import shoesData from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { connect } from 'react-redux';
let 재고context = React.createContext();
function ShoeBox(props) {
    
    let 재고 = useContext(재고context);
    let history = useHistory();
    return (
      props.shoes.map((item) => {
        return (
  
          <div className="col-md-4" onClick={()=>{history.push('/detail/' + item.id); props.dispatch({type : 'addRemind' , payload : item.id});}}>
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
  function state를props화(state){
    return{
        state : state.reducer,
        alert열렸니 : state.reducer2,
        remind : state.reducer3
    }
  }
  export default connect(state를props화)(ShoeBox)