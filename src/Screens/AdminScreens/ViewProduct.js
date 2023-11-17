import { useLocation } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from 'axios'
import {useSelector} from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";





function ViewProductAdmin(){


    const {state}  = useLocation()
    console.log(state)



    return(


        <>

<div class="container text-center">
  <div class="row">
    <div class="col" tyle={{ display  :"flex" ,  justifyContent  :"left" ,  alignItems  :"flex-end"}}>
    <div class="card" style={{width: "100%"}}>
  <img src={state.image} class="card-img-top" alt="..." />
</div>
    </div>
    <div class="col" style={{ display  :"flex" ,  justifyContent  :"left" ,  alignItems  :"flex-start"}}>
    <div class="card" style={{width: "100%"}}>
<div class="card-body">
  <h5 class="card-title">{state.name}</h5>
  <p class="card-text">{state.description}</p>
  <h5 class="card-title">{state.discount > 0 ? <h3 style={{color  :"red"}} > - {state.discount} <span style={{color:"black"}}><sup>&#8377;</sup>{ (Number(state.price) - (Number(state.price )* (Number(state.discount) /  100))).toFixed(2)  }</span>   </h3> : <h1>{state.price}</h1>  }</h5>
  <h6 class="card-title">M.R.P. &#8377; {state.price}</h6>
  <ReactStars
    count={5}
    value={state.rating}
    // onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
   
</div>
</div>
    </div>
  </div>
</div>
        
        
        </>



    )



}

export default ViewProductAdmin