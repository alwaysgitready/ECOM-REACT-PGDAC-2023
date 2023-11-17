import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import Lottie from 'react-lottie';
import * as animationData from '../Assets/login.json';


import {useDispatch}  from 'react-redux'
import axios from 'axios';
import { Base_URL } from '../Config/BaseUrlconfig';



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


function Login(){

const dispatch = useDispatch()
    const navigate = useNavigate()

    const [validation  , setValidaton] =  useState({

        email   : false,
        password  : false

    })

    const [values, setValues ] =  useState({
        email   :"",
        password : ""
    })

    const handleLogin = () =>{

        let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            console.log(values.password == "" && values.password.length < 6 ?  true : false)
            if(! email_reg.test(values.email) )
            {
                
            toast.error("Please Enter Valid Email")
        }
        else if(values.password ==  "")
        {
            toast.error("Please Enter Password")
        }
        else if(values.password.length < 3){
                toast.info("Please Enter At least 6 Digit Password")
            }
            else{
               


                axios.post(Base_URL + '/login-user' ,  values).then((result)=>{
                  toast.success(result.data.message)
                  if(result.data.data._id)
                  {
                    dispatch({type : "LOGIN"  , auth : result.data.data})
                  }

                }).catch((err)=>{
                  toast.error(err.response.data.message)
                })


                }
                

                


      
            
       


    }


    const [show , setShow ] = useState(false)


    const handeleShowPassword = () =>{


        setShow(!show)

    }




    const handleInputs  = (e) =>{


        setValues({...values ,  [e.target.name] : e.target.value})


    }


 return(
    <>

<div className="container-centre">

    <div className="box-div">


    <Lottie options={defaultOptions}
              height={200}
              width={200}/>


<div class="form-group">
    <label for="l1">Email address</label>
    <input type="email"   name='email' value={values.email}   onChange={handleInputs} style={{width:"100%" , border : `${validation.email == true ?  "2px solid red" : ""}` }} class="form-control" id="l1"  placeholder="Enter email" />
  </div>



<label for="l2" style={{display :"block"}}>Password</label>
<div class="input-group mb-3">
<br></br>
  <input onChange={handleInputs} value={values.password} name='password' type={`${show  == true  ? "text"  :"password"}`} style={{borderRadius  :'10px' , border : `${validation.password == true ?  "2px solid red" : ""}`}} class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
  <div class="input-group-append">
    <button onClick={handeleShowPassword} class="btn btn-outline-secondary" type="button">  <i class="fa-solid fa-eye"  style={{color  :"red" }}></i></button>
  </div>
</div>

 
  <button  onClick={handleLogin}    type="submit" style={{width : "100%" , marginTop  :"20px"}} class="btn btn-primary">Submit</button>
    <br></br>
    <br></br>
   
    <span  style={{marginTop : "20px"  , fontWeight : "bold" ,  float  :"left"}}>Don't Have and account ? <a  onClick={()=> navigate('/register')} style={{color:"blue" , cursor : "pointer"}}  >  <u>Register Here</u> </a></span>
    <span  style={{marginTop : "20px"  , fontWeight : "bold" ,  textAlign  :"right" ,  float  :"right"}}>Forgot Your Password ? <a  onClick={()=> navigate('/reset-password')} style={{color:"blue" , cursor : "pointer"}}  >  <u>Reset Here</u> </a></span>
  
    </div>
</div>
    </>
 )   

}

export default Login