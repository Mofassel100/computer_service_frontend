"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const ITBreadCrump = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  const breadCrumbItems = [
    {
      title: (
        <Link style={{ fontWeight: "17px" }} href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link
            style={{ fontWeight: "bold", color: "turquoise" }}
            href={item.link}
          >
            {item.label}
          </Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];
  return (
    <Breadcrumb
      style={{ fontWeight: "17px", padding: "5px 10px", width: "90%" }}
      items={breadCrumbItems}
    ></Breadcrumb>
  );
};

export default ITBreadCrump;
