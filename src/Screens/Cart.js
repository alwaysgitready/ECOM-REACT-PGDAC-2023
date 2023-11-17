import { useEffect, useState } from "react"

import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import { Base_URL } from "../Config/BaseUrlconfig"
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from 'react-lottie';

import * as animationData from '../Assets/ndf.json'



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };





const Cart  =  () =>{

    const dispatch = useDispatch()

    const navigate  = useNavigate()

    const u_id  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth._id &&  state.AuthReducer.auth._id !=  ""  && state.AuthReducer.auth._id != 'undefined' && state.AuthReducer.auth._id != null ?  state.AuthReducer.auth._id  : null )

    const [data , setData] =  useState([])


    function getCartItems(){
        axios.get(Base_URL + '/get-cart-details-with-products' , {params  :{u_id  :  u_id }}).then((result)=>{

            setData(result.data.data)
            console.log(result.data.data)
            
            dispatch({type  : 'CART_COUNT' ,  count : result.data.count})
        }).catch((err)=>{
            toast.error(err.response.data.message  ,{position : "top-center"})
        })
    }

    const [addresses , setAddreesses] =  useState([])

    function  getUserAddressList(){

        axios.get(Base_URL + '/get-user-addresses' , {params : {u_id  :u_id}}).then((result)=>{

            setAddreesses(result.data.data)

        }).catch((err)=>{
            toast.error(err.response.data.message  ,{position : "top-center"})

        })
    }


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
        getUserAddressList()
        getCartItems()
    },[])


    const handleMore = (cid, q) =>{

        
        const data  = {
            cid  :cid,
            quantity :  q  + 1
        }

        axios.post(Base_URL + '/handleQuantity' , data).then((res)=>{
            toast.success(res.data.message,{position : "top-center"})
            getCartItems()
        }).catch((err)=>{
            toast.error(err.response.data.message,{position : "top-center"})
        })


    }

    const handleLess =  (cid, q) =>{

        const data  = {
            cid  :cid,
            quantity :  q  -1
        }

        if(q - 1  ==  0)
        {
            let x  =  window.confirm("Do you really want to remove this product from cart ?")

            if(x ==  true)
            {
                axios.post(Base_URL + '/handleQuantity' , data).then((res)=>{
                    toast.success(res.data.message,{position : "top-center"})
                    getCartItems()
                }).catch((err)=>{
                    toast.error(err.response.data.message,{position : "top-center"})
                })
            }

        }
        else{

        

       

        axios.post(Base_URL + '/handleQuantity' , data).then((res)=>{
            toast.success(res.data.message,{position : "top-center"})
            getCartItems()
        }).catch((err)=>{
            toast.error(err.response.data.message,{position : "top-center"})
        })
    }


    }


    const getTotal = () =>{

        let temp =  data;
        let total   = 0 

        for(let i= 0  ; i < temp.length ; i++)
        {
            total   =  total  + (   Number(temp[i].product_data.price)  -   Number(temp[i].product_data.price)  *  Number(temp[i].product_data.discount)  / 100  ) * Number(temp[i].quantity)  
        }
        return  total.toFixed(2)





    }

    

    const [selectedAddress  , setSelectedAddress]  = useState('')


    const handlecheckAddress=(e)=>{

        setSelectedAddress(e)

    }


    const handleCheckOut = ()=>{

        if(!selectedAddress)
        {
            toast.info("Please Select At Least on Address to proceed with checkout")
        }
        else{
            let nd  =  {items : data ,  address_id : selectedAddress , total_amount :  getTotal()}
            navigate('/checkout' ,  {state  : nd })

        }
    }


