"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormselectField";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import { useAddCategoryWithFormDataMutation } from "@/redux/api/categoryApi";
import { categorySchemaCreated } from "@/schemas/categorySchema";
import { getUserInfo } from "@/service/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CrateCategory = () => {
  const [addCategoryWithFormData] = useAddCategoryWithFormDataMutation();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    message.loading("Creating...");
    try {
      const result = await addCategoryWithFormData(obj);
      if (!!result) {
        message.success("User created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { id } = getUserInfo() as any;
  const userIdOptions = [
    {
      label: "UserId",
      value: id,
    },
  ];
  return (
    <div style={{ padding: "10px" }}>
      <ITBreadCrump
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "user",
            link: "/admin/category/all-category",
          },
        ]}
      />
      <h1 style={{ textAlign: "center" }}>Create Category</h1>

      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(categorySchemaCreated)}
      >
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "15px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Category Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                name="title"
                size="large"
                label="Title is Unique"
                required
                // @ts-ignore
                validation={Error.name && Error.name.message}
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
                name="name"
                size="large"
                label="Service Name"
                required
                // @ts-ignore
                validation={Error.name && Error.name.message}
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
                name="image"
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
              <FormSelectField
                size="large"
                name="userId"
                options={userIdOptions}
                label="User Id"
                placeholder="Select"
              />
            </Col>
          </Row>
        </div>
        <Button
          htmlType="submit"
          style={{
            backgroundColor: "turquoise",
          }}
        >
          Create Category
        </Button>
      </Form>
    </div>
  );
};

export default CrateCategory;
