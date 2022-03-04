import {createStore, combineReducers} from "redux"
import usersReducer from "./reducers/usersReducer"

const rootReducers = combineReducers({
    users: usersReducer,
})
const store = createStore(rootReducers);
export default store;