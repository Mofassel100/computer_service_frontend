"use client";
import loginImage from "../../assets/login-image.jpg";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/service/auth.service";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";

import Form from "../Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  //   console.log(isLoggedIn());
  // @ts-ignore
  const { role } = getUserInfo();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res, "accessToken");
      if (res?.accessToken) {
        if (role === "admin") router.push(`/${role}s`);
        if (role === "super_admin") router.push(`/${role}`);
        if (role === "user") router.push(`/${role}s`);

        message.success("User logged in successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
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
  );
}

export default LoginPage;
