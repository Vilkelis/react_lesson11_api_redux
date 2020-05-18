import { CHANGE_SERVICE_FIELD,
         FETCH_SERVICES_REQUEST,
         FETCH_SERVICES_SUCCESS,
         FETCH_SERVICES_FAILURE,
         REMOVE_SERVICE_REQUEST,
         REMOVE_SERVICE_SUCCESS,
         REMOVE_SERVICE_FAILURE,
         FETCH_SERVICE_REQUEST,
         FETCH_SERVICE_SUCCESS,
         FETCH_SERVICE_FAILURE,
         SAVE_SERVICE_REQUEST,
         SAVE_SERVICE_SUCCESS,
         SAVE_SERVICE_FAILURE         
        } from './actionTypes';

export function changeServiceField(name, value) {
  return {type: CHANGE_SERVICE_FIELD, payload: {name, value}}
}

export function fetchServicesRequest() {
  return {type: FETCH_SERVICES_REQUEST};
}

export function fetchServicesSuccess(items) {
  return {type: FETCH_SERVICES_SUCCESS, payload: items};
}

export function fetchServicesFailure(error) {
  return {type: FETCH_SERVICES_FAILURE, payload: {error}};
}

export function removeServiceRequest(id) {
  return {type: REMOVE_SERVICE_REQUEST, payload: id};
}

export function removeServiceSuccess(id) {
  return {type: REMOVE_SERVICE_SUCCESS, payload: id};
}

export function removeServiceFailure(id, error) {
  return {type: REMOVE_SERVICE_FAILURE, payload: {id, error}};
}

export function fetchServiceRequest(id) {
  return {type: FETCH_SERVICE_REQUEST, payload: id}
}

export function fetchServiceSuccess(item) {
  return {type: FETCH_SERVICE_SUCCESS, payload: item}
}

export function fetchServiceFailure(id, error) {
  return {type: FETCH_SERVICE_FAILURE, payload: {id, error}}
}

export function saveServiceRequest(item) {
  return {type: SAVE_SERVICE_REQUEST, payload: item}
}

export function saveServiceSuccess(item) {
  return {type: SAVE_SERVICE_SUCCESS, payload: item}
}

export function saveServiceFailure(id, error) {
  return {type: SAVE_SERVICE_FAILURE, payload: {id, error}} 
}


export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL);
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}   
    const services = await response.json();
    dispatch(fetchServicesSuccess(services));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }      
};

export const removeService = (id) => async (dispatch) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/' + id, { method: 'DELETE'});     
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}       
    dispatch(removeServiceSuccess(id));     
  } catch (error) {
    dispatch(removeServiceFailure(id, error.message));
  }
}

export const fetchService = (id) => async (dispatch) => {
	dispatch(fetchServiceRequest(id));
	try {
		const response = await fetch(process.env.REACT_APP_API_URL + '/' + id);
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		} 		
		const service = await response.json();
		dispatch(fetchServiceSuccess(service));
	} catch (error) {
		dispatch(fetchServiceFailure(id, error.message));
	}      
};

export const saveService = (item, callBack) => async (dispatch) => {
	item.id = Number(item.id);
	dispatch(saveServiceRequest(item.id));
	try {
		const response = await fetch( process.env.REACT_APP_API_URL, 
																	{ method: 'POST',
																		body: JSON.stringify(item),
																		headers: {
																			'Content-Type': 'application/json;charset=utf-8'
																		},
																	});  
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}   
		dispatch(saveServiceSuccess(item));     
		callBack && callBack();
	} catch (error) {
		dispatch(saveServiceFailure(item.id, error.message));
	}
}
