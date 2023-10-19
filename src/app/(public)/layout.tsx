"use client";
import PubliceSidebare from "@/components/ui/PublicSidebare/PublicSidebare";
import Contents from "@/components/ui/content/Content";
import { isLoggedIn } from "@/service/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PublicePage = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname();
  useEffect(() => {
    if (userLoggedIn) {
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
    <Layout>
      <PubliceSidebare />
      <Layout>
        <Contents>{children}</Contents>
      </Layout>
    </Layout>
  );
};

export default PublicePage;
