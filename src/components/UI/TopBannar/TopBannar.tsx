"use client";
import { Col, Row } from "antd";
import Link from "next/link";
const TopBannar = ({ category }: { category: any }) => {
  return (
    <>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Link
            style={{ color: "White" }}
            href={`/all-service/${category?.id}`}
          >
            <div
              className="imageHover"
              style={{
                height: "400px",
                width: "100%",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                borderRadius: "15px",
                backgroundSize: "cover",
                backgroundImage: `url('${category?.image}')`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ fontSize: "50xp" }}>{category?.title}</h1>
                <h2>{category?.name}</h2>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default TopBannar;
