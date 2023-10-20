"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Carousel, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const contentStyle: React.CSSProperties = {
  height: "420px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const topCategoryContent: React.CSSProperties = {
  height: "100px",

  lineHeight: "40px",
  textAlign: "center",
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
      <div>
        {/* category contentd only lg and md */}
        <div>
          <Carousel autoplay>
            <Row>
              {/* Large (lg) visible content */}
              <Row gutter={[16, 16]} justify="center" align="middle">
                {catagorsData?.map((category: any) => (
                  <Col xs={0} lg={4} key={category?.id}>
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
                          }}
                          src={category?.image}
                          width={65}
                          height={65}
                          alt="next/image"
                        />
                        <h4>{`${category?.name}`.slice(0, 14)} ..</h4>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Row>
          </Carousel>
        </div>
        <Row>{/* Other content after the Carousel */}</Row>
        <Row
          justify={"center"}
          align={"middle"}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
        >
          <Col span={24} lg={8} sm={24}>
            <div style={{ marginTop: "20px" }}>
              {/* top banner */}
              <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <Link
                      style={{
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      href={""} // Add the URL you want to link to
                    >
                      <Image
                        width={240}
                        height={240}
                        src={category?.image}
                        alt="content/image"
                      />
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>

          <Col span={24} lg={8} sm={24}>
            <div style={{ marginTop: "20px" }}>
              {/* top banner */}
              <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <Link
                      style={{
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      href={""} // Add the URL you want to link to
                    >
                      <Image
                        width={240}
                        height={240}
                        src={category?.image}
                        alt="content/image"
                      />
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col lg={8} span={0} xs={0}>
            <div style={{ marginTop: "20px" }}>
              {/* top banner */}
              <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <Link
                      style={{
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      href={""} // Add the URL you want to link to
                    >
                      <Image
                        width={240}
                        height={240}
                        src={category?.image}
                        alt="content/image"
                      />
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>

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
    </div>
  );
};

export default Homes;
