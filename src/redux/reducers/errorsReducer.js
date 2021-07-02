const initialState = {
  errors: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'ON_CLOSE_ERROR': {
      return { ...state, errors: null };
    }
    default:
      return state;
  }
};

export default errorsReducer;
