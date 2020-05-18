import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import serviceListReducer from '../reducers/serviceList';
import serviceFormReducer from '../reducers/serviceForm';
import thunk from"redux-thunk";

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, 
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
