"use client";

import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import {
  useAllServiceGetDBQuery,
  useAllServiceQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Carousel, Col, Image, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const Allservice = ({ params }: { params: any }) => {
  const query: Record<string, any> = {};
  const { id } = params as any;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: datas, isError } = useAllServiceGetDBQuery({
    limit: 30,
    page: 1,
  });
  const allServicesData = datas?.allServiceDB;
  console.log(allServicesData, "get Data");
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
  const { data: categorys } = useAllcategorysQuery({ limit: 20, page: 1 });
  const catagorys = categorys?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;

  const { data, isLoading } = useAllServiceQuery(id);
  const ServiceData = data?.allservice;

  return (
    <div style={{ maxWidth: "85%", margin: "auto" }}>
      <div style={{ textAlign: "center", margin: "15px auto" }}>
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
                      maxWidth: "45px",
                      maxHeight: "45px",
                    }}
                    src={category?.image}
                    width={35}
                    height={35}
                    alt="next/image"
                  />
                  <h4>{`${category?.name}`.slice(0, 14)} ..</h4>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
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
