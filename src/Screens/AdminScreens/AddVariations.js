import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"



function AddVariations(){

    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)

    const dummyImage = 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695350.jpg'

    const [variation , setVariation]  = useState(state.variation)
    const [variationTemp , setVariationTemp]  = useState(state.variation)


    const hanldeImages = (e, i) =>{

        let temp_1  =  variation;
        let temp_2  =  variationTemp;

        temp_1[i] = e.target.files[0] 
        temp_2[i] = URL.createObjectURL(e.target.files[0]) 


        setVariation([...temp_1])
        setVariationTemp([...temp_2])

        

        let fd = new FormData();
        fd.append('p_id' ,  state._id);
        fd.append('index' ,  i);
        fd.append('img' ,e.target.files[0]  )

        axios.post(Admin_BASE_URL + '/add-variation' , fd).then((res)=>{
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }


    return(

        <>

<div class="container">
<div class="row">

    {variationTemp.map((el,i )=>(

        <div class="col-sm-3" style={{padding  : 20 ,  borderRight  :"1px solid red"}}>
    <label for={`i${i}`}>      
    <img   src={el == "" ? dummyImage : el} style={{width : '95%' ,  margin  :"auto"}} />
    </label>
    <input  onChange={(e)=>{hanldeImages(e ,  i)}} id={`i${i}`} style={{display : "none"}} type="file" />
  </div>
))}
 
</div>

<button className="btn btn-success" style={{width : "100%" , marginTop: 20}}>Upload Variations</button>
</div>
        </>
    )




}


export default AddVariations