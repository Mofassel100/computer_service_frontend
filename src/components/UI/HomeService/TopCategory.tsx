import { IServiceCategory } from "@/types/common";
import { Button, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoryService = ({ category }: { category: IServiceCategory }) => {
  return (
    <div>
      <Col
        style={{ margin: "10px", width: "240px", height: "290px" }}
        xl={6}
        lg={8}
        md={8}
        sm={0}
        xs={0}
      >
        <div
          className="categoryBorder"
          key={category?.id}
          style={{
            height: "290px",
            width: "240px",
            margin: "1px 8px",
            padding: "5px 3px",
          }}
        >
          <div>
            <Link href={`/all-service/${category?.id}`}>
              {" "}
              {category?.image ? (
                <Image
                  className="categoryImage"
                  width={230}
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
          <div style={{ textAlign: "center" }}>
            <h3 style={{ padding: "7px 0px" }}>{category?.title}</h3>
            <div
              style={{
                alignItems: "center",
                display: "grid",
                justifyContent: "center",
              }}
            >
              <Button style={{ alignItems: "center", bottom: 0 }}>
                <Link href={`/all-service/${category?.id}`}>Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col
        style={{ margin: "5px 5px", height: "180px", width: "110px" }}
        xl={0}
        lg={0}
        md={0}
        sm={6}
        xs={8}
      >
        <div
          className="categoryBorder"
          key={category?.id}
          style={{
            height: "180px",
            width: "110px",
            margin: "2px 2px",
            padding: "6px",
          }}
        >
          <div>
            <Link href={`/all-service/${category?.id}`}>
              {" "}
              {category?.image ? (
                <Image
                  className="categoryImage"
                  width={100}
                  height={100}
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
          <div style={{ textAlign: "center" }}>
            <h5 style={{ padding: "7px 0px" }}>
              {`${category?.title}`.slice(0, 14)}
              {`${category?.title}`.length > 14 ? "..." : ""}
            </h5>
            <div
              style={{
                alignItems: "center",
                display: "grid",
                justifyContent: "center",
              }}
            >
              <Button style={{ alignItems: "center", bottom: 0 }}>
                <Link href={`/all-service/${category?.id}`}>Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default TopCategoryService;
