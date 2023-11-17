




import { Route ,  Routes } from "react-router-dom"
import AdminHome from "../Screens/AdminScreens/AdminHome"
import AddProduct from "../Screens/AdminScreens/AddProduct"
import ViewProductAdmin from "../Screens/AdminScreens/ViewProduct"
import EditProduct from "../Screens/AdminScreens/EditProduct"
import AdminDashboard from "../Screens/AdminScreens/AdminDashboard"








function  AdminRoutes(){


return(

<Routes>

<Route  path='/' element={<AdminDashboard/>}  />
<Route  path='/dashboard' element={<AdminDashboard/>}  />
<Route  path='/home' element={<AdminHome/>}  />
<Route  path='/add-product' element={<AddProduct/>}  />
<Route  path='/view-product/:id' element={<ViewProductAdmin/>}  />
<Route  path='/edit-product/:id' element={<EditProduct/>}  />
<Route  path='*' element={<AdminDashboard/>}  />




</Routes>



)


}

export default AdminRoutes