import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import {useSelector, useDispatch} from 'react-redux';
import { fetchServices, removeService } from '../actions/actionCreators';

function ServiceList(props) {
  const {history} = props;
  const {items, error, loading} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  React.useEffect( () => {     
    dispatch(fetchServices);
  }, [dispatch]);

  const handleRemove = id => {
    dispatch(removeService(id));
  }

  const handleEdit = id => {
    history.push( '/services/' + id);    
  }

  if (loading) {
    return <div className="loading-big"><img src="/loading_big.gif" alt="Loading..."/></div>
  }

  if (error) {
    return <Alert text={error} kind={"danger"}/>
  }

  return (         
    <ul className="list-group">
      {items.map(o => (
        <li className="list-group-item" key={o.id}>
          <div className="list-group-item__content">
          {o.name}: {o.price} руб.           
          <div className="list-group-item__buttons">
            <button className="btn btn-danger" disabled={o.removing} onClick={() => handleEdit(o.id)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button className="btn btn-danger" disabled={o.removing} onClick={() => handleRemove(o.id)}>
             {o.removing ? <img className="action-img" src="/loading_small.gif" alt="Удаление..."/>  : '✕'}  
            </button>            
          </div>
          </div>          
          {o.error && <Alert text={o.error} kind={"danger"}/>}
        </li>
      ))}
    </ul>
  )
}

export default ServiceList