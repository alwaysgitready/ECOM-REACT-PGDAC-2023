import { Route ,  Routes } from "react-router-dom"
import Home from "../Screens/Home"
import About from '../Screens/About'
import MyForm from "../Screens/MyForm"
import Products from "../Screens/Products"
import ViewMore from "../Screens/ViewMore"
import Test from "../Screens/Test"
import Register from "../Screens/Register"
import Login from "../Screens/Login"
import A from "../Screens/Props-Drilling"
import Demo1 from "../Screens/UseMemoExample"
import Demo2 from "../Screens/UseCallbackExample"
import ResetPassword from "../Screens/ResetPassword"
import ViewProduct from "../Screens/ViewProducts"
import Cart from "../Screens/Cart"
import Checkout from "../Screens/Checkout"
import AddAddress from "../Screens/AddAddress"
import PreviousOrder from "../Screens/PreviousOrders"







function  AllRoutes(){


return(

<Routes>

<Route  path='/' element={<Home/>}  />
<Route  path='/home' element={<Home/>}  />
<Route  path='/about' element={<About/>}  />
<Route  path='/my-form' element={<MyForm/>}  />
<Route  path='/products' element={<Products/>}  />
<Route  path='/view-more/:id' element={<ViewMore/>}  />
<Route  path='/test' element={<Test/>}  />
<Route  path='/props-drilling' element={<A/>}  />
<Route  path='/demo1' element={<Demo1/>}  />
<Route  path='/demo2' element={<Demo2/>}  />
<Route  path='/my-cart' element={<Cart/>}  />
<Route  path='/checkout' element={<Checkout/>}  />
<Route  path='/add-address' element={<AddAddress/>}  />
<Route  path='/view-product/:id' element={<ViewProduct/>}  />
<Route  path='/previous-orders' element={<PreviousOrder/>}  />
<Route  path='*' element={<Home/>}  />




</Routes>



)


}

export default AllRoutes