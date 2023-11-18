import axios from "axios"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"




function AdminDashboard(){




    const [dashData , setDashData] = useState({})

    function getDashboard(){

        axios.get(Admin_BASE_URL + '/get-dashboard').then((result)=>{
            setDashData(result.data.data)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    useEffect(()=>{

        getDashboard()

    },[])


    return(


        <>

<div class="container"  style={{display :"flex" , flexDirection : "column" , justifyContent  :"center" , alignItems : "center"}}>
  <div class="row">
    <div class="col-sm">
    <div class="card" style={{width: "100%"}}>
 
 <div class="card-body">
   <h5 class="card-title">Total Products <i style={{marginLeft : 10 , color:"red"}} class="fa-solid fa-bag-shopping"></i></h5>
   <p  style={{fontSize: 20 ,  fontWeight : "bold" ,  color : "green"}} class="card-text">{dashData.products ? dashData.products : 0 }</p>
 </div>
</div>
    </div>
    <div class="col-sm">
    <div class="card" style={{width: "100%"}}>
 
 <div class="card-body">
   <h5 class="card-title">Total Users  <i style={{marginLeft : 10 , color:"red"}} class="fa-solid fa-users"></i> </h5>
   <p  style={{fontSize: 20 ,  fontWeight : "bold" ,  color : "green"}} class="card-text">{dashData.users ? dashData.users : 0 }</p>
 </div>
</div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
    <div class="card" style={{width: "100%"}}>
 
 <div class="card-body">
   <h5 class="card-title">Total Orders <i style={{marginLeft : 10 , color:"red"}} class="fa-solid fa-sitemap"></i></h5>
   <p style={{fontSize: 20 ,  fontWeight : "bold" ,  color : "green"}} class="card-text">{dashData.orders ? dashData.orders : 0 }</p>
 </div>
</div>
    </div>
    <div class="col-sm">
    <div class="card" style={{width: "100%"}}>
 
 <div class="card-body">
   <h5 class="card-title"></h5>
   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
 </div>
</div>
    </div>
  </div>
 


</div>

        
        </>

    )





}


export default AdminDashboard