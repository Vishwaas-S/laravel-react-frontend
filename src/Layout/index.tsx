import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import { Content } from "antd/lib/layout/layout";

function index(props: any) {
  return (
    <Layout>
      <Header />
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "100vh" }}
        >
          {props.children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default index;
