import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; //HashRouter도 있다 -> 좀더 안전하게 할 수 있다. #기호는 서버에 전송이 안 되기 때문에. 
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

//remind 만들기
let remind = new Set();
const reducer3 = (state = remind,action) =>{
  if(action.type === 'addRemind'){
      
      remind.add(action.payload);
      
      localStorage.setItem('remind', JSON.stringify([...remind]));
      return remind
 
  
}else{
  return state
}
}

let alert초기값 = true;

function reducer2(state = alert초기값, action){
  if(action.type === 'alert닫기'){
    state = false;
    return state
  }else{
    return state

  }
}

let 초기값 = [
  
];

//리덕스 데이터 수정방법 정의
function reducer(state = 초기값, 액션) {
  if(액션.type === '항목추가'){
    let found = state.findIndex((item)=>{return item.id === 액션.payload.id});
    if(found >= 0){
      let copy = [...state];
      copy[found].quan++;
      return copy
    }else{

      let copy = [...state];
      copy.push(액션.payload);
      return copy
    }
  }
  else if(액션.type === '수량증가'){
    let copy = [...state];
    copy[액션.payload].quan++;
    return copy
  }else if(액션.type ==='수량감소'){
    let copy = [...state];
    copy[액션.payload].quan--;
    return copy
  }else{
    return state
  }
  
}

let store = createStore(combineReducers({reducer,reducer2,reducer3}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
