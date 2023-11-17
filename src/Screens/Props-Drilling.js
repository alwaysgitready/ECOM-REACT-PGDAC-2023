import { useState  ,  createContext , useContext} from "react"


const CountContext  =  createContext()



const A =  () =>{

    const [count , setCount ]  = useState(0)

    return (
        <>
        <CountContext.Provider  value={count} >
            

        <h1>This is Component A</h1>
        <h1>Value of count is : {count}</h1>
        <button onClick={()=> {setCount(count  +1)}} >Click Me</button>
        <B />
        </CountContext.Provider>
        </>
    )

}


const B =  () =>{
    
    return (
        <>
        <h1>This is Component B</h1>
        <C   />
        </>
    )


}

const C = () =>{
    const count  =  useContext(CountContext)

    return (
        <>
        <h1>This is Component C :  {count}</h1>
        <D  />
        </>
    )


}


const D =  () =>{

    return (
        <>
        <h1>This is Component D</h1>
        <E   />
        </>
    )


}

const E = () =>{
    const count  =  useContext(CountContext)
    return (
        <>
        <h1>This is Component E</h1>
        <h1>Value of Count in E Component is {count} </h1>
        </>
    )



}


export default A;


