import swal from "sweetalert";
import { createAction } from ".";
import { authService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants/config";
import { actionType } from "./type";

export const logIn = (values, callback) => {
  return async (dispatch) => {
    try {
      const res = await authService.logIn(values);
      swal("To team Jira 6!", "API successfully called!", "success");

      dispatch(createAction(actionType.SET_LOGIN, res.data));

      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      localStorage.setItem("loginInfo", JSON.stringify(res.data.content));

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

    dispatch(createAction(actionType.SET_LOGIN, res.data));
  } catch (err) {
    console.log(err);
  }
};
