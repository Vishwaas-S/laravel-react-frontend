import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/index";

const roles = [
  {
    id: 1,
    name: "Author",
  },
  {
    id: 2,
    name: "Editor",
  },
  {
    id: 3,
    name: "Subscriber",
  },
  {
    id: 4,
    name: "Administrator",
  },
];

function AddUser() {
  const nevigate = useNavigate();

  const onFinish = (values: any) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "user/add", values)
      .then((data) => {
        notification.success({
          message: data?.data?.meta?.message,
          duration: 2,
        });
        nevigate("/");
      })
      .catch(({ response }) => {
        notification.error({
          message: response?.data?.meta?.message,
          duration: 2,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div>
        <Row justify="center" align="middle" style={{ height: "76vh" }}>
          <Col
            sm={8}
            style={{
              borderRadius: "10px",
              boxShadow: "1px 1px 14px 1px lightgrey",
              padding: "30px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Add User
            </h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Full Name"
                name="fullname"
                rules={[{ required: true, message: "Please Input Full Name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please Input Email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="roles"
                label="Roles"
                rules={[
                  {
                    required: true,
                    message: "Please select atleast one role!",
                    type: "array",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Please select role">
                  {roles?.map((role) => {
                    return (
                      <Select.Option value={role.id}>{role.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item style={{ marginBottom: "0px" }}>
                <Row justify="space-between">
                  <Col xs={11}>
                    <Button
                      onClick={() => nevigate("/")}
                      type="ghost"
                      block
                      style={{ marginRight: "15px", borderRadius: "5px" }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={11}>
                    <Button
                      style={{ borderRadius: "5px" }}
                      type="primary"
                      htmlType="submit"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default AddUser;
