"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Carousel, Col, Divider, Flex, Row } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CareSafety from "@/components/CareSafety/CareSafety";
import TopBannar from "@/components/UI/TopBannar/TopBannar";
const contentStyle: React.CSSProperties = {
  height: "400px",
  width: "full",
  color: "#fff",
};
const topCategoryContent: React.CSSProperties = {
  height: "100px",
};

const Homes = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data } = useAllcategorysQuery({ ...query });
  const catagorys = data?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;
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
        {/* bannar animition */}
        <Divider plain />
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
            {/* 
            <Col
              style={{
                maxHeight: "400px",
                maxWidth: "210",
                margin: "auto",
                borderRadius: "15px",
              }}
              span={24}
              lg={4}
              md={3}
              xs={24}
              sm={24}
            > */}
            {/* top banner */}
            {/* <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <Link
                      style={{
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                      }}
                      href={`/all-service/${category?.id}`} // Add the URL you want to link to
                    >
                      <Image
                        style={{
                          height: "320px",
                          width: "210px",
                          borderRadius: "15px",
                        }}
                        layout="responsive"
                        width={320}
                        height={210}
                        src={category?.image}
                        alt="next/image"
                      />
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Consequuntur totam earum neque expedita non
                          numquam voluptatem cupiditate. Illum inventore animi
                          repudiandae voluptates sed minus. Dolor assumenda
                          ullam est quaerat repellat!
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </Carousel> */}
            {/* </Col> */}
          </Row>
        </div>

        <div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Row
              align={"middle"}
              justify={"center"}
              style={{ margin: "6px" }}
              className="gutter-row"
            >
              {catagorsData?.map((category: any) => (
                <div
                  key={category?.id}
                  style={{
                    height: "320px",
                    width: "210px",
                    margin: "10px",
                    padding: "6px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <Link href={`/all-service/${category?.id}`}>
                      {" "}
                      {category?.image ? (
                        <Image
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
                      height: "100px",
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
                      <Button style={{ alignItems: "center" }}>
                        <Link href={`/all-service/${category?.id}`}>
                          Service
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Row>
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
