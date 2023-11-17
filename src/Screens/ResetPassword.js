
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import Lottie from 'react-lottie';
import * as animationData1 from '../Assets/forgot_pass.json';
import * as animationData2 from '../Assets/verify.json';
import * as animationData3 from '../Assets/Loading.json'

import {useDispatch}  from 'react-redux'
import axios from 'axios';
import { Base_URL } from '../Config/BaseUrlconfig';



const defaultOptions1 = {
    loop: true,
    autoplay: true, 
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
const defaultOptions2 = {
    loop: true,
    autoplay: true, 
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
const defaultOptions3 = {
    loop: true,
    autoplay: true, 
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };











function ResetPassword(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [toggleScreen , setToggleScreen] = useState(false)
    const [loading , setLoading] = useState(false)
    
    const [values, setValues ] =  useState({
        email   :"",
        new_password : "",
        confirm_password : "",
        otp  :""
    })
    
    const handleForgotPassword = () =>{
    
        let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            console.log(values.password == "" && values.password.length < 6 ?  true : false)
            if(! email_reg.test(values.email) )
            {
                
            toast.error("Please Enter Valid Email")
        }
            else{
               
    
                setLoading(true)
                axios.post(Base_URL + '/forgot-password' ,  values).then((result)=>{
                  toast.success(result.data.message)
                  setLoading(false)

                  if(result.data.status == 200)
                  
                  {
                    setToggleScreen(true)
                    // handletimer()
                  }
                  
    
                }).catch((err)=>{
                    setLoading(false)
                  toast.error(err.response.data.message)
                })
    
    
                }
    
    }



    const handleVerifyPassord  = () =>{
        setLoading(true)
        axios.post(Base_URL + '/verify-password' ,  values).then((result)=>{
            toast.success(result.data.message)
            setLoading(false)

            if(result.data.status == 200)
            {
                navigate('/login')
            }
         

          }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)

            if(err.response.data.status == 498)
            {
                setToggleScreen(false);
                setValues({...values, ['email']  :"" , ['otp']  :"" ,  ['new_password'] : ""  , ["confirm_password"] : ""})
            }
          })



    }
    const [time , setTime ]  = useState(30)


    useEffect(()=>{


        if(toggleScreen == true && time > 0)
        {
            setInterval(()=>{
                    setTime(time  - 1)
            },1000)
        }

    
    },[time , toggleScreen])
    
    
    
    
    

    const handletimer  = () =>{

        setInterval(()=>{
            if(time > 0)
            {
                setTime(time  - 1)

            }
        },1000)
    }
    
    
    
    const handleInputs  = (e) =>{
    
    
        setValues({...values ,  [e.target.name] : e.target.value})
    
    
    }

return(




    <>



    <div className="container-centre">

{loading == true ?
<>
<Lottie options={defaultOptions3}
          height={200}
          width={200}/>
          <h4>Please Wait While we are fetching data for You. </h4>
          </>

 :         


<>

{ toggleScreen == false ? 


<div className="box-div">
<Lottie options={defaultOptions1}
          height={200}
          width={200}/>


<div class="form-group">
<label for="l1">Email address</label>
<input type="text"   name='email' value={values.email}   onChange={handleInputs} style={{width:"100%"  }} class="form-control" id="l1"  placeholder="Enter email" />
</div>
<button  onClick={handleForgotPassword}    type="submit" style={{width : "100%" , marginTop  :"20px"}} class="btn btn-primary">Submit</button>

</div>


:

<div className="box-div">


<Lottie options={defaultOptions2}
          height={200}
          width={200}/>


<div class="form-group">
<label for="l1">Email address</label>
<input disabled={true} type="email"   name='email' value={values.email}   onChange={handleInputs} style={{width:"100%"  }} class="form-control" id="l1"  placeholder="Enter email" />
</div>
<div class="form-group">
<label for="l1">Enter OTP</label>
<input  type="number"   name='otp' value={values.otp}   onChange={handleInputs} style={{width:"100%"  }} class="form-control" id="l1"  placeholder="Enter email" />
</div>


<div class="form-group">
<label for="l2" >New Password</label>
<input onChange={handleInputs} value={values.new_password} name='new_password' type="text" style={{borderRadius  :'10px' }} class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
</div>
<div class="form-group">
<label for="l2" >Confirm Password</label>
<input onChange={handleInputs} value={values.confirm_password} name='confirm_password' type="text" style={{borderRadius  :'10px' }} class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
</div>




<button  onClick={handleVerifyPassord}    type="submit" style={{width : "100%" , marginTop  :"20px"}} class="btn btn-primary">Submit</button>


<span style={{fontWeight  :"bold", color  :"red"}}>OTP Expires in :  {time} Seconds</span>



</div>


}

</>

}



</div>








    </>



)





}

export default ResetPassword