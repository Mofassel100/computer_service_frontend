"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/UI/ActionBar";
import ITBreadCrump from "@/components/UI/ITBreadCrump";

import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const UpdateCategory = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();
  console.log(data);

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      console.log(data);
      await updateCategory({ id, body: values });
      message.success("User updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name,
    image: data?.image,
    title: data?.title,
    userId: data?.userId,
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
            label: "category",
            link: "/admin/category/allcategory",
          },
        ]}
      />

      <ActionBar title="Update Category"> </ActionBar>
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
              name="title"
              size="large"
              label="Category title unique"
              required
            />
          </Col>

          <Col
            className="gutter-row"
            span={18}
            style={{
              marginBottom: "10px",
              display: "grid",
            }}
          >
            <FormInput type="url" name="image" size="large" label="Image Url" />
          </Col>

          <Col
            className="gutter-row"
            span={16}
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
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategory;
