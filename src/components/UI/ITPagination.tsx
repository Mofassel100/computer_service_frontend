import { Pagination } from "antd";
import React from "react";
type ITPaginationProps = {
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
};

const ITPagination = ({
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
}: ITPaginationProps) => {
  const pageSizeOptions: number[] = [4, 6, 8, 10, 12, 14, 18];
  return (
    <Pagination
      pageSizeOptions={pageSizeOptions}
      total={totalPages}
      defaultPageSize={4}
      showSizeChanger={showSizeChanger}
      onChange={onPaginationChange}
    ></Pagination>
  );
};

export default ITPagination;
