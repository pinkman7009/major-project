import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT,
  USER_LOADED,
} from "./types";
import Cookies from "js-cookie";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      Cookies.remove("token");
      Cookies.remove("userID");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case USER_LOADED:
      Cookies.set("userID", action.payload._id);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      Cookies.remove("token");
      Cookies.remove("userID");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
