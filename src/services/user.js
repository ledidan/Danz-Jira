import axiosClient from "./axiosClient";
import * as yup from "yup";

export const editUserSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain numbers only"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Password confirmation does not match"),
});

class UserService {
  fetchAllUsers(params) {
    return axiosClient.get("/users/getUser", { params });
  }

  deleterUser(id) {
    return axiosClient.delete(`/users/deleteUser?id=${id}`);
  }

  getMembersByProjectId(projectId) {
    return axiosClient.get(`/users/getUserByProjectId?idProject=${projectId}`);
  }

  updateUser(data) {
    return axiosClient.put("/users/editUser", data);
  }
}

export default UserService;
