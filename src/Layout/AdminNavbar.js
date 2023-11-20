import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {useSelector } from 'react-redux'






function AdminNavbar(){
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
  <a class="navbar-brand" onClick={()=> navigate('/dashboard')}>Hi , {Name}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li  class={`nav-item  ${window.location.href.includes('home') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('home') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`  }` }} class="nav-link" onClick={()=>{navigate('/home')}}>All Product</a>
      </li>
      <li  class={`nav-item  ${window.location.href.includes('all-orders') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('all-orders') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`  }` }} class="nav-link" onClick={()=>{navigate('/all-orders')}}>All Orders</a>
      </li>
      <li  class={`nav-item  ${window.location.href.includes('all-users') ?  'active' : "" } `}>
        <a style={{color : `${window.location.href.includes('all-users') ? `${theme == 'light' ? "red"  :"yellow"}` : `${theme == 'light' ?  "black" :"white"}`  }` }} class="nav-link" onClick={()=>{navigate('/all-users')}}>All Users</a>
      </li>
    </ul>
    <div class="form-inline my-2 my-lg-0"  style={{position  :"absolute" , right : 0 , marginRight : 20} }>
     
      <button  onClick={handleLogout} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </div>
  </div>
</nav>




)



}

export default AdminNavbar