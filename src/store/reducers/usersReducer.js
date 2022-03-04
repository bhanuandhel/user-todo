const initState = [];

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return [...state, action.payload];
    }
    case "DELETE_USER": {
      const newUsers = state.filter((user) => user.name !== action.name);
      return newUsers;
    }
    case "FAB_USER": {
        const s = [...state];
      const foundIndex = state.findIndex((user) => user.name === action.name);
      s[foundIndex].favorite = !s[foundIndex].favorite;
      return s;
    }
    default:
      return state;
  }
};
export default usersReducer;
