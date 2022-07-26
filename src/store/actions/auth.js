import swal from "sweetalert";
import { createAction } from ".";
import { authService } from "../../services";
import { ACCESS_TOKEN, USER_LOGIN } from "../../utils/constants/config";
import { actionType } from "./type";

export const logIn = (values, callback) => {
  return async (dispatch) => {
    try {
      const res = await authService.logIn(values);
      swal("Welcome to Jira!", "Logged in successfully!", "success");

      dispatch(createAction(actionType.SET_ME, res.data.content));

      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
      console.log(res.data);
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
      swal("Awww!", err.response.data.message, "error");
    }
  };
};

export const signUp = (data, callback) => {
  return async (dispatch) => {
    try {
      await authService.signUp(data);

      swal("Successfully register!", "Please log in to continue!", "success");

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMe = async (dispatch) => {
  try {
    const res = await authService.fetchMe();

    const loginInfo = JSON.parse(localStorage.getItem(USER_LOGIN));

    const me = res.data.content.find((user) => user.userId === loginInfo.id);

    if (me === undefined) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_LOGIN);
      window.location.reload();
      return;
    }

    dispatch(createAction(actionType.SET_ME, { ...me, id: me.userId }));
  } catch (err) {
    console.log(err);
  }
};
