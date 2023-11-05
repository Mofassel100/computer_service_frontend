"use client";
import { Layout, Row } from "antd";
import NavBar from "./Navber";

const { Content, Footer } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "3",
        }}
      >
        <NavBar></NavBar>
      </div>

      <div
        style={{
          padding: "10px",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Contents;
