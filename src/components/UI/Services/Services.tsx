import Image from "next/image";
import { StarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { useAllServiceGetDBQuery } from "@/redux/api/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Modal, message } from "antd";
import { addToCart } from "@/redux/slice/cartSlice";
import Link from "next/link";
import QuickView from "./QuickView";
import { useRouter } from "next/navigation";
const Services = ({ service }: { service: any }) => {
  const { serviceData } = useSelector((state: any) => state.cart);
  const addToCartMachTData = (id: string) => {
    const isItemInCart = serviceData?.some((serviceCart: any) => {
      return serviceCart?.id === id;
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
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(6);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  const onCartChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isError } = useAllServiceGetDBQuery({
    ...query,
  });
  const AllServices: any = data?.allServiceDB;
  const allServicesData = AllServices?.data;
  const meta = AllServices?.meta;
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const dispatch = useDispatch();
  console.log();
  // modal quae view card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();

  return (
    <div>
      <Col
        style={{ margin: "10px", height: "325px", width: "240px" }}
        xl={6}
        lg={8}
        md={8}
        sm={0}
        xs={0}
      >
        <div
          className="service-container categoryBorder"
          style={{
            height: "325px",
            width: "240px",
            padding: "5px 3px",
            margin: "1px 8px",
            position: "relative",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {" "}
          <div>
            <Link
              className="link-color"
              style={{}}
              href={`/service-detail/${service?.id}`}
            >
              <Image
                className="imageHover"
                src={service?.image}
                alt="next/image"
                height={150}
                width={230}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Link>
            <h1
              style={{ fontWeight: "bold", border: "none" }}
              onClick={() => showModal()}
              className="quick-view"
            >
              Quick View
            </h1>
            {/* service body */}

            <div>
              <p style={{ padding: "2px 0px" }}>
                {`${service?.title}`.slice(0, 20)}
              </p>
              <Link
                className="link-color"
                style={{}}
                href={`/service-detail/${service?.id}`}
              >
                <h2
                  style={{
                    padding: "3px 0px",
                    textAlign: "start",
                  }}
                >
                  {`${service?.name}`.slice(0, 35)}
                  {`${service?.name}`.length > 35 ? "..." : ""}
                </h2>
              </Link>
              <p style={{ padding: "3px 0px" }}>
                <StarOutlined style={{}} />
                <StarOutlined />
                <StarOutlined />
                <StarOutlined />
                <StarOutlined />({service?.rating})
              </p>
              <p>
                {`${service?.price}`}&#2547;
                <span style={{ padding: "0px 8px" }}>
                  <del>{service?.oldPrice}</del>
                  &#2547;
                </span>{" "}
                Dis: {service?.oldPrice - service?.price}&#2547;
              </p>
              <p style={{ padding: "5px 0px" }}>
                <Button
                  style={{ color: "black", fontWeight: "bold" }}
                  onClick={() => {
                    addToCartMachTData(service?.id);
                    dispatch(
                      addToCart({
                        id: service?.id,
                        quantity: service?.quantity,
                        price: service?.price,
                        image: service?.image,
                        title: service?.title,
                        name: service?.name,
                        rating: service?.rating,
                        description: service?.description,
                      })
                    );
                  }}
                >
                  Add To Card
                </Button>
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col
        style={{ margin: "5px", height: "170px", width: "110px" }}
        xl={0}
        lg={0}
        md={0}
        sm={6}
        xs={8}
      >
        <div
          className="service-container categoryBorder"
          style={{
            height: "170px",
            width: "110px",
            padding: "5px 3px",
            margin: "2px 2px",
            position: "relative",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {" "}
          <div>
            <Link
              className="link-color"
              style={{}}
              href={`/service-detail/${service?.id}`}
            >
              <Image
                className="imageHover"
                src={service?.image}
                alt="next/image"
                height={60}
                width={100}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Link>
            <p
              style={{ fontWeight: "bold", border: "none" }}
              onClick={() => showModal()}
              className="quick-viewsm"
            >
              Quick View
            </p>
            {/* service body */}

            <div>
              <Link
                className="link-color"
                style={{}}
                href={`/service-detail/${service?.id}`}
              >
                <h5
                  style={{
                    padding: "3px 0px",
                    textAlign: "start",
                  }}
                >
                  {`${service?.name}`.slice(0, 16)}
                  {`${service?.name}`.length > 16 ? "..." : ""}
                </h5>
              </Link>
              <small style={{ padding: "3px 0px" }}>
                <StarOutlined />
                <StarOutlined />
                <StarOutlined />({service?.rating})
              </small>
              <br />
              <small>
                {`${service?.price}`}&#2547;
                <span style={{ padding: "0px 8px" }}>
                  <del>{service?.oldPrice}</del>
                  &#2547;
                </span>{" "}
              </small>

              <p style={{ padding: "5px 0px" }}>
                <Button
                  style={{ color: "black", fontWeight: "bold" }}
                  onClick={() => {
                    addToCartMachTData(service?.id);
                    dispatch(
                      addToCart({
                        id: service?.id,
                        quantity: service?.quantity,
                        price: service?.price,
                        image: service?.image,
                        title: service?.title,
                        name: service?.name,
                        rating: service?.rating,
                        description: service?.description,
                      })
                    );
                  }}
                >
                  Add To Card
                </Button>
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Modal title="Login Page" open={isModalOpen} onCancel={handleCancel}>
        <QuickView
          addToCartMachTData={addToCartMachTData}
          handleOk={handleOk}
          ServiceData={service}
        />
      </Modal>
    </div>
  );
};

export default Services;
