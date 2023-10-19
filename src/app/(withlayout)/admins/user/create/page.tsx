

"use client";


import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextAria";


import FormSelectField from "@/components/Forms/FormselectField";
import ITBreadCrump from "@/components/ui/ITBreadCrump";
import { RolesOptioneAdmin } from "@/constant/global";



import { useAddUserWithFormDataMutation } from "@/redux/api/userApi"
import { Button, Col,  Row, message } from "antd";

const CreateUserPage = () => {
  const [addUserWithFormData] = useAddUserWithFormDataMutation();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    message.loading("Creating...");
    try {
      const result = await addUserWithFormData(obj);
      if(!!result){

        message.success("User created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
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
            link: "/admins/user/all-user",
          },
        ]}
      />
      <h1 style={{textAlign:"center"}}>Create User</h1>

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
                required
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
                required
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
                required
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
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                  
                  
                  
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
                  label="Role"
                  placeholder="Select"
                  
                />
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
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUserPage;

