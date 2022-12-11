import axiosClient from "./axiosClient";
import * as yup from "yup";
import { schemaContent } from "./schemaContent";

export const schema = yup.object().shape({
  email: schemaContent.email,
  password: schemaContent.password,
});

export const schemaSignup = yup.object().shape(schemaContent);

class AuthService {
  logIn(data) {
    return axiosClient.post("/users/signin", data);
  }

  signUp(data) {
    return axiosClient.post("/users/signup", data);
  }

  fetchMe(params) {
    return axiosClient.get("/users/getUser", { params });
  }
}

export default AuthService;
