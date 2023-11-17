





const CartReducer = (state , action) =>{

    if(typeof  state == 'undefined')
    {
        return{

            count : 0
        }
    }

    switch(action.type)
    {


        case "CART_COUNT":
            return{
                ...state,
                count :  action.count
            }

        default:
            return{
                ...state
            }
    }



}

export default CartReducer