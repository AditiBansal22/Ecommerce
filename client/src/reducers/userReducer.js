const userReducer = (state = null, action) => {
    switch (action.type) {
      case "LOGGED_IN_USER":
        console.log("Payload");
        console.dir(action.payload);
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };

  export default userReducer;
  
