import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig"
import { useNavigate } from "react-router-dom"





function AdminHome(){

    const [data , setData]  = useState([])
    const [bkpData ,  setBkpData] =  useState([])
    const navigate  = useNavigate()


    function getallProducts(){
        axios.get(Admin_BASE_URL + '/get-all-products').then((res)=>{
            setData(res.data.data)
            setBkpData(res.data.data)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    useEffect(()=>{

        getallProducts()

    },[])


        const handleSearch  = (e) =>{

            let fd  = bkpData.filter((el,i)=>{
                return el.name.toLowerCase().includes(e.target.value.toLowerCase())
            })

            setData(fd)

        }

        const handleViewmore=  (el) =>{

            navigate('/view-product/' + el._id , {state  : el})


        }

        const onEdit  = (el) =>{

            navigate('/edit-product/' + el._id , {state  : el})

            
        }

        const onDelete  = (el) =>{
            let uc  =  window.confirm("Do you really want to delete this product ? ")
            if(uc == true)
            {
                axios.post(Admin_BASE_URL + '/delete-product', {pid : el._id}).then((res)=>{
                    toast.success(res.data.message)
                    getallProducts()
                }).catch((err)=>{
                    toast.error(err.response.data.message)
                })
            }
           

        }






    return(

        <>
        <div style={{width : "95%"  , margin  :"auto"}}>
        <div class="container">
  <div class="row" style={{padding  : 10}}>
    <div class="col-sm">
    <div class="form-group">
    <input type="text"  onChange={handleSearch} class="form-control"   placeholder="Search Here" />
  </div>
    </div>
    <div class="col-sm">
      <button  onClick={()=> navigate('/add-product')} className="btn btn-primary">Add Products</button>
    </div>
  </div>
</div>
       
            <table class="table table-light">
  <thead>
    <tr>
      <th scope="col">Sr#</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Discount</th>
      <th scope="col">Category</th>
      <th scope="col">Image</th>
      <th scope="col">View More</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {data.map((el, i )=>(
        <tr>
        <th scope="row">{i+1}</th>
        <td>{el.name.length >  20   ? el.name.slice(0,20) + ' ...' : el.name}</td>
        <td style={{color: "red" , fontWeight  :"bold"}}>	&#8377; {el.price}</td>
        <td style={{color : "green"  , fontWeight  :"bold"}} >{el.discount}</td>
        <td>{el.category}</td>
        <td><img src={el.image} width='100px' height='100px' /></td>
        <td><i   onClick={()=>handleViewmore(el)} class="fa-solid fa-eye"></i></td>
        <td><i onClick={()=>onEdit(el)} class="fa-solid fa-pen-to-square"></i></td>
        <td><i onClick={()=>onDelete(el)} class="fa-solid fa-trash-can"></i></td>
      </tr>
    ))}
    
  </tbody>
</table>
</div>
        </>

    )



}

export default AdminHome