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
  useDeleteUserMutation,
  useUserQuery,
  useUsersQuery,
} from "@/redux/api/userApi";
import ActionBar from "@/components/UI/ActionBar";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import ITTable from "@/components/UI/ITTable";

const UserPage = () => {
  const [deleteUser] = useDeleteUserMutation();
  const deletedItems = async (data: any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to ${data} delete this item?`
    );
    if (confirmDelete) {
      await deleteUser(data);
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
  const { data, isLoading } = useUsersQuery({ ...query });
  const [views, setViews] = useState("");
  const admins = data?.users;
  console.log(admins);
  const meta = data?.meta;
  const UserData = async (datas: string) => {
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
  const { data: userAllData } = useUserQuery(views);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
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
              type="primary"
            >
              <EyeOutlined />
            </Button>

            <Link href={`/admin/user/edit/${data}`}>
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
  console.log(userAllData);
  return (
    <div>
      <ITBreadCrump
        items={[
          {
            label: "admin",
            link: "/admin",
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
              {userAllData?.imageURL ? (
                <Image
                  style={{
                    borderRadius: "20px",
                  }}
                  alt="res.cloudinary.com"
                  src={userAllData?.imageURL}
                  width={150}
                  height={120}
                />
              ) : (
                "Image not Found"
              )}
            </div>
            <div>
              <h3>Name : {userAllData?.name ? userAllData?.name : ""}</h3>
              <h3>Email : {userAllData?.email ? userAllData?.email : ""}</h3>
              <h3>
                DateOfBirth :{" "}
                {userAllData?.dateOfBirth ? userAllData?.dateOfBirth : ""}
              </h3>
              <h3>
                Address : {userAllData?.address ? userAllData?.address : ""}
              </h3>
              <h3>
                Create AT:{" "}
                {userAllData?.createdAt
                  ? dayjs(userAllData?.createdAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
              <h3>
                Updated At:{" "}
                {userAllData?.updatedAt
                  ? dayjs(userAllData?.updatedAt).format("MMM D, YYYY hh:mm A")
                  : ""}
              </h3>
            </div>
          </div>
        </Modal>
        <div>
          <Link href="/admin/user/create">
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

export default UserPage;
