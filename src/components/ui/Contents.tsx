
import { Content } from "antd/es/layout/layout";
import React from "react";
import UMBreadCrumb from "./UMBreadCrumb";
import Header from "./Header";

const Contents = ({children}: {children: React.ReactNode}) => {
    const base = "admin";
    return (
      <Content style={{ minHeight: "100vh", color: "black" }}>
        <Header />
        <div
          style={{
            padding: "10px",
          }}
        >
          {children}
        </div>
      </Content>
    );
};

export default Contents;