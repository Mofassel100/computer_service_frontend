import { useAllServiceGetDBQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { useState } from "react";
import ITPagination from "../ITPagination";
import { Button, Row } from "antd";
import Image from "next/image";
import { StarOutlined } from "@ant-design/icons";
import { number } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity } from "@/redux/slice/cartSlice";
const AllService = () => {
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
  console.log(allServicesData);
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const [count, setCount] = useState(1);

  function plus() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }
  function minus() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 1);
      }
    });
  }
  const dispatch = useDispatch();
  const serviceData = useSelector((state: any) => {
    state;
  });
  console.log(serviceData);
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center", margin: "12px 0px" }}>Top Service</h1>
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          margin: "12px auto",
        }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {allServicesData?.map((service: any) => (
          <div
            key={service?.id}
            className="service-container categoryBorder"
            style={{
              height: "320px",
              width: "240px",
              padding: "5px 3px",
              margin: "10px",
              position: "relative",
              borderRadius: "10px",
            }}
          >
            <div>
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
              <h1 className="quick-view">Quick View</h1>
              {/* service body */}

              <div>
                <p style={{ padding: "2px 0px" }}>
                  {`${service?.title}`.slice(0, 20)}
                </p>
                <h2
                  style={{
                    padding: "3px 0px",
                    textAlign: "start",
                  }}
                >
                  {`${service?.name}`.slice(0, 40)}
                  {`${service?.name}`.length > 38 ? "..." : ""}
                </h2>
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
                  Discount {service?.oldPrice - service?.price}&#2547;
                </p>
                <p style={{ padding: "5px 0px" }}>
                  <Button>Add To Card</Button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Row>
      <div
        style={{
          margin: "10px auto",
        }}
      >
        <ITPagination
          pageSize={size}
          showSizeChanger={true}
          totalPages={meta?.total}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  );
};

export default AllService;
