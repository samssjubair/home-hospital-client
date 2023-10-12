"use client"

import { Row } from "antd";

const Error = () => {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
          color: "red",
        }}
      >
        <h1>Something Went Wrong!</h1>
      </Row>
    );
};

export default Error;