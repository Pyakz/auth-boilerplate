  const INITIAL_STATE = {
  isLoggedIn:false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
           return {
             ...state, 
             isLoggedIn:true
          };
          case "LOGOUT":
            return {
              ...state, 
              isLoggedIn:false
           };
         default: return state;
    }
};

export default authReducer;