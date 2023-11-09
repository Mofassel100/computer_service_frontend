"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Carousel, Col, Divider, Flex, Row, Space } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CareSafety from "@/components/CareSafety/CareSafety";
import TopBannar from "@/components/UI/TopBannar/TopBannar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";

import ITPagination from "@/components/UI/ITPagination";
const contentStyle: React.CSSProperties = {
  height: "400px",
  width: "full",
  color: "#fff",
};

const Homes = () => {
  const dispatch = useDispatch();
  const { serviceData } = useSelector((state: any) => state.services);
  console.log(...serviceData, "useselector");
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const onCartChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useAllcategorysQuery({ ...query });

  const catagorys: any = data?.allcategorys;

  const catagorsData = catagorys?.data;
  const meta = catagorys?.meta;
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {/* category contentd only lg and md */}

        {/* Large (lg) visible content */}
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{
            maxWidth: "97%",
            alignItems: "center",
          }}
        >
          {catagorsData?.map((category: any) => (
            <Col
              xs={0}
              lg={4}
              md={4}
              sm={4}
              key={category?.id}
              className="homeHover"
            >
              <Link
                style={{
                  color: "black",
                }}
                href={`/all-service/${category?.id}`}
              >
                <div>
                  <Image
                    style={{
                      borderRadius: "50%",
                      maxWidth: "50px",

                      maxHeight: "50px",
                    }}
                    src={category?.image}
                    width={35}
                    height={35}
                    layout="responsive"
                    alt="next/image"
                  />
                  <h4>{`${category?.name}`.slice(0, 14)} ..</h4>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        {/* Top Banner */}
        <div style={{ textAlign: "center", margin: "20px auto" }}>
          <Row
            justify={"center"}
            align={"middle"}
            gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
            style={{
              textAlign: "center",
              maxWidth: "full",
              margin: "auto",
            }}
          >
            <Col
              style={{ maxHeight: "450px", maxWidth: "auto", margin: "auto" }}
              span={24}
              lg={24}
              md={24}
              xs={24}
              sm={24}
            >
              <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <TopBannar category={category} />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </div>

        <div>
          <Space size={"large"}>
            <h1 style={{ marginBottom: "13px" }}>Top Service</h1>
          </Space>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Row
              align={"middle"}
              justify={"center"}
              style={{ margin: "auto", textAlign: "center" }}
              className="gutter-row"
            >
              {catagorsData?.map((category: any) => (
                <div
                  className="categoryBorder"
                  key={category?.id}
                  style={{
                    height: "290px",
                    width: "210px",
                    margin: "10px",
                    padding: "6px",
                  }}
                >
                  <div>
                    <Link href={`/all-service/${category?.id}`}>
                      {" "}
                      {category?.image ? (
                        <Image
                          className="categoryImage"
                          width={190}
                          height={200}
                          style={{ borderRadius: "10px" }}
                          src={category?.image}
                          alt="nent/image"
                        ></Image>
                      ) : (
                        ""
                      )}
                    </Link>
                  </div>
                  {/* body */}
                  <div
                    style={{
                      width: "190px",
                      height: "70px",
                      display: "grid",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4>{category?.title}</h4>
                    <div
                      style={{
                        alignItems: "center",
                        display: "grid",
                        justifyContent: "center",
                      }}
                    >
                      <Button style={{ alignItems: "center", bottom: 0 }}>
                        <Link
                          onClick={() => dispatch(addToCart({ category }))}
                          href={`/all-service/${category?.id}`}
                        >
                          Service
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Row>
          <ITPagination
            pageSize={size}
            showSizeChanger={true}
            totalPages={meta?.total}
            onPaginationChange={onPaginationChange}
          ></ITPagination>
        </div>
      </div>
      {/* why choose us */}
      <Divider plain></Divider>
      <section
        style={{
          margin: "15px 0px",
        }}
      >
        <CareSafety />
      </section>
    </div>
  );
};

export default Homes;
