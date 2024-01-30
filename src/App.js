/* eslint-dissable */

import { Button, Nav, Container, Navbar } from 'react-bootstrap';
import { createContext, useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import data from './data.js'
import Detail from './routes/Detail.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios';
import Ccart from './routes/Cart.js'
import {useQuery} from "react-query"

// const Detail = lazy( () => import('./routes/Detail.js') )
// const Cart = lazy( () => import('./routes/Cart.js') )

export let Context1 = createContext()


function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  })
  
  // let obj = {name : 'kim'}
  // localStorage.setItem('data' ,JSON.stringify(obj))
  // let out = localStorage.getItem('data')
  // console.log(JSON.parse(out).name)

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);
  let navigate = useNavigate();
  let [count] = useState(0);

  

  let result = useQuery('작명', ()=>{
      axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    })
  })

  // result.data
  // result.isLoading
  // result.error
  

  return (
    
    <div className="App">
  
  
      
      <Navbar bg="dark" data-bs-theme="dark" className='nav-bar'>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          {/* <Nav className='ms-auto'>
            {result.isLoading ? '로딩중' : result.data.name}
          </Nav> */}
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세</Link>

      <Suspense fallback={<div>로딩중</div>}>

        <Routes>
        <Route path="/" element=
        {<>
          <div className='main-bg'></div>
       <div className="container">
         <div className="row">
            {
              shoes.map(function(a, i){
                return(
                  <Modal shoes={shoes[i]} i={i} ></Modal>
                )
              })
            }
        </div>
      </div>
      <button onClick={()=>{
        count++
        console.log(count)
        axios.get('https://codingapple1.github.io/shop/data2.json')
        //promise
        .then((dada)=>{
          console.log(dada.data)
          let copy = [...shoes, ...dada.data];
          setShoes(copy)
         })
         .catch(()=>{
          console.log('nono')
          //catch = url 잘못되면
         })
        
      }}>버튼</button>
        </>}/>

        <Route path="/detail/:id" element={
          
          <Context1.Provider value={{재고, shoes}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>

        }/>
         {/* /* url 파라미터 = :id */ }
        {/* <Route path="*" element={<div>없느뉴ㅔ이지</div>}/> */}

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤머~</div>}/>
          <Route path="location" element={<div>안나나</div>}/>
        </Route>
        <Route path='/cart' element={<Ccart/>} />
        </Routes>
      </Suspense>
      
    
  </div> 
  );
}

function About() {
  return (
    <div>
      <h4>우리회사</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Modal(props){
  return(
      <div className="col-md-4 moda1">
        <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width='80%'/>
          {/* 사진 {'abc' + (props.i+1) +'abc'} */}
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>  
      </div>
    )
}


export default App;
