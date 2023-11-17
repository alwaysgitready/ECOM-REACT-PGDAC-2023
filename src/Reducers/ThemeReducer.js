



const ThemeReducer = (state, action) =>{



    if(typeof state  == 'undefined'){
        return{
            theme :"light"
        }
    }

    switch(action.type)
    {
        case "LIGHT"  :
         return{
            ...state,
            theme   : "light"
         }
         case "DARK":{
            return{
                ...state,
                theme : 'dark'
            }
         }
         default:
            return {...state}
    }




}

export default ThemeReducer