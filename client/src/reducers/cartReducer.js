let initialState= [];

//load cart items for local storage
if(typeof window !== 'undefined')
{
    if(localStorage.getItem('cart'))
    {
        initialState = JSON.parse(localStorage.getItem('cart'));
    }else{
        initialState = [];
    }
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        console.log("Payload");
        console.dir(action.payload);
        return action.payload;
      default:
        return state;
    }
  };

  export default cartReducer;
  
