"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import ActionBar from "@/components/UI/ActionBar/ActionBar";
import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { IAdmin } from "@/types/common";
// import {
//   useDepartmentQuery,
//   useUpdateDepartmentMutation,
// } from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditDepartmentPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useAdminQuery(id);
  const [updateAdmin] = useUpdateAdminMutation();
  console.log(data);

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      console.log(data);
      await updateAdmin({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name,
    imageURL: data?.imageURL,
    phoneNumber: data?.phoneNumber,
    role: data?.role,
    address: data?.address,
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
            link: "/super_admin/admin",
          },
        ]}
      />

      <ActionBar title="Update Admin"> </ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
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
              <FormTextArea name="address" label="Permanent address" rows={4} />
            </Col>
          </div>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartmentPage;
