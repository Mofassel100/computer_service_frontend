"use client";

import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useAllServiceQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Carousel, Col, Image, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const Allservice = ({ params }: { params: any }) => {
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
  const { data: categorys } = useAllcategorysQuery({ ...query });
  const catagorys = categorys?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;
  const { id } = params as any;
  const { data, isLoading } = useAllServiceQuery(id);
  const ServiceData = data?.allservice;
  console.log(ServiceData);

  return (
    <div>
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
      <Row
        justify={"center"}
        align={"middle"}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Row
          align={"middle"}
          justify={"center"}
          style={{ margin: "6px" }}
          className="gutter-row"
        >
          {ServiceData?.map((category: any) => (
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
                <Link href={`/service-detail/${category?.id}`}>
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
                <h4>{`${category?.name}`.slice(0, 23)}...</h4>
                <div
                  style={{
                    alignItems: "center",
                    display: "grid",
                    justifyContent: "center",
                  }}
                >
                  <Button style={{ alignItems: "center" }}>
                    <Link href={`/service-detail/${category?.id}`}>
                      Service Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default Allservice;
