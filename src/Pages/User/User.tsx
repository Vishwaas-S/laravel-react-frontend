import React, { useEffect, useState } from "react";
import Layout from "../../Layout/index";
import type { ColumnsType } from "antd/es/table";
import { Button, Col, PageHeader, Row, Table, Tag } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  email: string;
  roles: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
    render: (_, { roles }: any) => (
      <>
        {roles.map((role: any) => {
          let color = "red";
          if (role.name === "Author") color = "blue";
          if (role.name === "Editor") color = "volcano";
          if (role.name === "Subscriber") color = "green";
          if (role.name === "Administrator") color = "geekblue";

          return (
            <Tag color={color} key={role}>
              {role.name.toUpperCase()}
            </Tag>
          );
        })}
        {roles.length <= 0 ? (
          <Tag color="red" key={1}>
            No Role Assigned
          </Tag>
        ) : (
          ""
        )}
      </>
    ),
  },
];

function User() {
  const nevigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "users")
      .then(({ data }: any) => {
        setUsers(data?.data?.users);
        setCurrentPage(data?.paginate?.current_page);
        setTotalUsers(data?.paginate?.total);
      });
  }, []);

  const handlePagination = (page: number, pageSize: number) => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `users?page=${page}`)
      .then(({ data }: any) => {
        setUsers(data?.data?.users);
        setCurrentPage(data?.paginate?.current_page);
      });
  };

  return (
    <Layout>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col sm={18}>
          <PageHeader
            title="Users"
            className="site-page-header"
            extra={[
              <Button
                style={{ borderRadius: "5px" }}
                onClick={() => nevigate("/user/add")}
                type="primary"
              >
                Add User
              </Button>,
            ]}
            avatar={{
              src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
            }}
          />
        </Col>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Col sm={18}>
          <Table
            columns={columns}
            dataSource={users}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: totalUsers,
              onChange: (page, pageSize) => handlePagination(page, pageSize),
              style: { marginRight: "20px" },
            }}
            style={{
              borderRadius: "10px",
              boxShadow: "1px 1px 14px 1px lightgrey",
            }}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default User;
