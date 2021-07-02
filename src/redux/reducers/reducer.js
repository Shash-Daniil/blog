const initialState = {
  page: 1,
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return { ...state, page: action.page };
    case 'SET_LOADING': {
      return { ...state, loading: action.loading };
    }
    default:
      return state;
  }
};

export default reducer;
