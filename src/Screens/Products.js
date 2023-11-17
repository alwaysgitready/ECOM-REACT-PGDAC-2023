import { useEffect, useState } from "react";
import {Link , useNavigate} from 'react-router-dom'
import Lottie from 'react-lottie';
import * as animationData from '../Assets/Loading.json'



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };




function Products(){

    const navigate  = useNavigate()


    const [data , setData ] =  useState([])
    const [data_bkp , setDataBkp ] =  useState([])
    const [flag , setFlag  ] = useState(false)

    const [page_no  , setPageNo] =  useState([])
    const [skip , setSkip ] = useState(0)
    const [limit , setLimit] = useState(10)

    const [active , setActive] = useState(1)



    function getAllProducts (){

        setFlag(true)
        fetch(`https://dummyjson.com/products?skip=${skip}&&limit=${limit}`).then((result)=> result.json()).then((data)=>{
        console.log(data)
        setData(data.products)
        setDataBkp(data.products)
        let temp  = []
        for(let i  = 1 ; i <= Math.ceil(data.total / data.limit) ; i++)
          {
              temp.push(i)
          }

        setPageNo(temp)
        
        setFlag(false)
        })
    }


    useEffect(()=>{

        getAllProducts()

    },[skip , active])


  const handleViewMore=(el)=>{

    navigate('/view-more/'+el.id , {state : el})

  }



  const handleSearch=(e)=>{

    let fd =  data_bkp.filter((el, i)=>{
        return el.title.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setData(fd)

  }

  const handlePageNo = (pn) =>{

    setActive(pn)
  
    setSkip((pn - 1) * 10)

  }

  const handlePre = () =>{
    
    setActive(active - 1)
    setSkip((active ) * limit)


  }

  const handleNext = () =>{
    setActive(active + 1)
    setSkip((active ) * limit)
  }


return(



    <>
<div className="container">

{flag  == true ?
<>
    <Lottie options={defaultOptions}
              height={200}
              width={200}/>
<h5 style={{textAlign  :"center" , color :"rd"}}>Please Wait while we are fecthing data for you...</h5>

              </>
:

<>

<input onChange={handleSearch} style={{display : "block" , marginTop:"10px", width:"100%"}} className="my-input"  placeholder='Search Here'/>

    {data.map((el,i)=>(
        <div class="card" style={{width: '18rem'}}>
  <img src={el.thumbnail} width='100px' height='150px' class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{el.title}</h5>
    <h5  class="card-title">M.R.P : &#x20B9; <span style={{textDecoration : "line-through" , color:'red'}}> {el.price} </span></h5>
    <h5  class="card-title">Price : &#x20B9; <span style={{color  :"green"}}> {   (Number(el.price) -  Number(el.price) * Number(el.discountPercentage)  / 100 ).toFixed(2)   } </span></h5>
    <p class="card-text">{el.description.length >  20 ? el.description.slice(0,20)  + "... "  :el.description  }</p>

    <a onClick={()=>handleViewMore(el)} class="btn btn-primary">View More</a>
  </div>
</div>
    ))}


    <br></br>

    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li onClick={handlePre} class={`page-item ${active == 1 ? 'disabled'  :""} `}><a class="page-link" >Previous</a></li>
    {page_no.map((el)=>(
      <li class={`page-item ${el == active ?  'active'  :""}`} ><a  onClick={()=>handlePageNo(el)} class="page-link" >{el}</a></li>

    ))}
    
    <li onClick={handleNext} class={`page-item ${active == page_no[page_no.length-1] ? 'disabled'  :""} `}><a class="page-link" >Next</a></li>
  </ul>
</nav>


</>

    }
    
    </div>
    
    
    </>


)




}

export default Products;