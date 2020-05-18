import {FETCH_SERVICES_FAILURE, 
        FETCH_SERVICES_SUCCESS, 
        FETCH_SERVICES_REQUEST,
        REMOVE_SERVICE_FAILURE, 
        REMOVE_SERVICE_SUCCESS, 
        REMOVE_SERVICE_REQUEST      
      } from '../actions/actionTypes'

const initialState = {
 items: [],
 loading: false,
 error: null
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_SUCCESS:
      return {...state, items: action.payload, error: null, loading: false}
    case FETCH_SERVICES_REQUEST:
      return {...state, loading: true, error: null}
    case FETCH_SERVICES_FAILURE:
      return {...state, loading: false, error: action.payload.error}
    case REMOVE_SERVICE_SUCCESS: 
      return {...state, items: state.items.filter(service => service.id !== action.payload)};
    case REMOVE_SERVICE_REQUEST:          
      return {...state, items: state.items.map( o => o.id !== action.payload ? o : {...o, removing: true, error: null}) };       
    case REMOVE_SERVICE_FAILURE:
      console.log(action.payload);
      return  {...state, items: state.items.map( o => o.id !== action.payload.id ? o : {...o, removing: false, error: action.payload.error}) }
    default:
      return state;
  }
}