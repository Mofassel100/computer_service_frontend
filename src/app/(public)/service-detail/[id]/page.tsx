"use client";

import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Col, Image, Row } from "antd";
import { strict } from "assert";
import Link from "next/link";
import { useState } from "react";

const Allservice = ({ params }: { params: any }) => {
  const { id } = params as any;
  const { data } = useServiceQuery(id);
  const ServiceData = data;
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
  const { data: categorysData } = useAllcategorysQuery({ ...query });
  const catagorys = categorysData?.allcategorys;
  // @ts-ignore
  const catagorsData = catagorys?.data;

  return (
    <div style={{ maxWidth: "85%", margin: "auto" }}>
      <div style={{ textAlign: "center", margin: "15px auto" }}>
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
        style={{
          border: "2px solid black",
          margin: "10px",
          padding: "10px",
          height: "max-content",
          width: "max-conten",
        }}
        align={"middle"}
        justify={"center"}
        gutter={{ xs: 8, sm: 8, lg: 16 }}
      >
        <Row
          align={"middle"}
          justify={"center"}
          style={{ margin: "6px" }}
          className="gutter-row"
        >
          <div>
            <div>
              <Image
                height={420}
                width={300}
                src={ServiceData?.image}
                alt="next/image"
              ></Image>
            </div>
          </div>
        </Row>
        <Row
          align={"middle"}
          justify={"center"}
          style={{ margin: "6px" }}
          className="gutter-row"
        >
          <div
            style={{
              height: "430px",
              width: "430px",
            }}
          >
            <div>
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                {ServiceData?.title}
              </h1>
              <h3>{ServiceData?.name}</h3>
              <p>
                Ole Price :{" "}
                <span
                  style={{ fontWeight: "bold", textDecoration: "line-through" }}
                >
                  {ServiceData?.oldPrice}
                </span>
              </p>
              <p>
                Cureent Price :{" "}
                <span style={{ fontWeight: "bold" }}>{ServiceData?.price}</span>
              </p>
              <p>
                Rating :
                <span style={{ fontWeight: "bold" }}>
                  {ServiceData?.rating}
                </span>
              </p>

              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <button
                  style={{
                    fontSize: "20px",
                    padding: "10px",
                    background: "black",
                    color: "white",
                  }}
                >
                  Add To Card
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Row>
      <div
        style={{
          margin: "40px 30px",
          width: "max-conten",
        }}
      >
        <p>{ServiceData?.review}</p>
        <p
          style={{
            marginBottom: "20px",
          }}
        >
          {ServiceData?.description}
        </p>
      </div>
    </div>
  );
};

export default Allservice;
