"use client";
import { sidebarItems } from "@/constant/sidebarItmes";
import { getUserInfo } from "@/service/auth.service";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const PubliceSidebare = () => {
  // const role = USER_ROLE.ADMIN;
  const { role, email, id } = getUserInfo() as any;


  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
   
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
