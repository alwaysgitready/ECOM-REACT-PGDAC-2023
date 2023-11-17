import {useEffect, useState} from 'react'


function About(){

    const [count , setCount ]  = useState(0)


    const [color , setcolor]  = useState('blue')


    const [arr  , setArr] =  useState([1,2,3,4,5,6]) 


    useEffect(()=>{

        console.log("hello")

        if(count  == 5)
        {
            setcolor('red')
        }


       return ()=>{

        console.log("bye")

        }

    },[count])






    const handleClick = () =>{


        setCount(count  +1)
    }

    return(
        <>
        <h1  style={{color  :  color}} >You Clicked {count } Times</h1>

        <button  onClick={handleClick} >Click</button>


         {arr.map((el , i)=>{

            let f  = el  * 2

            return(

                <h1 key={i} >{f}</h1>
            )


         })}   

         </>
    )


}

export default About