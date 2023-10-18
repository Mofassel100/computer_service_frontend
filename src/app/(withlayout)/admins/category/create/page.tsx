"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormselectField";
// @ts-ignore
import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
import { useAddCategoryWithFormDataMutation } from "@/redux/api/categoryApi";
import { getUserInfo } from "@/service/auth.service";
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
    <div>
      <ITBreadCrump
        items={[
          {
            label: "admin",
            link: "/admins",
          },
          {
            label: "user",
            link: "/admins/category/all-category",
          },
        ]}
      />
      <h1 style={{ textAlign: "center" }}>Create User</h1>

      <Form submitHandler={onSubmit}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
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
              span={19}
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
              span={19}
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
              span={8}
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
              span={8}
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
        <Button htmlType="submit" type="primary">
          Create Category
        </Button>
      </Form>
    </div>
  );
};

export default CrateCategory;
