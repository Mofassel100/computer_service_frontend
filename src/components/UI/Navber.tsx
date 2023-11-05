"use client";
import { useState } from "react";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Button, Col, Row, Drawer, Menu, message, Divider } from "antd";
import { getUserInfo, removeUserInfo } from "@/service/auth.service";
import { authKey } from "@/constant/localStorage";
import HeaderItems from "@/constant/HeaderItems";
import LoginModal from "../Login/LoginModal";
import { Typography } from "antd";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebounced } from "@/redux/hooks";
import { useAllServiceGetDBQuery } from "@/redux/api/serviceApi";
import SearchProducts from "./SeachTermItems";
import Image from "next/image";
import "./../UI/style/style.css";

const { Search } = Input;
const { Title } = Typography;

const NavBar: React.FC = () => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const searchHandler = (data: any) => {
    console.log("navbers", data);
  };

  // search setup
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data } = useAllServiceGetDBQuery({ ...query });
  const Services = data?.allServiceDB;
  // @ts-ignore
  const AllServicesData = Services?.data;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSeachFeild = (seach: any) => {
    if (!seach) {
      console.log("see", seach);
      return (
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "40px",
            width: "full",
            margin: "auto",
            maxHeight: "400px",
            zIndex: "2",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "6px",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Nothing is matches with your search keywords. Please try again!
            </p>
          </div>
        </div>
      );
    } else if (seach) {
      router.push(`/search-all-service/${seach}`);
      setSearchTerm("");
    }
  };

  // ------------------------
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const logOut = () => {
    removeUserInfo(authKey);
    message.loading("louout successfull");
    router.refresh();
    router.push("/");
  };

  const { role, email, id, imageURL, name } = getUserInfo() as any;
  return (
    <div>
      <LoginModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <nav>
        <div style={{ background: "white", alignItems: "center" }}>
          {/* large navber */}
          <Row
            justify={"center"}
            style={{ padding: "12px 2px" }}
            align={"middle"}
          >
            <Col
              style={{ textAlign: "center" }}
              xs={0}
              sm={0}
              md={5}
              lg={4}
              xl={4}
            >
              <Title
                level={2}
                style={{ display: "inline", paddingLeft: "4px" }}
              >
                <Button
                  type="link"
                  href="/"
                  className="textHover"
                  style={{ border: "none", fontSize: "28px" }}
                >
                  <span
                    style={{
                      color: "turquoise",
                      fontSize: "28px",
                    }}
                  >
                    IT S
                  </span>
                  ervice
                </Button>
              </Title>
            </Col>
            <Col
              style={{ textAlign: "center", paddingTop: "8px" }}
              xs={0}
              sm={0}
              md={11}
              lg={6}
              xl={6}
            >
              <Search
                placeholder=" Search any service"
                loading={false}
                enterButton
                onSearch={handleSeachFeild}
                onChange={handleSearch}
                value={searchTerm}
              />
              {/* ========== Searchfield ========== */}
              {searchTerm && (
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "40px",
                    width: "full",
                    margin: "auto",
                    maxHeight: "400px",
                    overflow: "auto",
                    zIndex: "2",
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "15px",
                  }}
                  // className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black"
                >
                  {AllServicesData?.length > 0 ? (
                    <>
                      {searchTerm &&
                        AllServicesData?.map((service: any) => (
                          <Link
                            style={{
                              maxWidth: "full",
                              borderRadius: "7px",
                            }}
                            key={service?.id}
                            href={`/service-detail/${service?.id}`}
                            onClick={() => setSearchTerm("")}
                          >
                            <SearchProducts service={service} />
                            {/* <SearchProducts item={item} /> */}
                          </Link>
                        ))}
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        padding: "10px",
                        backgroundColor: "white",
                      }}
                    >
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Nothing is matches with your search keywords. Please try
                        again!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Col>
            <Col
              style={{ textAlign: "center" }}
              xs={0}
              sm={0}
              md={0}
              lg={5}
              xl={5}
            >
              othiers
            </Col>
            <Col
              style={{ textAlign: "center" }}
              xs={0}
              sm={0}
              md={7}
              lg={8}
              xl={8}
              offset={1}
            >
              {role ? (
                <>
                  {" "}
                  <Button
                    title="my Accoutn"
                    size="large"
                    style={{
                      border: "none",
                      paddingRight: "3px",
                    }}
                    onClick={() => showModal()}
                  />
                  {role && role ? (
                    <Button
                      className="textHover"
                      type="link"
                      style={{ border: "none" }}
                      href={`/${role}/profile`}
                    >
                      {}
                      {imageURL ? (
                        <Image
                          alt="next/image"
                          title={name}
                          width={25}
                          height={25}
                          style={{
                            borderRadius: "20px",
                            padding: "none",
                            textAlign: "center",
                            margin: "none",
                            transform: "scale(1.5)",
                          }}
                          src={imageURL}
                        />
                      ) : (
                        <Link className="textHover" href={`/${role}/profile`}>
                          {" "}
                          <UserOutlined style={{ fontSize: "25px" }} />
                        </Link>
                      )}
                    </Button>
                  ) : (
                    <Link className="textHover" href={`/${role}/profile`}>
                      {" "}
                      <UserOutlined style={{ fontSize: "25px" }} />
                    </Link>
                  )}
                  <Button
                    className="transformss textHover"
                    style={{
                      border: "none",
                      color: "red",
                      margin: "0 3px",
                    }}
                    onClick={() => logOut()}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    style={{
                      border: "none",
                      color: "turquoise",
                    }}
                    className="textHover"
                    onClick={() => showModal()}
                  >
                    Sign In
                  </Button>
                  <Button
                    style={{
                      border: "none",
                      color: "turquoise",
                      margin: "0 6px",
                    }}
                    className="textHover"
                  >
                    Register
                  </Button>
                </>
              )}

              <Button
                title="shopping cart"
                size="large"
                style={{
                  border: "none",
                  padding: "3px 4px",
                  marginRight: "5px",
                }}
                className="textHover"
                icon={
                  <ShoppingOutlined
                    style={{ fontSize: "25px", color: "turquoise" }}
                  />
                }
                onClick={() => console.log()}
              />
            </Col>
          </Row>
          {/* small navber */}
          <Row
            style={{
              padding: "6px 0",
            }}
          >
            {" "}
            {/* menu Drawer */}
            <Col style={{ textAlign: "start" }} lg={0} md={0} sm={15} xs={15}>
              <Button
                style={{
                  border: "none",
                  marginLeft: "5px",
                  padding: "2px 3px",
                }}
                icon={<MenuOutlined style={{ fontSize: "25px" }} />}
                onClick={toggleDrawer}
              />
              <Title
                level={2}
                style={{ display: "inline", paddingLeft: "4px" }}
              >
                <Link style={{ textDecoration: "none" }} href={"/"}>
                  {" "}
                  <span
                    style={{
                      color: "turquoise",
                      fontSize: "28px",
                    }}
                  >
                    IT S
                  </span>
                  ervice
                </Link>
              </Title>
            </Col>
            {/* <Col style={{ textAlign: "center" }} lg={22} md={22} sm={0} xs={0}>
              <Menu
                subMenuCloseDelay={2}
                mode="horizontal"
                items={HeaderItems()}
              />
            </Col> */}
            <Col
              style={{
                alignItems: "",
                textAlign: "center",
              }}
              lg={0}
              md={0}
              sm={9}
              xs={9}
            >
              {role && role ? (
                <Button
                  title="My Account"
                  type="link"
                  href={`/${role}/profile`}
                  size="large"
                  style={{
                    border: "none",
                    paddingRight: "3px",
                  }}
                  className="textHover"
                >
                  {imageURL ? (
                    <Image
                      alt="next/image"
                      title={name}
                      width={25}
                      height={25}
                      style={{
                        borderRadius: "20px",
                        padding: "none",
                        textAlign: "center",
                        margin: "none",
                        transform: "scale(1.5)",
                      }}
                      src={imageURL}
                    />
                  ) : (
                    <Link className="textHover" href={`/${role}/profile`}>
                      {" "}
                      <UserOutlined style={{ fontSize: "25px" }} />
                    </Link>
                  )}
                </Button>
              ) : (
                <Button
                  title="My Account"
                  size="large"
                  style={{
                    border: "none",
                    paddingRight: "3px",
                  }}
                  className="textHover"
                  icon={<UserOutlined style={{ fontSize: "25px" }} />}
                  onClick={() => showModal()}
                />
              )}
              <Button
                title="Shopping Now"
                size="large"
                style={{
                  border: "none",
                  padding: "3px 4px",
                  margin: "0px 6px",
                }}
                className="textHover"
                icon={<ShoppingOutlined style={{ fontSize: "25px" }} />}
                onClick={() => console.log()}
              />
            </Col>
          </Row>
        </div>
      </nav>
      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisible}
      >
        <Divider orientation="right">
          <Button onClick={closeDrawer}>
            {" "}
            <CloseOutlined
              style={{
                color: "red",
                border: "none",
                fontSize: "30px",
                position: "sticky",
                top: "20px",
              }}
            />
          </Button>
        </Divider>
        <Row>
          <Col style={{ textAlign: "left" }} lg={0} md={0} sm={24} xs={24}>
            <Menu mode="inline" items={HeaderItems()} />
          </Col>
        </Row>
        <Button
          className="textHover"
          style={{
            border: "none",
            color: "red",
          }}
          onClick={() => logOut()}
        >
          Log Out
        </Button>
        <Button style={{ textAlign: "right" }} onClick={closeDrawer}>
          Cencel
        </Button>
      </Drawer>
    </div>
  );
};

export default NavBar;
