

import {useLocation} from 'react-router-dom'




function ViewMore(){


    const {state}  = useLocation()

    console.log(state)


  return(

    <div className="container">


       


    
        <div class="card" style={{width: '18rem'}}>
  <img src={state.thumbnail}   class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{state.title}</h5>
    <h5  class="card-title">M.R.P : &#x20B9; <span style={{textDecoration : "line-through" , color:'red'}}> {state.price} </span></h5>
    <h5  class="card-title">Price : &#x20B9; <span style={{color  :"green"}}> {   (Number(state.price) -  Number(state.price) * Number(state.discountPercentage)  / 100 ).toFixed(2)   } </span></h5>
    <p class="card-text">{state.description}</p>
  </div>
</div>

<br></br>


<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
 {state.images.map((el,i)=>(
     <div class="carousel-item active">
      <img src={el} class="d-block w-100" alt="..." />
    </div>
))}
     
   
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


    </div>

  )  


}


export default ViewMore