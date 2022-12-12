import React from "react";
import swal from "sweetalert";
import { Button, Input } from "antd";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { signUp } from "../../store/actions/auth";
import { schemaSignup } from "../../services/auth";

// import { schema } from "../../services/auth";

import Background from "../../assets/images/login/jiraBackground.jpg";
const Signup = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: schemaSignup,
    validationOnMount: true,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    formik.setTouched({
      email: true,
      passWord: true,
    });

    if (!formik.isValid) {
      swal("Please check your information again!");
      return;
    }

    dispatch(
      signUp(formik.values, () => {
        props.history.push("/login");
      })
    );
  };
  const backgroundJira = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="w-auto" style={backgroundJira}>
      <form
        onSubmit={handleRegister}
        className="container"
        style={{ height: window.innerHeight }}
      >
        <div
          className="flex flex-col justify-center items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="flex text-center flex-col py-20 px-10 shadow shadow-lg shadow-slate-500 bg-white rounded-md">
            <div className="mb-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg"
                width={300}
                alt="..."
              />
            </div>
            <h3 className="text-center text-2xl">Sign up to continue to:</h3>
            <p className="font-bold text-lg">Login Page</p>

            {/* name*/}
            <div className="flex mt-3">
              <Input
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
                placeholder="name"
                style={{ minWidth: 300 }}
                prefix={<UserOutlined />}
              />
            </div>
            {formik.touched.name && (
              <p className="text-red-500 text-left">{formik.errors.name}</p>
            )}

            {/* email*/}
            <div className="flex mt-3">
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
                placeholder="email"
                style={{ minWidth: 300 }}
                prefix={<MailOutlined />}
              />
            </div>
            {formik.touched.email && (
              <p className="text-red-500 text-left">{formik.errors.email}</p>
            )}

            {/* phone */}
            <div className="mt-3">
              <Input
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
                placeholder="phone number"
                style={{ minWidth: 300 }}
                prefix={<PhoneOutlined />}
              />
            </div>
            {formik.touched.phoneNumber && (
              <p className="text-red-500 text-left">
                {formik.errors.phoneNumber}
              </p>
            )}

            {/* password */}
            <div className="flex mt-3">
              <Input
                name="passWord"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="passWord"
                size="large"
                placeholder="password"
                style={{ minWidth: 300 }}
                prefix={<LockOutlined />}
              />
            </div>
            {<p className="text-red-500 text-left">{formik.errors.password}</p>}

            {/*  signup btn */}
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              style={{
                minWidth: 300,
              }}
              className="mt-3 text-white"
            >
              Sign Up
            </Button>
            <small className="my-3">OR</small>
            <p>
              Already have an account ?
              <NavLink to="/login" className="text-blue-500">
                {" "}
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
