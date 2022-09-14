import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk"
import nftsReducer from './reducers/nfts/nfts';
import usersReducer from './reducers/users/users';

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  nfts: nftsReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk))
);

export default store