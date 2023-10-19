"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import FormSelectField from "@/components/Forms/FormselectField";
import ActionBar from "@/components/ui/ActionBar";
import ITBreadCrump from "@/components/ui/ITBreadCrump";
import { RolesOptioneAdmin } from "@/constant/global";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditDepartmentPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  console.log(data);

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      console.log(data);
      await updateUser({ id, body: values });
      message.success("User updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };


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
            label: "admin",
            link: "/admin",
          },
          {
            label: "user",
            link: "/admins/user/all-user",
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
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              size="large"
              name="role"
              options={RolesOptioneAdmin}
              label="Blood group"
              placeholder="Select"
            />
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
