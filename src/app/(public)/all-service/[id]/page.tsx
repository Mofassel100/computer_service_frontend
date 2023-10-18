"use client";

import { useAllServiceQuery } from "@/redux/api/serviceApi";
import { Button, Image, Row } from "antd";
import Link from "next/link";
import React from "react";

const Allservice = ({ params }: { params: any }) => {
  const { id } = params as any;
  const { data, isLoading } = useAllServiceQuery(id);
  const ServiceData = data?.allservice;
  console.log(ServiceData);

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                <h4>{category?.title}</h4>
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
