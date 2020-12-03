const initialState = {
    viewCustomer: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  const redCustomer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CUSTOMER_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_CUSTOMER_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_CUSTOMER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          viewCustomer: action.payload.data.data.data,
        };


  {/* -----------------------------------------------------*/}

    case 'POST_CUSTOMER_FULFILLED':
    console.log(action);
      const viewCustomer = state.viewCustomer
      viewCustomer.push(action.payload.data.data[0])
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        viewCustomer
      };

    default:
      return state;
  }
};

export default redCustomer;
