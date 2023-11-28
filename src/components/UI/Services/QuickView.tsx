import React, { useState } from "react";
import ITBreadCrump from "../ITBreadCrump";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { addToCart } from "@/redux/slice/cartSlice";
import { StarOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const QuickView = ({
  ServiceData,
  handleOk,
  addToCartMachTData,
}: {
  ServiceData: any;
  handleOk: any;
  addToCartMachTData: any;
}) => {
  const [revAndDes, setReviAndDescrip] = useState(ServiceData?.review);
  const dispatch = useDispatch();
  const reviwDescrption = (r: any) => {
    setReviAndDescrip(r);
  };
  return (
    <div style={{ maxWidth: "85%", margin: "auto" }}>
      <ITBreadCrump
        items={[
          {
            label: "Home",
            link: "/",
          },
        ]}
      />
      <Row
        justify={"center"}
        align={"middle"}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col
          style={{ padding: "5px" }}
          className="gutter-row"
          lg={10}
          md={12}
          sm={24}
          xs={24}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              className="cart-details"
              width={160}
              height={200}
              object-fite={"cover"}
              src={ServiceData?.image}
              alt="next/image"
            ></Image>
          </div>
        </Col>
        <Col
          style={{ padding: "10px 10px" }}
          className="gutter-row"
          span={24}
          lg={14}
          md={12}
          sm={24}
          xs={24}
        >
          <div>
            <h1
              style={{
                textAlign: "start",
              }}
            >
              {ServiceData?.title}
            </h1>
            <h3 style={{ padding: "5px 0px" }}>
              {`${ServiceData?.name}`.slice(0, 60)}
              {`${ServiceData?.name}`.length > 60 ? "..." : ""}
            </h3>
            <p style={{ fontSize: "18px", paddingTop: "5px" }}>
              <StarOutlined style={{}} />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />({ServiceData?.rating})
            </p>
            <p style={{ fontSize: "18px", padding: "5px 0px" }}>
              Price :{" "}
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {ServiceData?.price}.00&#2547;
              </span>
              <del style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {ServiceData?.price}.00&#2547;
              </del>
            </p>
            <p style={{ fontSize: "18px", paddingBottom: "5px" }}>
              Discount :
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {ServiceData?.oldPrice - ServiceData?.price}.00&#2547;
              </span>
            </p>

            <div
              style={{
                textAlign: "start",
                padding: "5px 0px",
              }}
            >
              {" "}
              <Button
                size="large"
                onClick={() => {
                  addToCartMachTData(ServiceData?.id);
                  handleOk();
                  dispatch(
                    addToCart({
                      id: ServiceData?.id,
                      quantity: ServiceData?.quantity,
                      price: ServiceData?.price,
                      image: ServiceData?.image,
                      title: ServiceData?.title,
                      name: ServiceData?.name,
                      rating: ServiceData?.rating,
                      description: ServiceData?.description,
                    })
                  );
                }}
                style={{
                  background: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Add To Card &#8594;
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ margin: "15px 0px" }}>
        <div
          style={{ display: "flex", alignItems: "start", padding: "5px 5px" }}
        >
          <p>
            <Button
              defaultValue={ServiceData?.review}
              onClick={() => reviwDescrption(ServiceData?.description)}
            >
              Description
            </Button>
          </p>
          <p
            style={{
              marginBottom: "20px",
              paddingLeft: "8px",
            }}
          >
            <Button onClick={() => reviwDescrption(ServiceData?.review)}>
              Reviews
            </Button>
          </p>
        </div>

        <p
          style={{
            padding: "20px 15px",
            fontWeight: "16px",
          }}
        >
          {revAndDes}
        </p>
      </div>
    </div>
  );
};

export default QuickView;
