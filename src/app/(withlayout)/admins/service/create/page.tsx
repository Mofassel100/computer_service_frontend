"use client";
import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";
import FormSelectField from "@/components/Forms/FormselectField";
import ITBreadCrump from "@/components/UI/ITBreadCrump";

import { useCategorysQuery } from "@/redux/api/categoryApi";
import { useAddServiceWithFormDataMutation } from "@/redux/api/serviceApi";

import { getUserInfo } from "@/service/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateServicePage = () => {
  const [addServiceWithFormData] = useAddServiceWithFormDataMutation();
  const { id } = getUserInfo() as any;
  const onSubmit = async (values: any) => {
    const obj = { ...values };
    message.loading("Creating...");
    try {
      const result = await addServiceWithFormData(obj);
      if (!!result) {
        message.success("User created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const { data: catagorys, isLoading } = useCategorysQuery(id);
  const catagoryOptions = catagorys?.categorys?.map((category: any) => ({
    label: category?.title,
    value: category?.id,
  }));
  const catagoryOptionsTitl: any = catagorys?.categorys?.map(
    (category: any) => ({
      label: category?.title,
      value: category?.title,
    })
  );
  const CategoryOptionSelect: any = catagoryOptions?.map(
    (catagory) => catagory
  );

  const UserOptions = [
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
            label: "Service",
            link: "/admins/service/all-service",
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
            User Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="title"
                options={catagoryOptionsTitl}
                label="Service Title"
                placeholder="Select"
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
              <FormSelectField
                size="large"
                name="categoryId"
                options={CategoryOptionSelect}
                label="Category Id"
                placeholder="Select"
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
              <FormInput
                type="text"
                name="review"
                size="large"
                label="Review"
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
                name="rating"
                size="large"
                label="Rating"
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
                options={UserOptions}
                label="User Id"
                placeholder="Select"
              />
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
        </div>
        <Button htmlType="submit" type="primary">
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateServicePage;

// "use client";

// import Form from "@/components/Forms/Form";
// import FormDatePicker from "@/components/Forms/FormDatePicker";
// import FormInput from "@/components/Forms/FormInput";
// import FormTextArea from "@/components/Forms/FormTextAria";

// import FormSelectField from "@/components/Forms/FormselectField";
// // @ts-ignore
// import ITBreadCrump from "@/components/UI/ITBreadCrump/ITBreadCrump";
// import { RolesOptioneAdmin } from "@/constant/global";
// import { useAddCategoryWithFormDataMutation, useCategorysQuery } from "@/redux/api/categoryApi";

// import { useAddUserWithFormDataMutation } from "@/redux/api/userApi";
// import { getUserInfo } from "@/service/auth.service";
// import { Button, Col, Input, Row, message } from "antd";

// const CrateCategory = () => {
//   const [addCategoryWithFormData] = useAddCategoryWithFormDataMutation();

//   const onSubmit = async (values: any) => {
//     const obj = { ...values };
//     message.loading("Creating...");
//     try {
//       const result = await addCategoryWithFormData(obj);
//       if (!!result) {
//         message.success("User created successfully!");
//       }
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   };

//   const { id } = getUserInfo() as any;
//   const userIdOptions = [
//     {
//       label: "UserId",
//       value: id,
//     },
//   ];

//   return (
//     <div>
//       <ITBreadCrump
//         items={[
//           {
//             label: "admin",
//             link: "/admins",
//           },
//           {
//             label: "user",
//             link: "/admins/category/all-category",
//           },
//         ]}
//       />
//       <h1 style={{ textAlign: "center" }}>Create User</h1>

//       <Form submitHandler={onSubmit}>
//         <div
//           style={{
//             border: "1px solid #d9d9d9",
//             borderRadius: "5px",
//             padding: "15px",
//             marginBottom: "10px",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "18px",
//               marginBottom: "10px",
//             }}
//           >
//             Category Information
//           </p>
//           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//           <Col
//               className="gutter-row"
//               span={8}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <FormSelectField
//                 size="large"
//                 name="title"
//                 options={catagoryOptions}
//                 label="Service Title"
//                 placeholder="Select"
//               />
//             </Col>
//             <Col
//               className="gutter-row"
//               span={19}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <FormInput
//                 type="text"
//                 name="name"
//                 size="large"
//                 label="Service Name"
//                 required
//                 // @ts-ignore
//                 validation={Error.name && Error.name.message}
//               />
//             </Col>

//             <Col
//               className="gutter-row"
//               span={8}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <FormInput
//                 type="url"
//                 name="image"
//                 size="large"
//                 label="Image Url"
//               />
//             </Col>
//             <Col
//               className="gutter-row"
//               span={8}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <FormSelectField
//                 size="large"
//                 name="categoryId"
//                 options={catagoryOptions}
//                 label="Category Id"
//                 placeholder="Select"
//               />
//             </Col>
//             <Col
//               className="gutter-row"
//               span={8}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <FormSelectField
//                 size="large"
//                 name="userId"
//                 options={userIdOptions}
//                 label="User Id"
//                 placeholder="Select"
//               />
//             </Col>
//           </Row>
//         </div>
//         <Button htmlType="submit" type="primary">
//           Create Category
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default CrateCategory;
