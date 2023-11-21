import axios from "axios";
import { toast } from "react-toastify";
import { Admin_BASE_URL } from "../../Config/BaseUrlconfig";
import { useEffect, useState } from "react";





function AllUsers() {


    const [data , setData ] = useState([])

    const [flag1, setFlag1] = useState(false)
    function  getallUsersList(){



        axios.get(Admin_BASE_URL + '/get-all-users' ).then((res)=>{

            setData(res.data.data)

        }).catch((err)=>{
            toast.error(err.response.data.message)
        })


    }


    function handleActiveInactive(x, y){

        const dt  =  {
                uid:x,
                status : !y

        }
        

        axios.post(Admin_BASE_URL + '/set-status', dt ).then((res)=>{
 
            toast.success(res.data.message)

            getallUsersList()

        }).catch((err)=>{
            toast.error(err.response.data.message)
        })   


    }


    useEffect(()=>{
        getallUsersList()
    },[])

    const [changePassData  , setChangePassData ] =  useState({
        _id   :"",
        new_pass : "",
        name : "",
        email:""
    })


    const [pass_loading , set_pass_loading] = useState(false)

    const onClickCancel =  () =>{
        setChangePassData({_id   :"",
        new_pass : "" ,  name : "",
        email:""})
        setFlag1(false)
    }


    const changePassword  = () =>{
        
       set_pass_loading(true)
        axios.post(Admin_BASE_URL + '/change-password-by-admin', changePassData ).then((res)=>{
 
            toast.success(res.data.message)
            set_pass_loading(false)
            onClickCancel()

        }).catch((err)=>{
            toast.error(err.response.data.message)
            set_pass_loading(false)
            onClickCancel()
        })   


    }

    const hanldePassowordInput  =  (e) =>{

        setChangePassData({...changePassData , ['new_pass']   : e.target.value})

    }

    const handleChangePassKey  = (x ,  name, em) =>{
        setChangePassData({...changePassData , ['_id'] :  x , ['name']  :name , ['email'] : em})
        setFlag1(true)

    }

    const sendPasswordResetLink  = (name , uid , email) =>{
        set_pass_loading(true)
        setChangePassData({...changePassData ,  ['_id']  :uid})

        let dt  =  {u_id : uid , email: email , name : name}
        axios.post(Admin_BASE_URL + '/send_password_resetlink', dt ).then((res)=>{
 
            toast.success(res.data.message)
            set_pass_loading(false)

            getallUsersList()
           

        }).catch((err)=>{
            toast.error(err.response.data.message)
            set_pass_loading(false)
          
        })   


    }

    



    return(


        <>
        <div className="container">

{flag1  == true?
        <div class="container">
  <div class="row" style={{padding : 10}}>
    <div class="col-sm-6">
    <div class="form-group">
    <input  onChange={hanldePassowordInput} value={changePassData.new_pass} type="text" class="form-control"  placeholder="Enter New Password" />
  </div>
    </div>
    <div class="col-sm-3">
    <button style={{width  :"100%"}} onClick={changePassword} class="btn btn-primary">Submit</button>
    </div>
    <div class="col-sm-3" >
        <div style={{width : "30px" ,  height : "30px" ,  display  :"flex" ,  justifyContent  : "center"  , alignItems  :"center", cursor: "pointer" , borderRadius : "50%" , backgroundColor : "red"}}>
    <i onClick={onClickCancel} style={{color :"white" , textAlign  :"left" , fontWeight  :"bold"}} class="fa-solid fa-xmark"></i>

        </div>

    </div>
  </div>
</div>
:  null}

<>
  
  
</>


      

        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Change Password</th>
      <th scope="col">Edit</th>
      <th scope="col">Enable/Disable</th>
      <th scope="col">Send Password Reset Link</th>
    
    </tr>
  </thead>
  <tbody>

    {data.map((el , i)=>(

<tr>
      <th scope="row">{i+1}</th>
      <td>{el.name}</td>
      <td>{el.email}</td>
      <td>{el.mobile}</td>
      <td> 
        {pass_loading == true  && el._id == changePassData._id  ?
            <div class="spinner-border text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>

        :
        <i  onClick={()=>{handleChangePassKey(el._id, el.name , el.email)}} class="fa-solid fa-key"></i>




}

        </td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td>{el.disable == false ?  <i  onClick={()=> handleActiveInactive(el._id , el.disable)} style={{color : "green"}} class="fa-solid fa-thumbs-up"></i> : <i onClick={()=> handleActiveInactive(el._id , el.disable)} style={{color : 'red'}} class="fa-solid fa-thumbs-down"></i>}</td>
        <td>
        {pass_loading == true  && el._id == changePassData._id  ?

            <div class="spinner-border text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>

        :
            <>
           
                {el.have_pwd_reset_link  == false ? <i onClick={()=>{sendPasswordResetLink(el.name, el._id , el.email)}} class="fa-solid fa-paper-plane"></i> : <span> <button onClick={()=>{sendPasswordResetLink(el.name, el._id , el.email)}} className="btn btn-primary">Resend Link</button> </span> }
                
               
            </>

        }
        </td>
    </tr>
   

    ))}
    
  </tbody>
</table>


        </div>
        </>



    )



}

export default AllUsers;