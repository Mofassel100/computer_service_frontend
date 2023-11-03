"use client";

import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useAllServiceGetDBQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { IService } from "@/types/common";
import { Button, Carousel, Col, Image, Row } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Allservice = ({ params }: { params: any }) => {
  const query: Record<string, any> = {};
  const queryService: Record<string, any> = {};
  const { search } = params as any;
  console.log("allservice", search);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // setSearchTerm(id);
  queryService["limit"] = size;
  queryService["page"] = page;
  queryService["sortBy"] = sortBy;
  queryService["sortOrder"] = sortOrder;
  // setSearchTerm(search);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  useEffect(() => {
    if (!!search) {
      console.log(search);
      setSearchTerm(search);
    }
  }, [search]);
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
  const { data, isError } = useAllServiceGetDBQuery({
    ...query,
  });
  const AllServicesDatass: any = data?.allServiceDB;

  const searchData = AllServicesDatass?.data as any;
  console.log(searchData);

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
        {searchData?.length > 0 ? (
          <>
            {" "}
            <Row
              align={"middle"}
              justify={"center"}
              style={{ margin: "6px" }}
              className="gutter-row"
            >
              {searchData?.map((service: any) => (
                <div
                  key={service?.id}
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
                    <Link href={`/service-detail/${service?.id}`}>
                      {" "}
                      {service?.image ? (
                        <Image
                          width={190}
                          height={200}
                          style={{ borderRadius: "10px" }}
                          src={service?.image}
                          alt="nent/image"
                        ></Image>
                      ) : (
                        ""
                      )}
                    </Link>
                  </div>

                  <div
                    style={{
                      width: "190px",
                      height: "100px",
                    }}
                  >
                    <h4>{`${service?.name}`.slice(0, 23)}...</h4>
                    <div
                      style={{
                        alignItems: "center",
                        display: "grid",
                        justifyContent: "center",
                      }}
                    >
                      <Button style={{ alignItems: "center" }}>
                        <Link href={`/service-detail/${service?.id}`}>
                          Service Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </>
        ) : (
          <>Not foun data</>
        )}
        {/* */}
      </Row>
    </div>
  );
};

export default Allservice;