return(


    <>
       <div style={{width :"90%" , margin : "auto"}} class="container text-center">

        {data.length ==  0 ?

<>
<Lottie options={defaultOptions}
          height={500}
          width={500}/>

          </>

           :


           <>



        {Array.isArray(addresses) && addresses.length == 0 ?
        <div style={{width  :"100%" ,padding :10 , borderRadius :  10, backgroundColor  :"red" ,  border :"4px solid orange", display  :"flex" , justifyContent :"center" , alignItems  :"center", flexDirection:"column"}}>

            <h5 style={{color  :"white"}}> {addresses.length} We didn't find any address to delivery process || Please Add At Least one Delivery Address</h5>
                <br></br>
            <button  onClick={()=> { navigate('/add-address', { state : {u_id  : u_id} })}} className="btn btn-success">Add Address</button>

        </div>
          : null }

  <div class="row">
    <div class="col-8">

    <div class="container text-center">

{data.map((el,i)=>(

<div class="row">
<div class="col">
<div class="card"  style={{width: "100%"}}>
  <img src={el.product_data.image} height={300}  class="card-img-top" alt="..." />
</div>
</div>
<div class="col">
<div class="card" style={{width: "100%"}}>
<div class="card-body">
  <h5 class="card-title">{el.product_data.name}</h5>
  <p class="card-text">{el.product_data.description}</p>
  <h5 class="card-title">{el.product_data.discount > 0 ? <h3 style={{color  :"red"}} > - {el.product_data.discount} <span style={{color:"black"}}><sup>&#8377;</sup>{ (Number(el.product_data.price) - (Number(el.product_data.price )* (Number(el.product_data.discount) /  100))).toFixed(2)  }</span>   </h3> : <h1>{el.product_data.price}</h1>  }</h5>
  <h6 class="card-title">M.R.P. &#8377; {el.product_data.price}</h6>
  <ReactStars
    count={5}
    value={el.product_data.rating}
    // onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
   
</div>


<div class="container text-center">
  <div class="row" style={{padding :  10}}>
    <div class="col">
      <button style={{width :  "100%"  }}  onClick={()=>handleLess(el._id , el.quantity)} className="btn btn-danger" ><span style={{fontWeight  :"bold"}}>-</span></button>
    </div>
    <div class="col">
        <h3>{el.quantity}</h3>
    </div>
    <div class="col">
    <button style={{width :  "100%"}}  onClick={()=>handleMore(el._id , el.quantity)} className="btn btn-success" >+</button>

    </div>
  </div>
</div>
</div>




</div>
<hr style={{color : "red" , height  :'10px'}}></hr>
</div>


))}
 


</div>




    </div>
    <div class="col-4">


    <div class="card" style={{width : "100%"}}>
  <div class="card-body">
    <h5 class="card-title">Subtotal ({data.length} items):   {getTotal()}</h5>
    <button  disabled={addresses.length == 0 ?  true  : false} style={{width : "100%" ,  fontWeight  :"bold"  , color  :"black"}} onClick={handleCheckOut } class="btn btn-warning">Proceed to Buy</button>
  </div>
</div>



<hr></hr>
<h6>Your Addresses</h6> 
    <button style={{width : "100%" ,  fontWeight  :"bold"  , color  :"black"}} onClick={()=> navigate('/add-address' ,  {state  : {u_id: u_id} })} class="btn btn-info">Add More Addresses</button>

<hr></hr>
{addresses.map((el,i)=>(
    <div class="card" style={{width : "100%"}}>
  <div class="card-body">
    <h5 class="card-title">{el.house_or_flat} , {el.street}  , {el.landmark}  ,{el.pincode} , {el.country}  ,{el.state}  ,{el.city}</h5>
  </div>
  <div class="form-check" style={{display :"flex" , flexDirection : "row" ,  justifyContent :"center" , alignItems  :"center" , padding :10}}>
  <input onChange={()=>handlecheckAddress(el._id)} style={{border : "1px solid black"}} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1" style={{marginLeft : 20 , fontWeight  :"bold"}}>
    Use This Address for Delivery
  </label>
</div>
</div>
))}




    </div>
  </div>
</>
}

</div>
    </>
)



}

export default Cart