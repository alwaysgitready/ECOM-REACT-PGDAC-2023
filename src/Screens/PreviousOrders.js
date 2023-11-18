import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

import { toast } from "react-toastify"
import moment from 'moment'
import { Base_URL } from "../Config/BaseUrlconfig"
import { useSelector } from "react-redux"








function PreviousOrders(){

    const [data , setData ]  = useState([])
    const u_id  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth._id &&  state.AuthReducer.auth._id  != null && state.AuthReducer.auth._id != "" && state.AuthReducer.auth._id != 'undefined' ?  state.AuthReducer.auth._id  : null)


    function ModifyData(x){

        for(let i  = 0  ;  i < x.length  ; i++)
        {
            x[i]['show'] = false
           
        }

        console.log(x.reverse())
        return x

    }

    function getAllOrders(){

        axios.get(Base_URL + '/get-my-orders' , {params  : {u_id : u_id}}).then((res)=>{
            setData(ModifyData(res.data.data))
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })


    }


    useEffect(()=>{
        getAllOrders()
    },[])


    function formatDate(d){

        let dt  = new Date(d)

        let fd  =  moment(d).format('MMMM Do YYYY, h:mm:ss a')
        return fd


    }


    function TogggleAccordian(index , key){

        let temp  = data;


        

        

        for(let i  =  0  ;  i < temp.length ;  i++)
        {
            console.log(key)
            if( i  == index )
            {
                temp[i][key] = !temp[i][key]

            }
            else{
                temp[i]['show'] = false

            }



        console.log(temp)

        setData([...temp])

    }

}



    


    return(
        <div style={{width  :'95%' , margin : "auto"}}>

<div id="accordion">

        {data.map((el,i)=>(



      

  <div class="card" style={{display  :"block"}}>
    <div class="card-header" id="headingOne">

    <div class="container" style={{width  :"100%"}}>
  <div class="row">
    <div class="col-sm-1">
       <h5 class="mb-0">

        <button onClick={()=>{TogggleAccordian(i ,  'show')}}  class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          {/* {el.show == false ? "Show" : "Hide" } */}
          {el.show == false?
          <i class="fa-solid fa-arrow-down"></i>
          : <i class="fa-solid fa-arrow-up"></i> }

          {/* <span>{String(el.show)}</span> */}
        </button>
      </h5>
    </div>
    <div class="col-sm-2">
       <span style={{fontWeight : "bold" ,  color : "red"}}>Order# : {el.order_number}</span>     
    </div>
    <div class="col-sm-3">
    <span style={{fontWeight : "bold" , color : "blue"}}>Ord ID : {el._id}</span>     

    </div>
    <div class="col-sm-3">
    <span style={{fontWeight : "bold"  , color:"green" }}>{formatDate(el.time)}</span>  
    </div>
    
  </div>
</div>
     
    </div>


   {el.show == true ?         
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">

    {Array.isArray(el.order_items) && el.order_items.length > 0 ?

        <>
        {el.order_items.map((pl, j )=>(
 <div class="container">
 <div class="row">
   <div class="col-sm-4">
            <img  src={pl.product_data.image ?pl.product_data.image : "" }  width='100px' height='100px' />
   </div>
   <div class="col-sm-8">
     <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Price :</sapn> &#8377;  {pl.product_data.price}</h6>
     <h6><sapn style={{color  :"red" ,  fontWeight : "bold"}}>Quantity :</sapn> {pl.quantity}</h6>
     <h6><sapn style={{color  :"red" ,  fontWeight : "bold"}}>Name   :</sapn>  {pl.product_data.name}</h6>
     <h6><sapn style={{color  :"red" ,  fontWeight : "bold"}}>Description   :</sapn>  {pl.product_data.description}</h6>
     <h6><sapn style={{color  :"red" ,  fontWeight : "bold"}}>Discount  : </sapn> {pl.product_data.discount} %</h6>
   </div>
 </div>
<hr></hr>
</div>


        ))}
     

        </>

:  null }












      </div>
    </div>
    : null}



{/* Block to Show Delivery Detaisl */}










  </div>
  ))}

</div>


        </div>
    )






}

export default PreviousOrders