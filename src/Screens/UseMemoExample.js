import { useState , useMemo } from "react"



function heavyCalculation(num){
    console.log("Calculating........")
    for(let  i = 0 ; i < 1000000000 ; i++)
    {
        num = num  +1
    }

    return num
}



const Demo1 =  () =>{


const [count , setCount ] =  useState(0)
const [data , setData ] =  useState([])

const calculation  =  useMemo(()=> heavyCalculation(count) , [count])  



const increment  = () =>{

    setCount(count  +1)


}

const addData  = () =>{

    setData([...data , "New Data "])

}



    return(
        <>
            <div>

                <h1>My Data</h1>

                {data.map((el ,i )=>(
                    <h1 key={i} >{el}</h1>
                    ))}

                    <button onClick={addData} >Add New Data</button>
            </div>

            <hr/>

            <div>
                      Count  : {count}     
                      <button  onClick={increment} >Increment</button>
                      Calculated Value  :  {calculation}
            </div>


        </>
    )
















}

export default Demo1