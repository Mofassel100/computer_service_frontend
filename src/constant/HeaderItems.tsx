import { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Menu, Tooltip } from "antd";
import { USER_ROLE } from "./role";
import Link from "next/link";
import {
  useAllcategorysQuery,
  useCategorysQuery,
} from "@/redux/api/categoryApi";
import "./../components/UI/style/style.css";
import ShopingModal from "@/components/UI/Modal";
const HeaderItems = () => {
  const { data, isLoading } = useAllcategorysQuery({ limit: 100, page: 1 });
  const datas = data?.allcategorys as any;
  const categoryData = datas?.data.map((category: any) => ({
    label: (
      <Link
        className="categoryItems textHover"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
        href={`/all-service/${category?.id}`}
      >
        {category?.name}
      </Link>
    ),
    key: `/all-service/${category?.id}`,
  }));
  if (!isLoading) {
    return categoryData;
  }

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link href={"/"}>
          <HomeOutlined style={{ fontSize: "24px" }} />,
        </Link>
      ),
      key: "/",
    },
    {
      label: "Category Service",
      key: "category",
      children: categoryData,
    },
  ];

  // else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  // else if (role === USER_ROLE.User) return UserSidebare;

  return defaultSidebarItems;
};

export default HeaderItems;
