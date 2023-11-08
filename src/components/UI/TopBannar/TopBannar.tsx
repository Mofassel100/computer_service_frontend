"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { Carousel, Col, Row } from "antd";
import { Card } from "antd";
import Link from "next/link";

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const TopBannar = ({ category }: { category: any }) => {
  const { data, isLoading } = useAllcategorysQuery({ limit: 100, page: 1 });
  const catagorys = data?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;
  return (
    <>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Link
            style={{ color: "White" }}
            href={`/all-service/${category?.id}`}
          >
            <div
              style={{
                height: "400px",
                width: "100%",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                borderRadius: "15px",
                backgroundImage: `url('${category?.image}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ fontSize: "50xp" }}>{category?.title}</h1>
                <h2>{category?.name}</h2>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default TopBannar;
