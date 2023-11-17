import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

import Lottie from 'react-lottie';
import * as animationData from '../Assets/Loading.json'
import { Base_URL } from '../Config/BaseUrlconfig';



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


function Register(){

const navigate = useNavigate()



const [values , setValues ] = useState({

  name :  "",
  email  :"" , 
  mobile   : "" , 
  password  : "",
  address : ""

})



const handleInputs   =(e) =>{


  setValues({...values , [e.target.name] :  e.target.value})

}

const handleSubmit  =  () =>{
 setLoading(true)

  axios.post( Base_URL +'/add-user' ,  values).then((res)=>{

  setLoading(false)
  toast.success(res.data.message)

  }).catch((err)=>{

    setLoading(false)
    toast.error(err.response.data.message)

  })


}

const [loading , setLoading] = useState(false)








    return(
        <>

<div className="container-centre">

 {loading == true ? 
<>
    <Lottie options={defaultOptions}
              height={200}
              width={200}/>
<h5 style={{textAlign  :"center" , color :"rd"}}>Please Wait while we are fecthing data for you...</h5>

              </>

              :
    <div className="box-div">


<div class="form-group">
    <label for="l3">Name</label>
    <input type="text" style={{width:"100%"}}  value={values.name} onChange={handleInputs}  name="name" class="form-control" id="l3"  placeholder="Enter Name" />
  </div>
<div class="form-group">
    <label for="l1">Email address</label>
    <input type="text" style={{width:"100%"}} value={values.email} onChange={handleInputs}  name="email" class="form-control" id="l1"  placeholder="Enter email" />
  </div>
<div class="form-group">
    <label for="l4">Mobile</label>
    <input type="number" style={{width:"100%"}} value={values.mobile} onChange={handleInputs}   name='mobile' class="form-control" id="l4"  placeholder="Enter Mobile" />
  </div>
  <div class="form-group">
    <label for="l2">Password</label>
    <input type="password" style={{width:"100%"}}  value={values.password} onChange={handleInputs}  name='password' class="form-control" id="l2" placeholder="Password" />
  </div>
  <div class="form-group">
    <label for="l2">Address</label>
    <input type="text" style={{width:"100%"}}  value={values.address} onChange={handleInputs}  name='address' class="form-control" id="l2" placeholder="Address" />
  </div>
 
  <button onClick={handleSubmit} type="submit" style={{width : "100%" , marginTop  :"20px"}} class="btn btn-primary">Submit</button>

  <h6  style={{marginTop : "10px"}}>Already Have an acccount ? <a  onClick={()=> navigate('/login')} style={{color:"blue" , cursor : "pointer"}}  >  <u>Login Here</u> </a></h6>

    </div>
}
</div>
    </>
    )   
   
   }
   
   export default Register