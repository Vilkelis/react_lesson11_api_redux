import {CHANGE_SERVICE_FIELD,        
        FETCH_SERVICE_REQUEST,
        FETCH_SERVICE_SUCCESS,
        FETCH_SERVICE_FAILURE,
        SAVE_SERVICE_REQUEST,
        SAVE_SERVICE_SUCCESS,
        SAVE_SERVICE_FAILURE
       } from '../actions/actionTypes'

const initialState = {
  item: {
    name: '',
    price: '',
    content: ''
  },
  loading: false,
  saving: false,
  errorLoading: null,
  errorSaving: null
};

export default function serviceFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVICE_FIELD:
      const {name, value} = action.payload;
      return {...state, item: { ...state.item, [name]: value} };
    case FETCH_SERVICE_REQUEST:
      return {...state, errorLoading: null, errorSaving: null, loading: true, saving: false}; 
    case FETCH_SERVICE_SUCCESS:
      return {...state, item: action.payload, errorLoading: null, errorSaving: null, loading: false, saving: false};
    case FETCH_SERVICE_FAILURE:
      return {...state, errorLoading: action.payload.error, errorSaving: null, loading: false, saving: false};
    case SAVE_SERVICE_REQUEST:
      return {...state, errorLoading: null, errorSaving: null, loading: false, saving: true}; 
    case SAVE_SERVICE_SUCCESS:
      return {...state, item: action.payload, errorLoading: null, errorSaving: null, loading: false, saving: false}; 
    case SAVE_SERVICE_FAILURE:
      return {...state, errorLoading: null, errorSaving: action.payload.error, loading: false, saving: false}; 
    default:
      return state;
  }
}
