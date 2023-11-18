import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"
import { toast } from "react-toastify"

import moment from 'moment'








function AllOrders(){

    const [data , setData ]  = useState([])



    function ModifyData(x){

        for(let i  = 0  ;  i < x.length  ; i++)
        {
            x[i]['show'] = false
            x[i]['show_user'] = false
            x[i]['show_delivery'] = false
        }

        console.log(x.reverse())
        return x

    }

    function getAllOrders(){

        axios.get(Admin_BASE_URL + '/get-all-orders').then((res)=>{
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
                temp[i]['show_user']  = false
                temp[i]['show_delivery']  = false

            }



        console.log(temp)

        setData([...temp])

    }

}



    const [getData , setGetData] =  useState({})

    function getUserById(d,i){

        axios.get(Admin_BASE_URL + '/get-user-by-id'   , {params : {u_id : d.u_id}}).then((res)=>{
           setGetData(res.data.data)
           TogggleAccordian(i ,  "show_user")

        }).catch((err)=>{
            toast(err.response.data.message)
        })


    }

    function getAddressById(d,i){

        axios.get(Admin_BASE_URL + '/get-address-by-id'   , {params : {address_id : d.address_id}}).then((res)=>{
            setGetData(res.data.data)
            TogggleAccordian(i ,  "show_delivery")
        }).catch((err)=>{
            toast(err.response.data.message)
        })


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
    <div class="col-sm-1">
    <a  onClick={()=> getUserById(el ,  i)} style={{color:"blue" ,  textDecoration:"underline",cursor  :"pointer"}}>User Details</a>  
    </div>
    <div class="col-sm-2">
    <a  onClick={()=> getAddressById(el ,  i)}  style={{color:"blue" ,  textDecoration:"underline",cursor  :"pointer"}}>Delivery Details</a>  
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


{/* Block to Show USer Details */}

{el.show_user == true ?         
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body" style={{textAlign : "center"}}>
            
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Name :</sapn>  {getData.name}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Email :</sapn>  {getData.email}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Mobile :</sapn>  {getData.mobile}</h6>
      </div>
    </div>
    : null}



{/* Block to Show Delivery Detaisl */}




{el.show_delivery == true ?         
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body" style={{textAlign : "center"}}>

      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Flat/House No :</sapn>   {getData.house_or_flat}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Street :</sapn>   {getData.street}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Landmark :</sapn>   {getData.landmark}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Pincode:</sapn>   {getData.pincode}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> Country:</sapn>   {getData.country}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> State:</sapn>   {getData.state}</h6>
      <h6> <sapn style={{color  :"red" ,  fontWeight : "bold"}}> City:</sapn>   {getData.city}</h6>

      </div>
    </div>
    : null}







  </div>
  ))}

</div>


        </div>
    )






}

export default AllOrders