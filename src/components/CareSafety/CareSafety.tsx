import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Flex, Row } from "antd";
const CareSafety = () => {
  return (
    <>
      <p>__why choose us</p>
      <h1 style={{ fontSize: "30px", margin: "10px 0px" }}>
        Because we care about your safety..
      </h1>

      <Row justify={"center"} align={"middle"}>
        <Col style={{}} lg={12} md={12} sm={24} xs={24}>
          <div>
            <Flex
              justify="center"
              align="center"
              style={{
                padding: "12px",
              }}
            >
              <Flex
                justify="center"
                align="center"
                className="safety"
                style={{
                  maxHeight: "130px",
                  maxWidth: "130px",
                  padding: "45px",
                  margin: "0px 10px",
                }}
              >
                <Image
                  width={50}
                  height={50}
                  alt="next/image"
                  style={{
                    borderRadius: "50%",
                    padding: "0px 4px",
                  }}
                  src={
                    "https://res.cloudinary.com/db6qhze3s/image/upload/v1699113716/maks_dxqmds.png"
                  }
                />
                <h1 style={{ fontSize: "15px", paddingRight: "5px" }}>
                  Ensuring Masks
                </h1>
              </Flex>
              <Flex
                justify="center"
                align="center"
                className="safety"
                style={{
                  maxHeight: "130px",
                  maxWidth: "130px",
                  padding: "45px",
                  margin: "0px 10px",
                }}
              >
                <Image
                  width={50}
                  height={50}
                  alt="next/image"
                  style={{ borderRadius: "50%", padding: "0px 4px" }}
                  src={
                    "https://res.cloudinary.com/db6qhze3s/image/upload/v1699113716/maks_dxqmds.png"
                  }
                />
                <h1 style={{ fontSize: "15px", paddingRight: "5px" }}>
                  E24/7 Support
                </h1>
              </Flex>
            </Flex>
            <Flex
              justify="center"
              align="center"
              style={{
                padding: "12px",
              }}
            >
              <Flex
                justify="center"
                align="center"
                className="safety"
                style={{
                  maxHeight: "130px",
                  maxWidth: "130px",
                  padding: "45px",
                  margin: "0px 10px",
                }}
              >
                <Image
                  width={50}
                  height={50}
                  alt="next/image"
                  style={{ borderRadius: "50%", padding: "0px 4px" }}
                  src={
                    "https://res.cloudinary.com/db6qhze3s/image/upload/c_thumb,w_200,g_face/v1699202347/Gloves-image_hbmv8m.jpg"
                  }
                />
                <h1 style={{ fontSize: "15px", paddingRight: "5px" }}>
                  Ensuring Gloves
                </h1>
              </Flex>
              <Flex
                justify="center"
                align="center"
                className="safety"
                style={{
                  maxHeight: "130px",
                  maxWidth: "130px",
                  padding: "45px",
                  margin: "0px 10px",
                }}
              >
                <Image
                  width={50}
                  height={50}
                  alt="next/image"
                  style={{ borderRadius: "50%", padding: "0px 4px" }}
                  src={
                    "https://res.cloudinary.com/db6qhze3s/image/upload/v1699113722/Sanitising_sm9b1h.jpg"
                  }
                />
                <h1 style={{ fontSize: "15px", paddingRight: "5px" }}>
                  Sanitising Hands & Equipment
                </h1>
              </Flex>
            </Flex>
          </div>
        </Col>

        <Col lg={12} md={12} sm={0} xs={0}>
          <Image
            alt="next/image"
            height={300}
            width={600}
            style={{ borderRadius: "15px", maxWidth: "600px" }}
            src={
              "https://res.cloudinary.com/db6qhze3s/image/upload/v1699205483/wepik-export-20231105172944J4Sm_szgul7.jpg"
            }
          />
        </Col>
        <Col style={{ textAlign: "center" }} lg={0} md={0} sm={24} xs={24}>
          <Image
            alt="next/image"
            height={300}
            width={250}
            style={{
              borderRadius: "15px",
              maxWidth: "600px",
              textAlign: "center",
            }}
            src={
              "https://res.cloudinary.com/db6qhze3s/image/upload/v1699205483/wepik-export-20231105172944J4Sm_szgul7.jpg"
            }
          />
        </Col>
        {/* <Col lg={24} md={24} sm={24}>
            485380945
          </Col> */}
      </Row>
    </>
  );
};

export default CareSafety;
