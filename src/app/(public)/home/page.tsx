"use client";
import TopBannar from "@/components/UI/TopBannar/TopBannar";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { Button, Carousel, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const contentStyle: React.CSSProperties = {
  height: "420px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Homes = () => {
  const { data, isLoading } = useAllcategorysQuery({ limit: 100, page: 1 });
  const catagorys = data?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;
  return (
    <div>
      <div>
        <div>
          <Carousel autoplay>
            <div
              style={{
                alignItems: "center",
                justifyItems: "center",
                display: "grid",
              }}
            >
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    style={{
                      height: "450",
                      width: "700px",
                    }}
                    width={500}
                    height={700}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697582094/camera-service_xdn1t3.jpg"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697576288/computer-service_w7adsy.avif"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697576003/ac-service_giqqgw.png"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697575576/printer-service_etikxt.jpg"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697574988/laptop-service_uaaeqx.jpg"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <Link
                  style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      "https://res.cloudinary.com/db6qhze3s/image/upload/v1697575800/mobile-service_xj6xu7.png"
                    }
                    alt="nent/image"
                  ></Image>
                </Link>
              </div>
            </div>
          </Carousel>

          {/* top bannar */}
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
                    <Link href={""}>
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
                    <Button>
                      <Link href={""}></Link>
                    </Button>
                  </div>
                </div>
              ))}
            </Row>
          </Row>
          div
        </div>
      </div>
    </div>
  );
};

export default Homes;

//  <div
//    style={{
//      height: "320px",
//      width: "210px",

//      padding: "6px",
//      border: "1px solid black",
//    }}
//  >
//    <div>
//      <Link href={""}>
//        {" "}
//        <Image
//          width={190}
//          height={200}
//          style={{ borderRadius: "10px" }}
//          src={
//            "https://res.cloudinary.com/db6qhze3s/image/upload/v1697582094/camera-service_xdn1t3.jpg"
//          }
//          alt="nent/image"
//        ></Image>
//      </Link>
//    </div>
//    {/* body */}
//    <div
//      style={{
//        width: "190px",
//        height: "100px",
//      }}
//    ></div>
//  </div>;
