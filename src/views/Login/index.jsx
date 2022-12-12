import React from "react";
import { Button, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/actions/auth";
import { schema } from "../../services/auth";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import Background from "../../assets/images/login/jiraBackground.jpg";
const Login = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    validationSchema: schema,
    validationOnMount: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    formik.setTouched({
      email: true,
      passWord: true,
    });

    if (!formik.isValid) {
      swal("Please check again!");
      return;
    }

    dispatch(
      logIn(formik.values, () => {
        props.history.push("/projects");
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
        onSubmit={handleSubmit}
        className="container mx-auto"
        style={{ height: window.innerHeight }}
      >
        <div
          className="flex justify-center items-center text-center flex-col"
          style={{ height: window.innerHeight }}
        >
          <div className="flex text-center flex-col py-20 px-10 shadow-2xl shadow-slate-200 bg-white rounded-md">
            <div className="mb-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg"
                width={300}
                alt="..."
              />
            </div>
            <h3
              className="text-center"
              style={{ fontWeight: 300, fontSize: 35 }}
            >
              {" "}
              Login to continute to:
            </h3>
            <p className="font-bold text-lg">Your's Dasboard</p>
            {/* email*/}
            <div className="flex mt-3">
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
                placeholder="email"
                style={{ minWidth: 300, width: "100%" }}
                prefix={<MailOutlined />}
              />
            </div>
            {formik.touched.email && (
              <p className="text-red-500 text-left">{formik.errors.email}</p>
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
                style={{ minWidth: 300, width: "100%" }}
                prefix={<LockOutlined />}
              />
            </div>
            {<p className="text-red-500 text-left">{formik.errors.passWord}</p>}

            {/*  login btn */}
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              style={{
                minWidth: 300,
              }}
              className="mt-3"
            >
              Login
            </Button>
            <small className="my-3">OR</small>
            <p>
              Don't have an account yet?
              <NavLink to="/register" className="text-blue-500">
                {" "}
                Register now
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
