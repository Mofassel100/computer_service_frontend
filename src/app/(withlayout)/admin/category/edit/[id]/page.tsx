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
  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      await updateCategory({ id, body: values });
      message.success("category updated successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const defaultValues = {
    name: data?.name,
    image: data?.image,
    title: data?.title,
    userId: data?.userId,
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
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
              label="Category title unique"
              required
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
              display: "grid",
            }}
          >
            <FormInput type="url" name="image" size="large" label="Image Url" />
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
              label="Category Name"
            />
          </Col>
        </Row>
        <Button style={{ backgroundColor: "turquoise" }} htmlType="submit">
          Update Category
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategory;
