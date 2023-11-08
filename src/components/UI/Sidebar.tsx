"use client";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constant/sidebarItmes";
import { getUserInfo } from "@/service/auth.service";

const { Sider } = Layout;

const SideBar = () => {
  const { role, email, id } = getUserInfo() as any;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      style={{
        position: "sticky",
        height: "100vh",
        top: 100,
        left: 0,
        bottom: 0,
        color: "white",
        backgroundColor: "black",
      }}
    >
      <Menu
        style={{
          color: "turquoise",
          background: "black",
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role, email, id)}
      />
    </Sider>
  );
};

export default SideBar;
