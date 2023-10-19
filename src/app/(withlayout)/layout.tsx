"use client";
import SideBar from "@/components/UI/Sidebar";
import Contents from "@/components/UI/Content";
import { isLoggedIn } from "@/service/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
