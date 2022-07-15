import React from "react";
import { Layout } from "antd";
const { Header } = Layout;

function Headers() {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <h1 style={{ color: "white", fontWeight: "bold" }}>LOGO</h1>
    </Header>
  );
}

export default Headers;
