import { useState } from "react"






function MyForm(){


    const [values , setValues] = useState({
        name  : "",
        email : "",
        mobile : "",
        city : "",
        course : "",
        profile_image  :"https://th.bing.com/th/id/OIP.eXWcaYbEtO2uuexHM8sAwwHaHa?pid=ImgDet&rs=1",
        gender  : "male"

    })



    function handleInput(e){
        console.log(e.target.name)
        console.log(e.target.value)
       setValues({...values , [e.target.name] : e.target.value})
    }
    // function handleCourse(e){
    //     setValues({...values , ['course'] : e.target.value })

    // }


    function handleFile(e){
        console.log(e.target.files)
       setValues({...values  , ['profile_image'] : URL.createObjectURL(e.target.files[0])})

    }



    function onSubmit(e){
        e.preventDefault()
        console.log(values)

        
    }


return(

    <div  className="container-centre" >
{/* <form> */}
        <input className="my-input" name="name"  onChange={handleInput} placeholder="Enter Your Name" /> 

        <br></br>
        <input className="my-input"  name="mobile" onChange={handleInput} placeholder="Enter Your Mobile" />
        <br></br>
        <input className="my-input"  name="email" onChange={handleInput} placeholder="Enter Your Email" />
        <br></br>
        <input className="my-input"  name="city" onChange={handleInput} placeholder="Enter Your City" />
        <br></br>
        <select onChange={handleInput} name="course" className="my-select">
            <option value='c++' className="my-option">C++</option>
            <option value='java' className="my-option">Java</option>
            <option value='python' className="my-option">Python</option>
            <option value='js' className="my-option">Java Script</option>

        </select>
        <br></br>


        
        <input style={{display  :"none"}} id="uploader" multiple className="my-input"  onChange={handleFile} type="file" placeholder="Upload Profile Image" />
        <br></br>
        <label for='uploader'>

        <img   width="100px" height='100px' src={values.profile_image} />
        </label>
        <br></br>
    <div style={{display:"flex" ,  flexDirection  :"row"}}>

        <label style={{marginRight  : 20}} for='gender'>Select Your Gender</label>
      
        <label>Male</label>
        <input  onChange={handleInput} name="gender" checked={values.gender == 'male'} type="radio" />
        <label>Female</label>
        
        <input id="gender"  onChange={handleInput} name="gender" checked={values.gender == 'female'}  type="radio"   placeholder="Female"  />
        
        <label>Not Specified</label>
        <input id='gender' onChange={handleInput} name="gender" checked={values.gender == 'ns'} type="radio"  />

    </div>
    <br></br>
        <button onClick={(e)=>onSubmit(e)} className="my-button">Submit</button>
        {/* </form> */}
    </div>

)    


}

export default MyForm