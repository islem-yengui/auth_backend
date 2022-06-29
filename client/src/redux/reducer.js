const {
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
} = require("./actionTypes");

const init = {
  user: null,
  loading: false,
  errors: [],
  token: null,
  isAuth: false,
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case REGISTER:
    case LOGIN:
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case GET_PROFILE_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        errors: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        token: payload.token,
        errors: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
      };
    default:
      return state;
  }
};

export default reducer;
