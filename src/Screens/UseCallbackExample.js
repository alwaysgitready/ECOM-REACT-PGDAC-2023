import { useCallback, useState } from "react"
import DummyComponent from "./DataComponent"







function Demo2(){


    const [count , setCount ] =  useState(0)
    const [data , setData]  = useState([])


    const increment  = () =>{

        setCount(count  +1)
    }

    // const addData  = () =>{


    //         setData([...data ,  "New Data"])
    // }

    const addData   = useCallback(()=>{
                    setData([...data ,  "New Data"])

    },[data])




return(

    <>
        <h1>My Data </h1>
        <DummyComponent data={data} addData = {addData} />
            <hr/>

            <h1>Value of Count is : {count}</h1>
            <button onClick={increment} >Increment</button>

    
    </>


)


}




export default Demo2