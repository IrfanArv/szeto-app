import axios from 'axios';

export const getCustomer = (content, page) => {
  return {
    type: 'GET_CUSTOMER',
    payload: axios.get('http://127.0.0.1:8000/api/customer/', {
      params: {
        content,
        page
      }
      })
  };
};

export const postCustomer = (saveCustomer) => {
  
  return {
    type: 'POST_CUSTOMER',
    payload: axios.post('http://127.0.0.1:8000/api/customer/', saveCustomer, {
      
    }),
  };
};
