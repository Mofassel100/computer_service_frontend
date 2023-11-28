"use client";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import ITPagination from "@/components/UI/ITPagination";
import Services from "@/components/UI/Services/Services";
import TopCategory from "@/components/UI/TopCategory/TopCategory";
import { useAllcategorysQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Row } from "antd";
import { useEffect, useState } from "react";

const Allservice = ({ params }: { params: any }) => {
  const query: Record<string, any> = {};
  const { id } = params as any;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  useEffect(() => {
    if (!!id) {
      console.log(id);
      setSearchTerm(id);
    }
  }, [id]);
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data: categorys } = useAllcategorysQuery({ limit: 20, page: 1 });
  const catagorys: any = categorys?.allcategorys;
  const catagorsData = catagorys?.data;
  const { data, isLoading } = useServicesQuery({ ...query });
  const ServiceDB: any = data?.services;
  const ServiceData = ServiceDB?.data;
  const meta = ServiceDB?.meta;
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  return (
    <div style={{ maxWidth: "85%", margin: "auto" }}>
      <div style={{ textAlign: "center", margin: "5px auto" }}>
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
        <Row
          align={"middle"}
          justify={"center"}
          style={{ margin: "6px" }}
          className="gutter-row"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          {ServiceData?.map((service: any) => (
            <Services service={service} key={service?.id} />
          ))}
        </Row>
      </Row>
      <div style={{ textAlign: "center", margin: "10px auto" }}>
        <ITPagination
          pageSize={size}
          showSizeChanger={true}
          totalPages={meta?.total}
          onPaginationChange={onPaginationChange}
        ></ITPagination>
      </div>
    </div>
  );
};

export default Allservice;
