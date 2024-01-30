import { useParams } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import {Nav} from 'react-bootstrap';
import './../App.css';
import {Context1} from './../App.js';
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";


import styled from "styled-components";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";

// let YellowBtn = styled.button`
//   background : ${props => props.bg};
//   color : ${props => props.bg == 'blue' ? 'white' : 'blacj'};
//   padding : 10px;
// `

// let BlackBox = styled.div`
//   back
// `

function Detail(props) {

  let {재고, shoes} =  useContext(Context1);
  
  let [count, setCount] = useState(0);
  let [alert, setalert] = useState(true);
  let [num, setNum] = useState('')
  let [tab , tabChange] = useState(0);
  let [fade2, setFade2] = useState('');
  
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });
  let dispatch = useDispatch()


  useEffect(()=> {
   let out = localStorage.getItem('watched')
   out = JSON.parse(out);
   out.push(찾은상품.id)
   out = new Set(out)
   out = Array.from(out)
   localStorage.setItem('watched', JSON.stringify(out))
  })




  useEffect(()=>{
    let a = setTimeout(()=>{ setalert(false)},2000)
      return ()=>{
        clearTimeout(a)
      }
  }, [])
  // []한번만 실행해 주세요~

  useEffect(()=>{
    if (isNaN(num) == true) {
      console.log('nono')
    }
  }, [num])

  useEffect(()=>{
    setFade2('end')
    return ()=> {
      setFade2('')
    }
  },[])
  
    return(
            <div className={"container start " +fade2}>

              <div className="container">
                {
                  alert == true
                  ?
                <div className="alert alert-warning">
                  2초 이내 구매시 할인
                </div>
                : null
              }
              </div>
              {count}
              <button onClick={()=>{setCount(count+1)}}>눌렁</button>
              {/* <YellowBtn bg='blue'>버튼</YellowBtn> */}
                <div className="row">
              {재고}
                  <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                  </div>
                  <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <input placeholder="수량" onChange={(e) => {
                      setNum(e.target.value)
                    }}/>
                  </div>
                </div>
                    <button className="btn btn-danger" onClick={()=>{
                      dispatch(addItem( {id : 1, name : 'zzz', count : 1} ))
                    }}>주문하기</button> 

                <Nav variant="tabs"  defaultActiveKey="link0">
                  <Nav.Item>
                    <Nav.Link onClick={()=>{tabChange(0)}} eventKey="link0">버튼0</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link  onClick={()=>{tabChange(1)}} eventKey="link1">버튼1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={()=>{tabChange(2)}} eventKey="link2">버튼2</Nav.Link>
                  </Nav.Item>
                </Nav>
                <TabContent tab={tab}/>
                
                
                
                

              </div> 
    )
}

function TabContent({tab}) {
  let [fade, setFade] = useState('')
  let {재고, shoes} =  useContext(Context1);
  useEffect(()=>{
    setTimeout(()=>{setFade('end')},100)
    
    return ()=>{
      setFade('')
    }
  },[tab])

  // ({tab}) 하면 props 안써도 괜찬음
  // if (props.tab == 0){
  //   return <div className="">내용0</div>
  // }
  // if (props.tab == 1){
  //   return <div>내용1</div>
  // }
  // if (props.tab == 2){
  //   return <div>내용2</div> 
  // }
  return (<div className={'start ' + fade}>
    {[<div>{재고}</div>,<div>내용2</div>,<div>내용3</div>][tab]}
  </div>)
}

export default Detail;