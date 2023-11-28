"use client";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useDebounced } from "@/redux/hooks";
import { Carousel, Col, Row, Space } from "antd";
import { useState } from "react";
import CareSafety from "@/components/CareSafety/CareSafety";
import TopBannar from "@/components/UI/TopBannar/TopBannar";
import { useSelector } from "react-redux";
import ITPagination from "@/components/UI/ITPagination";
import AllService from "@/components/UI/HomeService/AllService";
import TopCategory from "@/components/UI/TopCategory/TopCategory";
import TopCategoryService from "@/components/UI/HomeService/TopCategory";

const contentStyle: React.CSSProperties = {
  height: "400px",
  width: "full",
  color: "#fff",
};

const Homes = () => {
  const { serviceData } = useSelector((state: any) => state.cart);
  console.log(serviceData, "useselector");
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
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
  const { data, isLoading } = useAllcategorysQuery({ ...query });
  const catagorys: any = data?.allcategorys;
  const catagorsData = catagorys?.data;
  const meta = catagorys?.meta;
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const { data: TopCategorys } = useAllcategorysQuery({ limit: 6, page: 1 });
  const Topcatagorys: any = TopCategorys?.allcategorys;
  const TopCatagorsData = Topcatagorys?.data;

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {/* Large (lg) visible content */}
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{
            maxWidth: "97%",
            alignItems: "center",
          }}
        >
          {TopCatagorsData?.map((category: any) => (
            <TopCategory key={category?.id} category={category} />
          ))}
        </Row>
        {/* Top Banner */}
        <div style={{ textAlign: "center", margin: "20px auto" }}>
          <Row
            justify={"center"}
            align={"middle"}
            gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
            style={{
              textAlign: "center",
              maxWidth: "full",
              margin: "auto",
            }}
          >
            <Col
              style={{ maxHeight: "450px", maxWidth: "auto", margin: "auto" }}
              span={24}
              lg={24}
              md={24}
              xs={24}
              sm={24}
            >
              <Carousel autoplay>
                {catagorsData?.map((category: any) => (
                  <div key={category?.id} style={contentStyle}>
                    <TopBannar category={category} />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </div>
        <div>
          <Space size={"large"}>
            <h1 style={{ marginBottom: "13px" }}>Top Category</h1>
          </Space>
          <Row
            style={{ marginBottom: "15px" }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Row
              align={"middle"}
              justify={"center"}
              style={{ margin: "auto", textAlign: "center" }}
              className="gutter-row"
            >
              {catagorsData?.map((category: any) => (
                <TopCategoryService category={category} key={category?.id} />
              ))}
            </Row>
          </Row>
          <ITPagination
            pageSize={size}
            showSizeChanger={true}
            totalPages={meta?.total}
            onPaginationChange={onPaginationChange}
          ></ITPagination>
        </div>
      </div>
      {/* all Service  section */}
      <div
        style={{
          margin: "25px auto",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AllService />
      </div>
      {/* why choose us */}
      <section
        style={{
          marginTop: "40px",
        }}
      >
        <CareSafety />
      </section>
    </div>
  );
};

export default Homes;
