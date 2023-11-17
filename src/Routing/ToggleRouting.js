import AuthRoutes from "./AuthRoutes";
import AllRoutes from "./AllRoutes";
import { useState } from "react";
import Navbar from "../Layout/Navbar";
import { useSelector } from "react-redux";
import AdminRoutes from "./AdminRoutes";
import AdminNavbar from "../Layout/AdminNavbar";





function ToggleRoutes(){

// const [auth  , setAuth]  = useState(localStorage.getItem('auth'))


const auth  =  useSelector((state) => state.AuthReducer.auth &&  state.AuthReducer.auth._id && state.AuthReducer.auth._id != 'undefined' && state.AuthReducer.auth._id != "" && state.AuthReducer.auth._id != null  ?  true  : false)
const role  =  useSelector((state) => state.AuthReducer.auth &&  state.AuthReducer.auth.role && state.AuthReducer.auth.role != 'undefined' && state.AuthReducer.auth.role != "" && state.AuthReducer.auth.role != null  ?  state.AuthReducer.auth.role  : "" )


return(

    <>
    {auth == true ? <>  {role == 'Customer' ? <> <Navbar /> <AllRoutes /> </> :  <><AdminNavbar/><AdminRoutes/></>  }  </> : <AuthRoutes /> }
    </>



)


}


export default ToggleRoutes