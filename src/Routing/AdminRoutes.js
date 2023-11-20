




import { Route ,  Routes } from "react-router-dom"
import AdminHome from "../Screens/AdminScreens/AdminHome"
import AddProduct from "../Screens/AdminScreens/AddProduct"
import ViewProductAdmin from "../Screens/AdminScreens/ViewProduct"
import EditProduct from "../Screens/AdminScreens/EditProduct"
import AdminDashboard from "../Screens/AdminScreens/AdminDashboard"
import AllOrders from "../Screens/AdminScreens/AllOrders"
import AddVariations from "../Screens/AdminScreens/AddVariations"
import AllUsers from "../Screens/AdminScreens/AllUsers"








function  AdminRoutes(){


return(

<Routes>

<Route  path='/' element={<AdminDashboard/>}  />
<Route  path='/dashboard' element={<AdminDashboard/>}  />
<Route  path='/home' element={<AdminHome/>}  />
<Route  path='/add-product' element={<AddProduct/>}  />
<Route  path='/view-product/:id' element={<ViewProductAdmin/>}  />
<Route  path='/edit-product/:id' element={<EditProduct/>}  />
<Route  path='/all-orders' element={<AllOrders/>}  />
<Route  path='/add-variation/:id' element={<AddVariations/>}  />
<Route  path='/all-users' element={<AllUsers/>}  />
<Route  path='*' element={<AdminDashboard/>}  />




</Routes>



)


}

export default AdminRoutes