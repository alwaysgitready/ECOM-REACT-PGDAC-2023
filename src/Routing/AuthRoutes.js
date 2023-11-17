import { Route ,  Routes } from "react-router-dom"
import Home from "../Screens/Home"
import About from '../Screens/About'
import MyForm from "../Screens/MyForm"
import Products from "../Screens/Products"
import ViewMore from "../Screens/ViewMore"
import Test from "../Screens/Test"
import Register from "../Screens/Register"
import Login from "../Screens/Login"
import ResetPassword from "../Screens/ResetPassword"






function  AuthRoutes(){


return(

<Routes>

<Route  path='/' element={<Login/>}  />

<Route  path='/login' element={<Login/>}  />
<Route  path='/register' element={<Register/>}  />
<Route  path='/reset-password' element={<ResetPassword/>}  />

<Route  path='*' element={<Login/>}  />


</Routes>



)


}

export default AuthRoutes