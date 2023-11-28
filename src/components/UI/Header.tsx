"use client";
import React, { useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Row, Space } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/service/auth.service";
import { authKey } from "@/constant/localStorage";
import Link from "next/link";
import HeaderItems from "@/constant/HeaderItems";
import ShopingModal from "./Modal";
import { boolean } from "yup";
const { Header: AntHeader } = Layout;
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { role, email } = getUserInfo() as any;
  const logOut = () => {
    removeUserInfo(authKey);
  };
  return (
    <AntHeader style={{ background: "#fff" }}>
      <ShopingModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={email}
      />
      <Row className="lg:hidden" align="middle" style={{ height: "100%" }}>
        <div style={{ margin: "auto" }}>
          <Menu subMenuCloseDelay={2} mode="horizontal" items={HeaderItems()} />
        </div>
        <Row
          align={"middle"}
          justify={"center"}
          style={{
            justifyContent: "center",
            display: "grid",
            alignItems: "center",
          }}
        >
          <Button
            icon={<ShoppingCartOutlined />}
            size="large"
            onClick={() => showModal()}
          ></Button>
        </Row>
        <p style={{ margin: "0px 5px" }}>{role}</p>
        <div style={{ justifyContent: "end" }}>
          <Dropdown
            overlay={
              <Menu>
                {role && (
                  <Menu.Item key="logout">
                    <Button onClick={logOut} type="text" danger>
                      Logout
                    </Button>
                  </Menu.Item>
                )}
                <Menu.Item key="signin">
                  <Button type="text" ghost>
                    <Link href={"/login"}>Sign In</Link>
                  </Button>
                </Menu.Item>
                <Menu.Item key="signup">
                  <Button type="text" ghost>
                    <Link href={"/registration"}>Sign Up</Link>
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <a>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Row>
    </AntHeader>
  );
};

export default Header;
