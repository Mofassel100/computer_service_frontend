"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { useState } from "react";
import { Button, Col, Image, Row, message } from "antd";
import { StarOutlined } from "@ant-design/icons";
import "../../../../components/UI/style/style.css";
import TopCategory from "@/components/UI/TopCategory/TopCategory";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import "./service-detail.css";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import { IService } from "@/types/common";
import { useRouter } from "next/navigation";

const Allservice = ({ params }: { params: any }) => {
  const router = useRouter();
  const [revAndDes, setReviAndDescrip] = useState("");
  const { id } = params as any;
  const { data } = useServiceQuery(id);
  const ServiceData: any = data;
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
  const catagorys: any = categorysData?.allcategorys;
  const catagorsData = catagorys?.data;
  const reviwDescrption = (r: any) => {
    setReviAndDescrip(r);
  };
  const { serviceData } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const addToCartMachTData = (cartId: string) => {
    const isItemInCart = serviceData?.some((serviceCart: any) => {
      return serviceCart?.id === cartId;
    });

    if (isItemInCart) {
      return message.warning(
        "Already added to the cart. Please try another item.",
        5
      );
    } else {
      router.push("/cart");
    }
  };
  return (
    <div style={{ maxWidth: "85%", margin: "auto" }}>
      <div style={{ textAlign: "center", margin: "5px auto" }}>
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{
            maxWidth: "85%",
            alignItems: "center",
          }}
        >
          {catagorsData?.map((category: any) => (
            <TopCategory key={category?.id} category={category} />
          ))}
        </Row>
      </div>
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
              style={{ borderRadius: "10px" }}
              className="cart-details"
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
              {`${ServiceData?.name}`.slice(0, 70)}
              {`${ServiceData?.name}`.length > 70 ? "..." : ""}
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
                {ServiceData?.price}&#2547;
              </span>
              <del style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {ServiceData?.price}&#2547;
              </del>
            </p>
            <p style={{ fontSize: "18px", paddingBottom: "5px" }}>
              Discount :{" "}
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {ServiceData?.oldPrice - ServiceData?.price}&#2547;
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
                onClick={() => {
                  addToCartMachTData(ServiceData?.id);
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
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  background: "black",
                  color: "white",
                }}
                size="large"
              >
                Add To Card
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
            <Button onClick={() => reviwDescrption(ServiceData?.description)}>
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

export default Allservice;
