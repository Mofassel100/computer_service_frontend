/* eslint-disable react-hooks/rules-of-hooks */
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
import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
// @ts-ignore
import ActionBar from "@/components/UI/ActionBar/ActionBar";
// @ts-ignore
import ITTable from "@/components/UI/ITTable/ITTable";
import {
  useAdminQuery,
  useAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/api/adminApi";
import Image from "next/image";

const AdminPage = () => {
  const [deleteAdmin] = useDeleteAdminMutation();
  const deletedItems = async (data: any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to ${data} delete this item?`
    );
    if (confirmDelete) {
      await deleteAdmin(data);
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
  const { data, isLoading } = useAdminsQuery({ ...query });
  const [views, setViews] = useState("");
  const admins = data?.admins;
  const meta = data?.meta;
  const adminData = async (datas: string) => {
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
  const { data: adminDatass } = useAdminQuery(views);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },

    // {
    //   title: "Created at",
    //   dataIndex: "createdAt",
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        console.log(data);
        return (
          <>
            <Button
              onClick={() => {
                showModal();
                adminData(data);
              }}
              type="primary"
            >
              <EyeOutlined />
            </Button>

            <Link href={`/super_admin/admin/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
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
  console.log(adminDatass);
  return (
    <div>
      <ITBreadCrump
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <ActionBar title="Admin List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />

        <Modal
          title="Admin Details"
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
              {adminDatass?.imageURL ? (
                <Image
                  style={{
                    borderRadius: "20px",
                  }}
                  alt="res.cloudinary.com"
                  src={adminDatass?.imageURL}
                  width={150}
                  height={120}
                />
              ) : (
                "Image not Found"
              )}
            </div>
            <div>
              <h3>Name : {adminDatass?.name ? adminDatass?.name : ""}</h3>
              <h3>Email : {adminDatass?.email ? adminDatass?.email : ""}</h3>
              <h3>
                DateOfBirth :{" "}
                {adminDatass?.dateOfBirth ? adminDatass?.dateOfBirth : ""}
              </h3>
              <h3>
                Address : {adminDatass?.address ? adminDatass?.address : ""}
              </h3>
              <h3>
                Create AT:{" "}
                {adminDatass?.createdAt
                  ? dayjs(adminDatass?.createdAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
              <h3>
                Updated At:{" "}
                {adminDatass?.updatedAt
                  ? dayjs(adminDatass?.updatedAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
            </div>
          </div>
        </Modal>
        <div>
          <Link href="/super_admin/admin-create">
            <Button type="primary">Create Admin</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
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
        dataSource={admins}
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

export default AdminPage;
