"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import FormSelectField from "@/components/Forms/FormselectField";
import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
import { USER_ROLE } from "@/constant/role";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { adminSchema } from "@/schemas/admin";
import { Button, Col, Input, Row, message } from "antd";

const CreateAdminPage = () => {
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    console.log(obj);
    message.loading("Creating...");
    try {
      const result = await addAdminWithFormData(obj);
      console.log(result);
      message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <ITBreadCrump
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin",
          },
        ]}
      />
      <h1>Create Admin</h1>

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
            Admin Information
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
                name="name"
                size="large"
                label="First Name"
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
                name="imageURL"
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
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
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
                type="email"
                name="email"
                size="large"
                label="Email address"
              />
            </Col>
            <Col
              className="gutter-row"
              span={10}
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
            <Col
              className="gutter-row"
              span={9}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput name="role" label="Role"></FormInput>
            </Col>
            <div style={{ justifyContent: "center" }}>
              <Col
                span={20}
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
        </div>
        <Button htmlType="submit" type="primary">
          Create Admin
        </Button>
      </Form>
    </div>
  );
};

export default CreateAdminPage;
