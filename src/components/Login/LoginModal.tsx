"use client";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/service/auth.service";
import { Button, Col, Modal, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import Link from "next/link";
type FormValues = {
  email: string;
  password: string;
};
const LoginModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
}: {
  isModalOpen: boolean;
  handleOk: any;
  handleCancel: any;
}) => {
  const { role } = getUserInfo() as any;
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  //   console.log(isLoggedIn());
  // @ts-ignore

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res, "0000accessToken");

      if (res?.accessToken) {
        if (role === "admin" || role === "user" || role === "super_admin") {
          router.push("/");
        }
      }
      router.refresh();
      handleOk();
      //   if (role === "admin") return router.push(`/${role}s`);
      //   if (role === "super_admin") return router.push(`/${role}/profile`);
      //   if (role === "user") return router.push(`/${role}s/profile`);
      storeUserInfo({ accessToken: res?.accessToken });
      console.log(res, "res");
      message.success("User logged in successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Modal title="Login Page" open={isModalOpen} onCancel={handleCancel}>
      <Row justify="center" align="middle">
        <Col sm={24} md={24} lg={24}>
          <h1
            style={{
              margin: "15px 0px",
            }}
          >
            Plase login your account
          </h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="User Email"
                  required
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="User Password"
                  required
                />
              </div>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form>
          </div>
          <div>
            {" "}
            Are New User please <Link href={"/registration"}></Link>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
