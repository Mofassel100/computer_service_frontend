"use client";
import {
  useAllcategorysQuery,
  useCategorysQuery,
} from "@/redux/api/categoryApi";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const TopBannar = () => {
  const { data, isLoading } = useAllcategorysQuery({ limit: 100, page: 1 });
  const catagorys = data?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;
  console.log(catagorsData);
  return (
    <Carousel autoplay>
      <div>
        {catagorsData?.map((category: any) => (
          <div style={{}} key={category.id}>
            dfsd
          </div>
        ))}
      </div>
    </Carousel>
  );
};

export default TopBannar;
