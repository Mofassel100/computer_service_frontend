"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import ActionBar from "@/components/UI/ActionBar";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { getUserInfo } from "@/service/auth.service";
import { Button, Col, Modal, Row, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const Profiles = () => {
  const { id } = getUserInfo() as any;
  const { data } = useAdminQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [updateAdmin] = useUpdateAdminMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      console.log(data);
      await updateAdmin({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const defaultValues = {
    name: data?.name,
    imageURL: data?.imageURL,
    address: data?.address,
    dateOfBirth: data?.dateOfBirth,
    phoneNumber: data?.phoneNumber,
  };
  return (
    <div
      style={{
        textAlign: "center",
        margin: "10px auto",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        title="Admin Updated"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar title="Update Admin"> </ActionBar>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col
                className="gutter-row"
                span={24}
                lg={8}
                md={12}
                sm={24}
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="First Name"
                />
              </Col>

              <Col
                className="gutter-row"
                span={24}
                lg={8}
                md={12}
                sm={24}
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="url"
                  name="imageURL"
                  size="large"
                  label="Image Url"
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                lg={8}
                md={12}
                sm={24}
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="date"
                  name="dateOfBirth"
                  size="large"
                  label="Date Of Birth"
                />
              </Col>

              <Col
                className="gutter-row"
                span={24}
                lg={8}
                md={12}
                sm={24}
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="phoneNumber"
                  size="large"
                  label="Contact No."
                />
              </Col>
              <div style={{ justifyContent: "center" }}>
                <Col
                  span={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ margin: "10px 0", justifyContent: "center" }}
                >
                  <FormTextArea
                    name="address"
                    label="Permanent address"
                    rows={4}
                  />
                </Col>
              </div>
            </Row>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </Modal>
      <div
        className="borderAndRadius"
        style={{
          width: "max-content",
          height: "max-content",

          position: "relative",
          top: "0",
          right: "0",
          padding: "7px 10px",
        }}
      >
        <div
          className="imageHover"
          style={{
            position: "absolute",
            top: "-15px",
            right: "0",
          }}
        >
          <Button
            onClick={() => showModal()}
            style={{ backgroundColor: "turquoise" }}
          >
            Update
          </Button>
        </div>
        <div
          style={{
            textAlign: "start",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderRadius: "20px",
            }}
          >
            {data?.imageURL ? (
              <Image
                className="imageHover"
                style={{
                  borderRadius: "20px",
                }}
                alt="res.cloudinary.com"
                src={data?.imageURL}
                width={250}
                height={250}
              />
            ) : (
              "Image not Found"
            )}
          </div>
          <h1> {data?.name ? data?.name : ""}</h1>
          <div>
            <h3 style={{ textAlign: "start" }}>
              Email : {data?.email ? data?.email : ""}
            </h3>

            <h3>Role : {data?.role ? data?.role : ""}</h3>
            <h3>DateOfBirth : {data?.dateOfBirth ? data?.dateOfBirth : ""}</h3>
            <h3>Address : {data?.address ? data?.address : ""}</h3>
            <h3>
              Create AT:{" "}
              {data?.createdAt
                ? dayjs(data?.createdAt).format("MMM D, YYYY hh:mm A")
                : ""}
            </h3>
            <h3>
              Updated At:{" "}
              {data?.updatedAt
                ? dayjs(data?.updatedAt).format("MMM D, YYYY hh:mm A")
                : ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
