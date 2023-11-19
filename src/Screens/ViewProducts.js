import { useLocation } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from 'axios'
import {useSelector} from 'react-redux'
import { Base_URL } from "../Config/BaseUrlconfig"
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";





function ViewProduct(){


    const {state}  = useLocation()
    console.log(state)

    const [variation , setVariation] = useState([state.image ,  ...state.variation])

    const [mainImage  , setMainImage ] =  useState(state.image)


    const handleVarationClick =  (i ,el) =>{

      setMainImage(el)


    }

    return(


        <>

<div class="container text-center">
  <div class="row">
    <div class="col-sm-2" tyle={{ display  :"flex" ,  justifyContent  :"left" ,  alignItems  :"flex-end"}}>
    {variation.map((el,i)=>(

      <img  onClick={()=> handleVarationClick(i , el)} src={el} style={{width :"100px" ,  height  :"100px" , display : "block" }} class="card-img-top" alt="..." />

    ))}


    </div>
    <div class="col-sm-4" tyle={{ display  :"flex" ,  justifyContent  :"left" ,  alignItems  :"flex-end"}}>
    <div class="card" style={{width: "100%"}}>
  <img src={mainImage} class="card-img-top" alt="..." />
</div>
    </div>
    <div class="col-sm-6" style={{ display  :"flex" ,  justifyContent  :"left" ,  alignItems  :"flex-start"}}>
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

export default ViewProduct