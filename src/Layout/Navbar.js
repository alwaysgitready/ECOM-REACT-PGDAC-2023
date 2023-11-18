import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {useSelector } from 'react-redux'






function Navbar(){
  const dispatch  = useDispatch()

    const navigate  = useNavigate()
    const Name  = useSelector((state)=> state.AuthReducer.auth.name ?  state.AuthReducer.auth.name  : "")



    const theme  = useSelector((state)=> state.ThemeReducer.theme   ? state.ThemeReducer.theme   : "light")

  const cart_count   = useSelector((state)=> state.CartReducer.count ?  state.CartReducer.count : 0)
    const toggleTheme  = () =>{
        if(theme == 'light')
        {
       

            dispatch({type  :"DARK"})
        }
        else{
          dispatch({type  :"LIGHT"})

        }
    }

    const handleLogout = ()=>{
        

        dispatch({type  :"LOGIN" , auth  : {}})

    }



return(
   
    <nav class={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
  <a class="navbar-brand" href="#">Hi, {Name}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li  class={`nav-item  ${window.location.href.includes('home') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('home') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`  }` }} class="nav-link" onClick={()=>{navigate('/home')}}>Home </a>
      </li>
      <li  class={`nav-item  ${window.location.href.includes('previous-orders') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('previous-orders') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`  }` }} class="nav-link" onClick={()=>{navigate('/previous-orders')}}>Previous Orders</a>
      </li>
      {/* <li class={`nav-item  ${window.location.href.includes('about') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('about') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/about')}}>About </a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('my-form') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('my-form') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/my-form')}}>My Form</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('products') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('products') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/products')}}>Products</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('test') ?  'active' : "" } `}>
        <a  style={{color : `${window.location.href.includes('test') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/test')}}>Test</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('props-drilling') ?  'active' : "" } `}>
        <a  style={{color : `${window.location.href.includes('props-drilling') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/props-drilling')}}>Porps Drilling</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('demo1') ?  'active' : "" } `}>
        <a  style={{color : `${window.location.href.includes('demo1') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/demo1')}}>UseMemoExample</a>
      </li> */}
    
      {/* <li class={`nav-item  ${window.location.href.includes('demo2') ?  'active' : "" } `}>
        <a  style={{color : `${window.location.href.includes('demo2') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`}` }} class="nav-link" onClick={()=>{navigate('/demo2')}}>UseCallbackExample</a>
      </li> */}
    
    </ul>
    <div  onClick={()=> navigate('/my-cart')} style={{ cursor  :"pointer", display  :"block"  ,position  :"absolute"  , right  :200}}>
      <i class="fa" style={{fontSize:"40px"}}>&#xf07a;</i>
<span class='badge badge-warning' id='lblCartCount'> {cart_count} </span>
      </div>
    <div class="form-inline my-2 my-lg-0"  style={{position  :"absolute" , right : 0 , marginRight : 20} }>
     
      <button style={{marginRight : 10}}  onClick={toggleTheme} class="btn btn-outline-warning my-2 my-sm-0" type="submit">{theme == 'light' ? "Dark" : "Light" }</button>
      <button  onClick={handleLogout} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </div>
  </div>
</nav>




)



}

export default Navbar