import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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

const AuthState = (props) => {
  // const getUser = async () => {
  //   const token = Cookies.get("token");
  //   const config = {
  //     headers: {
  //       "x-auth-token": token,
  //     },
  //   };
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
  //     config
  //   );
  //   console.log({ resresres: res });
  //   return res.data;
  // };

  const initialState = {
    token: Cookies.get("token"),
    isAuthenticated: null,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //   Load User
  const loadUser = async () => {
    try {
      const token = Cookies.get("token");

      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        config
      );
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      // dispatch({
      //   type: AUTH_ERROR,
      // });
    }
  };

  // Register Chat engine user
  const registerChatEngineUser = (user) => {
    const data = {
      username: user.name,
      secret: user._id,
      email: user.email,
    };

    const config = {
      method: "post",
      url: "https://api.chatengine.io/users/",
      headers: {
        "PRIVATE-KEY": "ce1f50b4-c629-4694-b7af-ec77788a169f",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Register User
  const register = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        formdata,
        config
      );

      console.log({ responseresponse: res });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      registerChatEngineUser(res.data.user);

      loadUser();
    } catch (error) {
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: error,
      // });
      console.log({ error });
    }
  };

  // Login User
  const login = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        formdata,
        config
      );
      console.log({ res: res.data });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      //   dispatch({
      //     type: LOGIN_FAIL,
      //     payload: error.response.data.error,
      //   });
      // }
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
