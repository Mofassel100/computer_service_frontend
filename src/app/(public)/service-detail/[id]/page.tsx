"use client";

import { useServiceQuery } from "@/redux/api/serviceApi";
import { Image, Row } from "antd";

const Allservice = ({ params }: { params: any }) => {
  const { id } = params as any;
  const { data } = useServiceQuery(id);
  const ServiceData = data;
  console.log(ServiceData, "service details");

  return (
    <div>
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
