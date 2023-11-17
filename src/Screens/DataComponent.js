import { memo } from "react" 

const DummyComponent  = ({data , addData}) =>{
    console.log("Rendring Child Componenet")
    
    return(
    
        <div>
            {data.map((el,  i)=>(
    
                    <h1  key={i} >{el}</h1>
            ))}
    
            <button  onClick={addData}>Add Data</button>
        </div>
    
    )
    
    }


    export default memo(DummyComponent)