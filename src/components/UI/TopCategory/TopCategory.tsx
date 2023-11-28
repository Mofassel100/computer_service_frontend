import { Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategory = ({ category }: { category: any }) => {
  return (
    <Col xs={0} lg={4} md={4} sm={4} key={category?.id} className="homeHover">
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
  );
};

export default TopCategory;
