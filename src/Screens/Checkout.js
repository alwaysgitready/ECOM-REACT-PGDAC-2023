import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Base_URL } from "../Config/BaseUrlconfig"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import Lottie from 'react-lottie';
import * as animationData from '../Assets/order.json'



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };









function Checkout(){


    const {state} = useLocation()
    const navigate = useNavigate()

    console.log(state)
    const u_id  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth._id &&  state.AuthReducer.auth._id !=  ""  && state.AuthReducer.auth._id != 'undefined' && state.AuthReducer.auth._id != null ?  state.AuthReducer.auth._id  : null )
    const name  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth.name &&  state.AuthReducer.auth.name !=  ""  && state.AuthReducer.auth.name != 'undefined' && state.AuthReducer.auth.name != null ?  state.AuthReducer.auth.name  : null )
    const email  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth.email &&  state.AuthReducer.auth.email !=  ""  && state.AuthReducer.auth.email != 'undefined' && state.AuthReducer.auth.email != null ?  state.AuthReducer.auth.email : null )

    const [loading , setLoading]  = useState(false)


    const handleOrderProcessing =  () =>{
            setLoading(true)
        const data  =  {

            order_items: state.items,
            address_id : state.address_id,
            total_amount : state.total_amount,
            name : name,
            email : email,
            u_id : u_id

        }

        axios.post(Base_URL + '/purchase_order', data).then((res)=>{
            toast.success(res.data.message)

            navigate('/my-cart')

            setLoading(false)

            

        }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
        })

    }


return(
    <>
    <div className="container" style={{display :"flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>

    {loading == true?
    <>
    <Lottie options={defaultOptions}
              height={200}
              width={200}/>
<h5 style={{textAlign  :"center" , color :"rd"}}>Please Wait while we are fecthing data for you...</h5>

              </>

              :

    <div class="card" style={{width: '100%',}}>
  <div class="card-body">
    <h5 class="card-title">Order Summary</h5>
    <div class="container text-center">
  <div class="row">
    <div class="col" style={{textAlign  :"left"}}>
      Items : 
    </div>
    <div class="col" style={{textAlign  :"left"}}>
    &#8377; {state.total_amount}
    </div>
  </div>
  <div class="row">
    <div class="col" style={{textAlign  :"left"}}>
      Delivery Charge : 
    </div>
    <div class="col" style={{textAlign  :"left"}}>
    &#8377; {(state.total_amount * 0.10).toFixed(2)}
    </div>
  </div>
  <div class="row">
    <div class="col" style={{textAlign  :"left" , fontWeight  :"bold"}}>
      Total : 
    </div>
    <div class="col" style={{textAlign  :"left" , fontWeight :"bold"}}>
    &#8377; {  Number(state.total_amount) +  Number((state.total_amount * 0.10).toFixed(2)) }
    </div>
  </div>
  <div class="row" style={{textAlign  :"left" , fontWeight  :"bold"}}>
    <hr></hr>
    <h5 style={{color  :"brown"}} >Order Total : &#8377; {  Number(state.total_amount) +  Number((state.total_amount * 0.10).toFixed(2)) }</h5>
    <hr></hr>
  </div>
  </div>
    <a onClick={handleOrderProcessing} class="btn btn-primary">Process Oder</a>
  </div>
</div>

}
    
    </div>
    </>
)



}

export default Checkout