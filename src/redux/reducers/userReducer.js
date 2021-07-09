const initialState = {
  user: {},
  updateUserStatus: true,
  logged: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_UPDATE_USER_STATUS': {
      return { ...state, updateUserStatus: action.value };
    }
    case 'SET_USER':
      return { ...state, user: action.user, logged: true };
    case 'LOGOUT': {
      return { ...state, user: '', logged: false };
    }
    default:
      return state;
  }
};

export default userReducer;
