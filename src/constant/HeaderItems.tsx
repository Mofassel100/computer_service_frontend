import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import "./../components/UI/style/style.css";
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
  return defaultSidebarItems;
};

export default HeaderItems;
