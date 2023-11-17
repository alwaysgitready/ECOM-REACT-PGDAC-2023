




const AuthReducer  =  (state, action) =>{


    if(typeof state  == 'undefined')
    {
        return {
            auth  : false
        }
    }


    switch(action.type){
        
        case "LOGIN" : 
        return{
            ...state  ,  auth :  action.auth
        }
        case "LOGOUT" : 
        return{
            ...state  ,  auth :  action.auth
        }
        default :
        return {...state}



    }



}

export default AuthReducer