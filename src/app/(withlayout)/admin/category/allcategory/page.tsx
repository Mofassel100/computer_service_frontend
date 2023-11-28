"use client";
import { Button, Input, Modal } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import { getUserInfo } from "@/service/auth.service";
import {
  useCategoryQuery,
  useCategorysQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import ActionBar from "@/components/UI/ActionBar";
import ITTable from "@/components/UI/ITTable";

const UserPage = () => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const deletedItems = async (data: any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to ${data} delete this item?`
    );
    if (confirmDelete) {
      await deleteCategory(data);
      message.success("deleted");
    } else {
      ("");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { id } = getUserInfo() as any;
  console.log(id);
  const { data, isLoading } = useCategorysQuery(id);
  const [views, setViews] = useState("");
  const category = data?.categorys;
  console.log(category);
  const meta = data?.meta;
  const CategoryData = async (datas: string) => {
    setViews(datas);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { data: categoryData } = useCategoryQuery(views);
  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Button
              onClick={() => {
                showModal();
                CategoryData(data);
              }}
              style={{ backgroundColor: "turquoise" }}
            >
              <EyeOutlined />
            </Button>
            <Link href={`/admin/category/edit/${data}`}>
              <Button
                onClick={() => console.log(data)}
                style={{ backgroundColor: "turquoise", margin: "0px 5px" }}
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => deletedItems(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div style={{ padding: "10px" }}>
      <ITBreadCrump
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="Category List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <Modal
          title="Category Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div
              style={{
                textAlign: "center",
                borderRadius: "20px",
              }}
            >
              {categoryData?.image ? (
                <Image
                  className="imageHover"
                  style={{
                    borderRadius: "15px",
                  }}
                  alt="res.cloudinary.com"
                  src={categoryData?.image}
                  width={250}
                  height={250}
                />
              ) : (
                "Image not Found"
              )}
            </div>
            <div>
              <h3>Title : {categoryData?.title ? categoryData?.title : ""}</h3>
              <h3>
                Service Name : {categoryData?.name ? categoryData?.name : ""}
              </h3>
              <h3>
                Create AT:{" "}
                {categoryData?.createdAt
                  ? dayjs(categoryData?.createdAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
              <h3>
                Updated At:{" "}
                {categoryData?.updatedAt
                  ? dayjs(categoryData?.updatedAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
            </div>
          </div>
        </Modal>
        <div>
          <Link href="/admin/cagegory/create">
            <Button style={{ backgroundColor: "turquoise" }}>
              Create Admin
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ backgroundColor: "turquoise", margin: "0px 5px" }}
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <ITTable
        loading={isLoading}
        columns={columns}
        dataSource={category}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default UserPage;
