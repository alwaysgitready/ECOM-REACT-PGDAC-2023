import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"
import Lottie from "react-lottie"
import * as animationData from '../../Assets/Loading.json';



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



const AddProduct =  () =>{


    const [values , setValues ]  = useState({

            name  : "",
            price : 0 , 
            discount  : 0,
            image   :"",
            temp_image : "",
            category   :"",
            description  : "",
            rating : 0
    })

    const [Loading , setLoading] = useState(false)



    const handleForm  = (e) =>{

        setValues({...values , [e.target.name]  :e.target.value})

    }

    const handleSubmit  = () =>{

        setLoading(true)


        let fd =  new FormData()
        fd.append('name' , values.name)
        fd.append('price' , values.price)
        fd.append('discount' , values.discount)
        fd.append('description' , values.description)
        fd.append('category' , values.category)
        fd.append('rating' , values.rating)
        fd.append('img' , values.image)

        axios.post(Admin_BASE_URL + '/add-product' ,  fd).then((res)=>{

            toast.success(res.data.message)
            setLoading(false)

        }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
        })



    }

    const hanldeImages = (e) =>{

      console.log(e.target.files[0])

      setValues({...values , ['image'] : e.target.files[0] ,  ['temp_image'] : URL.createObjectURL(e.target.files[0]) })

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
  <div class="form-group">
    <label for="l6">Product Image</label>
    <input name="image" type="file" onChange={hanldeImages}  class="form-control" id="l6" ></input>
  </div>

   <img src={values.temp_image}  width='100px'  height='100px' />               

  <button  onClick={handleSubmit} style={{width  :"100%" ,  marginTop  : 10}} type="submit" class="btn btn-primary">Submit</button>
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


export default AddProduct