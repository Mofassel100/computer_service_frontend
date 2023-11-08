"use client";
import Contents from "@/components/UI/Content";
import NavBar from "@/components/UI/Navber";
import SideBar from "@/components/UI/Sidebar";
import { isLoggedIn } from "@/service/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Footer } = Layout;

const PublicePage = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname();
  useEffect(() => {
    if (!userLoggedIn) {
      router.push(pathName);
      // router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  return (
    <div>
      <NavBar></NavBar>

      <Layout hasSider>
        <Layout>
          <Contents>{children}</Contents>

          <Footer style={{ textAlign: "center" }}>
            Mofassel Hosain ©2023 Created by ITService
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default PublicePage;
