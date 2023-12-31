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
import {
  useAdminServicesQuery,
  useDeleteServiceMutation,
  useServiceQuery,
} from "@/redux/api/serviceApi";
import { getUserInfo } from "@/service/auth.service";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import ActionBar from "@/components/UI/ActionBar";
import ITTable from "@/components/UI/ITTable";

const UserPage = () => {
  const [deleteService] = useDeleteServiceMutation();
  const deletedItems = async (data: any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to ${data} delete this item?`
    );
    if (confirmDelete) {
      await deleteService(data);
      message.success("deleted");
    } else {
      ("");
    }
  };
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
  const { data, isLoading } = useAdminServicesQuery(id);
  const [views, setViews] = useState("");
  const admins = data?.adminServices;
  const meta = data?.meta;
  const UserData = async (datas: string) => {
    setViews(datas);
  };
  // modal view details
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
  // -----------------
  const { data: serviceSignleData } = useServiceQuery(views);
  const columns = [
    {
      title: "Title",
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
                UserData(data);
              }}
              style={{ backgroundColor: "turquoise", color: "black" }}
            >
              <EyeOutlined />
            </Button>

            <Link href={`/admin/service/edit/${data}`}>
              <Button
                onClick={() => console.log(data)}
                style={{
                  backgroundColor: "turquoise",
                  color: "black",
                  margin: "0px 5px",
                }}
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
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <ITBreadCrump
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <Modal
        title="Service Detail"
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
            {serviceSignleData?.image ? (
              <Image
                style={{
                  borderRadius: "20px",
                  backgroundSize: "cover",
                }}
                alt="res.cloudinary.com"
                src={serviceSignleData?.image}
                width={300}
                height={300}
              />
            ) : (
              "Image not Found"
            )}
          </div>
          <div>
            <h3>
              Name : {serviceSignleData?.name ? serviceSignleData?.name : ""}
            </h3>
            <h3>
              title : {serviceSignleData?.title ? serviceSignleData?.title : ""}
            </h3>
            <h3>
              Current Price :{" "}
              {serviceSignleData?.price ? serviceSignleData?.price : ""}
            </h3>
            <h3>
              Old Price :{" "}
              {serviceSignleData?.oldPrice ? serviceSignleData?.oldPrice : ""}
            </h3>
            <h3>
              Description :{" "}
              {serviceSignleData?.description
                ? serviceSignleData?.description
                : ""}
            </h3>
            <h3>
              Rating :{" "}
              {serviceSignleData?.rating ? serviceSignleData?.rating : ""}
            </h3>
            <h3>
              Review :{" "}
              {serviceSignleData?.review ? serviceSignleData?.review : ""}
            </h3>
            <h3>
              Create AT:{" "}
              {serviceSignleData?.createdAt
                ? dayjs(serviceSignleData?.createdAt).format(
                    "MMM D, YYYY hh:mm A"
                  )
                : ""}
            </h3>
            <h3>
              Updated At:{" "}
              {serviceSignleData?.updatedAt
                ? dayjs(serviceSignleData?.updatedAt).format(
                    "MMM D, YYYY hh:mm A"
                  )
                : ""}
            </h3>
          </div>
        </div>
      </Modal>

      <ActionBar title="Service List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />

        <Link
          style={{ backgroundColor: "turquoise", color: "none" }}
          href="/admin/service/create"
        >
          <Button style={{ backgroundColor: "turquoise", color: "black" }}>
            Create Service
          </Button>
        </Link>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button
            style={{ backgroundColor: "turquoise", color: "black" }}
            onClick={resetFilters}
          >
            <ReloadOutlined />
          </Button>
        )}
      </ActionBar>
      <div style={{}}>
        <ITTable
          loading={isLoading}
          columns={columns}
          dataSource={admins}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default UserPage;
