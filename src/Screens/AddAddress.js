import axios from "axios"
import { useState } from "react"
import { useLocation , useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Base_URL } from "../Config/BaseUrlconfig"





function AddAddress(){

    const navigate = useNavigate()

    const {state} = useLocation()


    const [values , setValues ] =  useState({
        u_id : state.u_id,
        house_or_flat  :"",
        street  :"",
        landmark :"",
        pincode :"",
        country : "",
        state  :"",
        city  :""
    })

    const handleInputs = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }

    const handleSubmit = ()=>{
       axios.post(Base_URL + '/add-user-addresses' , values).then((res)=>{

        toast.success(res.data.message)
        navigate('/my-cart')

       }).catch((err)=>{
        toast.error(err.response.data.message)
       })
    }




    return(


            <>

            <div className="container">

            
  <div class="mb-3">
    <label for="l1" class="form-label">House / Flat No.</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l1"  name="house_or_flat" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">Street Address</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2" name="street" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">Landmark </label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2" name="landmark" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">Pincode</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2" name="pincode" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">Country</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2"  name="country" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">State</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2" name="state" />
  </div>
  <div class="mb-3">
    <label for="l2" class="form-label">City</label>
    <input type="text" onChange={handleInputs} class="form-control" id="l2" name="city" />
  </div>
  <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>

  </div>

</>
    )



}

export default AddAddress