import { useState } from "react";

import {useSelector  , useDispatch} from 'react-redux'





function Test(){
    const dispatch   = useDispatch()


    // const [count , setCount]  = useState(   )
    

    const count   = useSelector((state) => state.CountReducer.count ? state.CountReducer.count   :0 )

    function incre(){
        
        dispatch({type  : "INCRE"  , count  : count  +1})

    }


    function decre(){

        dispatch({type  : "DECRE"  , count  : count   - 1})


    }



return(

    <>
        <button  onClick={incre} >Icre</button>
        <h1>Value of Count is : {count}</h1>
        <button onClick={decre} >Decre</button>
    </>
)



}

export default Test;
