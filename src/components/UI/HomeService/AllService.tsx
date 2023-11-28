import { useAllServiceGetDBQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { useState } from "react";
import ITPagination from "../ITPagination";
import { Row } from "antd";
import Services from "../Services/Services";

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
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
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
          <Services service={service} key={service?.id}></Services>
        ))}
      </Row>
      <div
        style={{
          margin: "15px auto",
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
