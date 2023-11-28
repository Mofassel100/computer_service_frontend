import { Pagination } from "antd";
import React from "react";
type ITPaginationProps = {
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  loading?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  showPagination?: boolean;
};

const ITPagination = ({
  totalPages,
  loading = false,
  showPagination = true,
  showSizeChanger = true,
  pageSize,
  onPaginationChange,
}: ITPaginationProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;
  return (
    <Pagination
      total={totalPages}
      defaultPageSize={4}
      pageSizeOptions={[4, 6]}
      showSizeChanger={showSizeChanger}
      // showSizeChanger={pageSizeOptions}
      onChange={onPaginationChange}
      pageSize={pageSize}
      // pagination={paginationConfig}
    ></Pagination>
  );
};

export default ITPagination;
