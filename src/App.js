
import {useState} from 'react'




import './Styles/Navbar.css'

import ToggleRoutes from './Routing/ToggleRouting';
import store from './Store/Store';
import {Provider} from 'react-redux'

function App(){

    store.subscribe(()=>{
      localStorage.setItem('reduxStore' , JSON.stringify(store.getState()))
    })

return(

    <>

    <Provider  store={store} >

    <ToggleRoutes/>

    </Provider>
   
  
    </>

)
}


export default App