"use client";
import {
  decreaseQuantity,
  deleteService,
  increaseQuantity,
} from "@/redux/slice/cartSlice";
import { Button, Col, Flex, Input, Radio, Row, Select, message } from "antd";
import { useRouter } from "next/navigation";
import {
  ShoppingOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import Image from "next/image";
import { IService } from "@/types/common";
import { optionsName } from "../UI/CountryName";
import ITBreadCrump from "../UI/ITBreadCrump";

const { Title } = Typography;

let CartService = ({ serviceData }: { serviceData: any }) => {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const [serviceGet, setService] = useState([]);
  const { servicData: datasss } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const shopping = (e: number) => {
    let shoppingAmount = totalAmount; // Start with the current totalAmount

    if (e === 100) {
      shoppingAmount += e;
    } else {
      shoppingAmount -= 100;
    }

    setTotalAmount(shoppingAmount);
  };
  useEffect(() => {
    setService(serviceData);
    let amtTotal = 0;
    serviceData?.map((total: IService) => {
      amtTotal += total.quantity * total?.price;
    });
    setTotalAmount(amtTotal);
  }, [serviceData]);

  const deleteItems = (id: string) => {
    const data = serviceGet;
    const index = serviceData.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      serviceData.splice(index, 1);
      localStorage.setItem("service-cart", JSON.stringify(serviceData));
    }
    router.refresh();
  };
  const [value, setValue] = useState([]);
  useEffect(() => {
    setValue(datasss);
  }, []);
  console.log(value, "values");
  return (
    <div style={{}}>
      {serviceData?.length > 0 ? (
        <div>
          <ITBreadCrump
            items={[
              {
                label: "Home",
                link: "/",
              },
            ]}
          />
          <Row>
            {/* product */}
            <Col span={24} lg={18} md={18} sm={24} xs={24}>
              <Row
                justify={"center"}
                align={"middle"}
                gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
              >
                <Col
                  lg={8}
                  md={8}
                  sm={0}
                  xs={0}
                  span={6}
                  style={{ textAlign: "end" }}
                >
                  <Title level={5}>PRODUCT</Title>
                </Col>
                <Col lg={5} md={5} sm={0} xs={0} span={6}>
                  <Title level={5}>PRICE</Title>
                </Col>
                <Col lg={6} md={6} sm={0} xs={0} span={6}>
                  <Title level={5}>QUANTITY</Title>
                </Col>
                <Col lg={5} md={5} sm={0} xs={0} span={6}>
                  <Title level={5}>SUBTOTAL</Title>
                </Col>
              </Row>
              {serviceData?.map((service: any) => (
                <div key={service?.id}>
                  <Row
                    className="cartBorder iconHovers"
                    justify={"center"}
                    align={"middle"}
                    style={{ margin: "10px 15px", textAlign: "center" }}
                    gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
                  >
                    {/* cart image and name */}
                    <Col
                      style={{
                        height: "120px",
                        textAlign: "center",
                      }}
                      lg={8}
                      md={8}
                      sm={24}
                      xs={24}
                      span={6}
                    >
                      <Row
                        justify={"center"}
                        align={"middle"}
                        style={{ margin: "10px auto", textAlign: "center" }}
                        gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
                      >
                        <Col lg={15} md={24} sm={24} xs={24} span={24}>
                          <span
                            style={{
                              position: "absolute",
                              top: "-20px",
                              marginLeft: "-5px",
                              fontSize: "20px",
                              fontWeight: "bold",
                              border: "none",
                              background: "node",
                            }}
                          >
                            <DeleteOutlined
                              onClick={() =>
                                dispatch(deleteService(service?.id))
                              }
                              className="iconHover"
                              type="icon"
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            />
                          </span>
                          <Image
                            src={service?.image}
                            alt="next/image"
                            // layout="responsive"
                            height={80}
                            width={100}
                            style={{
                              borderRadius: "10px",
                            }}
                          />
                        </Col>
                        <Col lg={9} md={24} sm={24} xs={24} span={24}>
                          {" "}
                          <p
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            {`${service?.name}`.slice(0, 30)}
                            {`${service.name}`.length > 30 ? "..." : ""}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    {/* cart price */}
                    <Col lg={4} md={4} sm={24} xs={24} span={6}>
                      <p>{`${service?.price}.00`}&#2547;</p>
                    </Col>
                    {/* cart quantity */}

                    <Col lg={7} md={7} sm={24} xs={24} span={6}>
                      <Flex
                        style={{ margin: "10px auto" }}
                        justify="center"
                        align="center"
                      >
                        <Button
                          onClick={() => {
                            {
                              service?.quantity === 1
                                ? message.warning(
                                    `Lowest 1 Service add ${service?.name} Quantity `
                                  )
                                : "";
                            }
                            dispatch(
                              decreaseQuantity({
                                id: service?.id,
                              })
                            );
                          }}
                          size="large"
                          icon={<MinusOutlined />}
                        ></Button>
                        <Button
                          type="text"
                          size="large"
                          style={{
                            backgroundColor: "white",
                          }}
                        >
                          {service?.quantity}
                        </Button>
                        <Button
                          onClick={() => {
                            dispatch(
                              increaseQuantity({
                                id: service?.id,
                              })
                            );

                            service?.quantity === 10
                              ? message.warning(
                                  `Highest Add  10 ${service?.name} Quantity`
                                )
                              : "";
                          }}
                          size="large"
                          icon={<PlusOutlined />}
                        ></Button>
                      </Flex>
                    </Col>
                    <Col lg={5} md={5} sm={24} xs={24} span={6}>
                      <h3 style={{ marginTop: "10px auto" }}>
                        {service?.quantity * service?.price}.00&#2547;
                      </h3>
                      <p style={{ margin: "10px auto" }}>
                        {`${service?.quantity} x ${service.price}`}.00&#2547;
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
            {/*cart Total  */}
            <Col
              style={{
                border: "1px solid black",
                padding: "12px 14px",
                borderRadius: "10px",
                maxHeight: "85vh",
                position: "sticky",
                top: "100px",
                right: "0",
              }}
              span={24}
              lg={6}
              md={6}
              sm={24}
              xs={24}
            >
              <h2>Cart Total </h2>

              <Flex style={{ margin: "10px auto" }} justify="space-between">
                <span>SubTotal</span> <span>{`${totalAmount}.00`} &#2547;</span>
              </Flex>
              <h3>Shipping</h3>
              <p style={{ margin: "16px auto" }}>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio
                    style={{ marginBottom: "16px" }}
                    onClick={() => shopping(-100)}
                    defaultChecked
                    value={1}
                  >
                    Pick From Service Center
                  </Radio>

                  <Radio onClick={() => shopping(100)} value={0}>
                    Courier Charge: 100.00৳
                  </Radio>
                </Radio.Group>
              </p>
              <Col>
                <Select
                  showSearch
                  style={{ width: 178 }}
                  placeholder="Search to Select"
                  defaultValue={"Bangladesh"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={optionsName}
                />
                <Input
                  style={{ margin: "16px 0px" }}
                  placeholder="State / Country"
                />
                <Input placeholder="Town / City" />;
                <Input placeholder="Postcode / Sip" type="number" />
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "16px auto",
                  }}
                >
                  <p>Total</p> <p>{totalAmount}.00 &#2547;</p>
                </p>
                <Button
                  type="link"
                  size="large"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: "16px auto",
                  }}
                >
                  Process Pay &#8594;
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            margin: "px, auto",
          }}
        >
          <h1 style={{ font: "110PX" }}>
            <ShoppingOutlined style={{ fontSize: "110px" }}></ShoppingOutlined>
          </h1>
          <br />
          <h2>No products added to the cart</h2>
          <Button
            type="link"
            href="/"
            size="large"
            style={{
              margin: "20px auto",
              backgroundColor: "black",
              color: "white",
            }}
          >
            RETURN TO SHOP
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartService;
