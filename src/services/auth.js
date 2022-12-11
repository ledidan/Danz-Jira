import axiosClient from "./axiosClient";
import * as yup from "yup";
import { schemaContent } from "./schemaContent";

export const schema = yup.object().shape({
  email: schemaContent.email,
  passWord: schemaContent.password,
});

export const schemaSignup = yup.object().shape(schemaContent);

class AuthService {
  logIn(userLogin) {
    return axiosClient.post("/users/signin", userLogin);
  }

  signUp(userSignup) {
    return axiosClient.post("/users/signup", userSignup);
  }

  fetchMe(params) {
    return axiosClient.get("users/getUser", { params });
  }
}

export default AuthService;
