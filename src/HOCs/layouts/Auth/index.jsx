import React from "react";
import { Row } from "antd";

const AuthLayout = (props) => {
  return (
    <>
      <Row>{props.children}</Row>
    </>
  );
};

export default AuthLayout;
