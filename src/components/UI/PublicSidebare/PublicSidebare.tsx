"use client";
import { sidebarItems } from "@/constant/sidebarItmes";
import { getUserInfo } from "@/service/auth.service";
import { useState } from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const PubliceSidebare = () => {
  // const role = USER_ROLE.ADMIN;
  const { role, email, id } = getUserInfo() as any;
  const profileData = getUserInfo();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
      // style={{
      //   overflow: "auto",
      //   height: "100vh",
      //   position: "sticky",
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      // }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        ITS
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role, email, id)}
      />
    </Sider>
  );
};

export default PubliceSidebare;
