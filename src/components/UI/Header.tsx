"use client";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { getUserInfo, removeUserInfo } from "@/service/auth.service";
import { authKey } from "@/constant/localStorage";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const Header = () => {
  const { role } = getUserInfo() as any;
  const logOut = () => {
    removeUserInfo(authKey);
  };

  const items: MenuProps["items"] = [
    role && {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
    {
      key: "0",
      label: (
        <Button type="text" ghost>
          <Link href={"/login"}>Sign In</Link>
        </Button>
      ),
    },
    {
      key: "0",
      label: (
        <Button type="text" ghost>
          <Link href={"/registration"}>Sign Up</Link>
        </Button>
      ),
    },
  ];

  //   const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        className="lg:hidden"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <div
          style={{
            margin: "auto",
          }}
        >
          <button
            style={{
              margin: "0 5px",
            }}
          >
            <ShoppingCartOutlined
              style={{
                fontSize: "25px",
                padding: "2px",
                marginRight: "3px",
                background: "none",
                border: "none",
              }}
            />
          </button>
          {role ? (
            <Button
              style={{
                margin: "0 5px",
              }}
            >
              <Link href={role}>Home</Link>
            </Button>
          ) : (
            <Button
              style={{
                margin: "0 5px",
              }}
            >
              <Link href={"/"}>Home</Link>
            </Button>
          )}
        </div>
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          {role}
        </p>
        <div
          style={{
            justifyContent: "end",
          }}
        >
          <Dropdown menu={{ items }}>
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
