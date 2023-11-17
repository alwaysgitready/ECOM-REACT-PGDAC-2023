import { useEffect, useState } from "react"

import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import { Base_URL } from "../Config/BaseUrlconfig"
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";






function Home(){


const navigate = useNavigate();
const dispatch = useDispatch()
    const [data , setData]  = useState([])
    const [cart_data  , setCartData]  = useState([])
    const [data_bkp , setDataBkp]  = useState(filterDisable([]))


    const count =  useSelector((state) => state.CountReducer.count ?  state.CountReducer.count  : 0 )

    const theme   = useSelector((state)=> state.ThemeReducer.theme ?   state.ThemeReducer.theme  :"light" )


    const u_id  =  useSelector((state)=> state.AuthReducer.auth && state.AuthReducer.auth._id &&  state.AuthReducer.auth._id !=  ""  && state.AuthReducer.auth._id != 'undefined' && state.AuthReducer.auth._id != null ?  state.AuthReducer.auth._id  : null )


    function getCartItemsList (){


        axios.get(Base_URL  +'/get-cart-items-by-user-id' , {params: {u_id  : u_id}}).then((res)=>{

           


            setCartData(res.data.data)
            dispatch({type : 'CART_COUNT'  , count  :res.data.count})
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }


    function filterDisable(){

 
            let p_data   = data
            let c_data  = cart_data
          
                for(let i  = 0   ; i < c_data.length ;  i++)
                    {
                        for(let j  =  0  ; j  < p_data.length ;  j++)
                        {
                            if(p_data[j]._id == c_data[i].p_id)
                            {
                                data[j]['disable']  = true
                            }
                            
                        }
                    }

                    console.log(p_data)


                    return p_data



            


    }

    function getusersData (){
       


        axios.get(Base_URL  +'/get-products').then((res)=>{
        console.log(res)
        setData(res.data.data)
        // getCartItemsList()
        setDataBkp(res.data.data)
        })
    }


    useEffect(()=>{

        getusersData()

        getCartItemsList()


    },[])



    function onSearch(e){

        var fd   = data_bkp.filter((el ,i)=>{

            return el.name.toLowerCase().includes(e.target.value.toLowerCase())

        })

        setData(fd)

    }


    function handleAddtoCart(p_id){

        const data  =  {
            p_id : p_id,
            u_id :  u_id
        }

        axios.post(Base_URL + '/add-to-cart' , data).then((res)=>{
            toast.success(  res.data.message  ,{position : "top-center"})
            getCartItemsList()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }


return(
<>
<div className="container-centre"  >

{/* <h1>Current Value of Count is : {count}</h1> */}

<input className="my-input"  onChange={onSearch}  placeholder="Search Here" />
</div>



   

{data.map((el,i)=>(

<div class="card" style={{width: '18rem'}}>
<img class="card-img-top"  width="100%" height="200px" src={el.image} alt="Card image cap" />
<div class="card-body">
  <h5 class="card-title">{el.name.length > 20 ? el.name.slice(0,21) + ' ...'   : el.name } </h5>
  <p class="card-text">{el.description.length > 40 ?  el.name.slice(0,41) + ' ....' : el.description}</p>
  <h5 class="card-title">{el.discount > 0 ? <h3 style={{color  :"red"}} > - {el.discount} <span style={{color:"black"}}><sup>&#8377;</sup>{ (Number(el.price) - (Number(el.price )* (Number(el.discount) /  100))).toFixed(2)  }</span>   </h3> : <h1>{el.price}</h1>  }</h5>
  <h6 class="card-title">M.R.P. &#8377; {el.price}</h6>
  <ReactStars
    count={5}
    value={el.rating}
    // onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />,
   
  <a style={{width  : "100%"}} onClick={()=> navigate('/view-product/' + el._id , {state : el})} class="btn btn-primary">View More</a>
  <br></br>
  <br></br>
  {
    el.hasOwnProperty('disable') && el.disable == true  ?

    <button disabled={el.disable} style={{width  : "100%"}} onClick={()=>handleAddtoCart(el._id)} class="btn btn-danger">Already Added </button>
    :
    <button  style={{width  : "100%"}} onClick={()=>handleAddtoCart(el._id)} class="btn btn-success">Add To Cart</button>

  }
</div>
</div>


 ))}

   


 
</>


)



}

export default Home