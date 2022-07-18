import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/index";
import "./user.scss";

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
      .post(process.env.REACT_APP_BACKEND_URL + "users/add", values)
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
      <Row justify="center" align="middle" className="addContent">
        <Col sm={8} className="boxshadow addContentChild">
          <h1 className="heading">Add User</h1>
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

            <Form.Item>
              <Row justify="space-between">
                <Col xs={11}>
                  <Button
                    onClick={() => nevigate("/")}
                    type="ghost"
                    block
                    className="button"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col xs={11}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="button"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default AddUser;
