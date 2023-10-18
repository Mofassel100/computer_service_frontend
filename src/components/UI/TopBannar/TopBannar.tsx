"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { Carousel } from "antd";
import { Card } from "antd";

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
      <div></div>
    </Carousel>
  );
};

export default TopBannar;