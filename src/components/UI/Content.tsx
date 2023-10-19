"use client";
import { Layout } from "antd";
import Header from "./Header";

const { Content, Footer } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Header />

      <div
        style={{
          padding: "10px",
        }}
      >
        {children}
      </div>
      <Footer style={{ textAlign: "center" }}>
        Mofassel Hosain ©2023 Created by ITS
      </Footer>
    </Content>
  );
};

export default Contents;
