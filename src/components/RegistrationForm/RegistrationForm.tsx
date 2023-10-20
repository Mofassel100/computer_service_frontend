"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import ITBreadCrump from "@/components/UI/ITBreadCrump";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { registrationSchema } from "@/schemas/registrationForm";
import { Button, Col, Row, message } from "antd";
import FormDatePicker from "../Forms/FormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from "next/navigation";

const RegistrationForm = () => {
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    console.log(obj);
    message.loading("Creating...");
    try {
      const result = await addAdminWithFormData(obj);
      if (result) {
        message.success("User Registration successfully!");
      }
      // redirect.push("/login");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div style={{ marginBottom: "80px" }}>
      <ITBreadCrump
        items={[
          {
            label: "/",
            link: "/",
          },
          {
            label: "user",
            link: "/",
          },
        ]}
      />
      <h1 style={{ textAlign: "center" }}>Registration Start</h1>

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
              display: "grid",
              fontSize: "18px",
              marginBottom: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            All Information
          </p>
          <Row
            justify={"center"}
            align={"middle"}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={24}
                sm={12}
                lg={8}
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Full Name"
                />
              </Col>
              <Col
                xs={24}
                sm={12}
                lg={8}
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
                xs={24}
                sm={12}
                lg={8}
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
            </Row>

            <br />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={24}
                sm={12}
                lg={8}
                className="gutter-row"
                span={8}
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
                span={8}
                sm={12}
                lg={8}
                xs={24}
                style={{ margin: "10px 0", justifyContent: "center" }}
              >
                <FormDatePicker
                  name="dateOfBirth"
                  size="large"
                  label="Date Of Birth"
                />
              </Col>
              <Col
                sm={12}
                lg={8}
                span={8}
                xs={24}
                style={{ margin: "10px 0", justifyContent: "center" }}
              >
                <FormTextArea
                  name="address"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </Row>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button htmlType="submit" type="primary">
            Registration
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
