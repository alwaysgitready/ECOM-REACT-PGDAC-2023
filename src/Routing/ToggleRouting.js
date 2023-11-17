import AuthRoutes from "./AuthRoutes";
import AllRoutes from "./AllRoutes";
import { useState } from "react";
import Navbar from "../Layout/Navbar";
import { useSelector } from "react-redux";





function ToggleRoutes(){

// const [auth  , setAuth]  = useState(localStorage.getItem('auth'))


const auth  =  useSelector((state) => state.AuthReducer.auth &&  state.AuthReducer.auth._id && state.AuthReducer.auth._id != 'undefined' && state.AuthReducer.auth._id != "" && state.AuthReducer.auth._id != null  ?  true  : false)



return(

    <>
    {auth == true   ? <> <Navbar /> <AllRoutes />  </> : <AuthRoutes /> }
    </>



)


}


export default ToggleRoutes