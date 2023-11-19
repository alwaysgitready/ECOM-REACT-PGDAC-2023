import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"
import Lottie from "react-lottie"
import * as animationData from '../../Assets/Loading.json';
import { useLocation, useNavigate } from "react-router-dom"



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



const EditProduct =  () =>{

    const {state}  = useLocation()
    const navigate = useNavigate()


    const [values , setValues ]  = useState({

            name  :state.name,
            price :state.price , 
            discount  : state.discount,
            image   :state.image,
            temp_image  : state.image,
            category   : state.category,
            description  :state.description,
            rating : state.rating,
            pid :  state._id
    })

    const [Loading , setLoading] = useState(false)



    const handleForm  = (e) =>{

        setValues({...values , [e.target.name]  :e.target.value})

    }

    const handleSubmit  = () =>{

        setLoading(true)

        axios.post(Admin_BASE_URL + '/edit-product' ,  values).then((res)=>{

            toast.success(res.data.message)
            setLoading(false)

        }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
        })



    }

    const handleImages  =  (e) =>{

      console.log(e.target.files)

      let fd =  new FormData()
      fd.append('p_id' , values.pid)
      fd.append('img' , e.target.files[0] )

      setValues({...values  , ['temp_image'] :  URL.createObjectURL(e.target.files[0])})

      // setLoading(true)
      axios.post(Admin_BASE_URL  +'/update-product-image' , fd).then((res)=>{

        toast(res.data.message)
        
        setValues({...values  , ['temp_image'] :  res.data.data.image  })
      }).catch((err)=>{
         toast.error(err.response.data.message)
      })


    }







    return(

        <>
            <div style={{width  :"90%"  , margin  :"auto"}}>


                {Loading == false ?




<>
           
  <div class="form-group">
    <label for="l1">Product Name</label>
    <input type="text" onChange={handleForm}  value={values.name} name="name" class="form-control" id="l1"  placeholder="Enter Product Name" />
  </div>
  <div class="form-group">
    <label for="l2">Product Price</label>
    <input type="number" onChange={handleForm}  value={values.price} name="price" class="form-control" id="l2" placeholder="Enter Price" />
  </div>
  <div class="form-group">
    <label for="l3">Product Discount</label>
    <input type="number" name="discount" onChange={handleForm}  value={values.discount} class="form-control" id="l3" placeholder="Enter Discount" />
  </div>
  <div class="form-group">
    <label for="l4">Product Category</label>
    <input type="text" name="category" onChange={handleForm}  value={values.category} class="form-control" id="l4" placeholder="Enter Discount" />
  </div>
  <div class="form-group">
    <label for="l5">Product Description</label>
    <textarea  name="description" onChange={handleForm}  value={values.description} class="form-control" id="l5" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="l7">Product Rating</label>
    <input type="number" name="rating" onChange={handleForm}  value={values.rating} class="form-control" id="l7" ></input>
  </div>
  {/* <div class="form-group">
    <label for="l6">Product Image</label>
    <textarea name="image" onChange={handleForm}  value={values.image} class="form-control" id="l6" rows="3"></textarea>
  </div> */}
  <div class="form-group">
    <img src={values.temp_image} width='100px' height='100px' />
    {/* <button for="h1" className="btn btn-primary" >Change Image</button> */}
    <label for="h1"  className="btn btn-primary">Change Image</label>
    <input  onChange={handleImages} id="h1" type="file"  style={{display : "none"}}  />
  </div>

  <div style={{marginTop: 10  , marginBottom :10}}>

  <i class="fa-solid fa-arrow-right"></i> <a onClick={()=>navigate('/add-variation/'  + state._id ,  {state : state})} style={{color : "blue"  , textDecoration : "underline" , cursor  :"pointer"}}>Add Product Variation</a>

  </div>
  <button  onClick={handleSubmit} style={{width  :"100%" ,  marginTop  : 10}} type="submit" class="btn btn-primary">Save Changes</button>
</>

:
<>
<Lottie options={defaultOptions}
height={400}
width={400}/>

<h5 style={{color : "red"}}>Please Wait while we are submitting your data</h5>
</>

                }

 
            </div>
        
        
        </>
        
        )
        
        
}


export default EditProduct