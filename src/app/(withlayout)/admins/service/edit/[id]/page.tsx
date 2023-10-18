"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import ActionBar from "@/components/UI/ActionBar/ActionBar";
import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";

import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditService = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useServiceQuery(id);
  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      console.log(data);
      await updateService({ id, body: values });
      message.success("Service updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name,
    image: data?.image,
    phoneNumber: data?.phoneNumber,
    description: data?.description,
    price: data?.price,
    oldPrice: data?.oldPrice,
    rating: data?.rating,
    review: data?.review,
    location: data?.location,
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
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
              label="Service Name"
            />
          </Col>

          <Col
            className="gutter-row"
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput type="url" name="image" size="large" label="Image Url" />
          </Col>
          <Col
            className="gutter-row"
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              type="text"
              name="price"
              size="large"
              label="Current Price"
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
              type="text"
              name="oldPrice"
              size="large"
              label="Old Price"
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
            span={10}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              type="text"
              name="location"
              size="large"
              label="Location"
            />
          </Col>
          <Col
            className="gutter-row"
            span={10}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput type="text" name="review" size="large" label="Review" />
          </Col>
          <Col
            className="gutter-row"
            span={10}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput type="text" name="rating" size="large" label="Rating" />
          </Col>

          <div style={{ justifyContent: "center" }}>
            <Col
              span={20}
              style={{ margin: "10px 0", justifyContent: "center" }}
            >
              <FormTextArea
                name="description"
                label="Description Service"
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
  );
};

export default EditService;
