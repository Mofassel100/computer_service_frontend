"use client";
import { useEffect, useReducer, useState } from "react";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingOutlined,
  CloseOutlined,
  AudioOutlined,
  SearchOutlined,
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
import { useSelector } from "react-redux";

const { Search } = Input;
const { Title } = Typography;

const NavBar: React.FC = () => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchResete, setSearchReset] = useState("");

  const [isSearchVisible, setIsSearchVisible] = useState("none");

  const handleSearchClick = (e: string) => {
    setIsSearchVisible(e);
  };
  const searchHandler = (data: any) => {};

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
  const Services: any = data?.allServiceDB;

  const AllServicesData = Services?.data;
  const handelReset = () => {
    setSearchTerm("");
  };
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
  // const { serviceData } = useSelector((state: any) => state.cart);
  const suffix = isSearchVisible ? (
    <CloseOutlined onClick={handelReset} />
  ) : (
    <SearchOutlined
    //  onClick={handleSearchClick}
    />
  );
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
  const { serviceData } = useSelector((state: any) => state?.cart);
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "full",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 3,
      }}
    >
      <LoginModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <nav>
        <div
          style={{ background: "white", alignItems: "center", width: "full" }}
        >
          {/* large navber */}
          <Row
            justify={"center"}
            style={{ padding: "12px 2px", width: "90%", margin: "auto" }}
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
              style={{ textAlign: "center", fontSize: "20px", margin: "auto" }}
              xs={0}
              sm={0}
              md={0}
              lg={5}
              xl={5}
            >
              <span style={{ color: "turquoise" }}>Conta</span>
              ct <span style={{ color: "turquoise" }}>H</span>elp 16222
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
                type="link"
                href="/cart"
                size="large"
                style={{
                  border: "none",
                  padding: "3px 0px",
                  marginRight: "5px",
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "bold",
                }}
                className="textHover"
                icon={
                  <ShoppingOutlined
                    style={{ fontSize: "35px", color: "turquoise" }}
                  ></ShoppingOutlined>
                }
                onClick={() => console.log()}
              >
                {" "}
                {serviceData?.length > 0 ? (
                  <sup
                    style={{
                      backgroundColor: "red",
                      position: "absolute",
                      padding: "0px 4px",
                      borderRadius: "50%",
                      height: "25px",
                      width: "25px",
                      top: "-2px",
                      textAlign: "center",
                      right: "0",
                    }}
                  >
                    {serviceData?.length > 0 ? serviceData?.length : ""}
                  </sup>
                ) : (
                  ""
                )}
              </Button>
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
                icon={<MenuOutlined style={{ fontSize: "0px 25px" }} />}
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
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    ervice
                  </span>
                </Link>
              </Title>
            </Col>
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
                  icon={<UserOutlined style={{ fontSize: "32px " }} />}
                  onClick={() => showModal()}
                />
              )}
              <Button
                title="Shopping Now"
                size="large"
                type="link"
                href="/cart"
                style={{
                  border: "none",
                  padding: "3px 0px",
                  margin: "0px 6px",
                  fontSize: "18px",
                  color: "white",
                }}
                className="textHover"
              >
                <ShoppingOutlined
                  style={{
                    fontSize: "32px ",
                    padding: "",
                    color: "turquoise",
                  }}
                >
                  {" "}
                </ShoppingOutlined>
                {serviceData?.length > 0 ? (
                  <sup
                    style={{
                      backgroundColor: "red",
                      backgroundPosition: "center center",
                      position: "absolute",
                      padding: "0px 4px",
                      borderRadius: "50%",
                      minHeight: "25px",
                      minWidth: "25px",
                      top: "-7px",
                      textAlign: "center",
                      right: "-10px",
                    }}
                  >
                    {serviceData?.length > 0 ? serviceData.length : ""}
                  </sup>
                ) : (
                  ""
                )}
              </Button>
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
      <Col
        style={{ textAlign: "center", paddingTop: "8px" }}
        xs={24}
        span={24}
        sm={24}
        md={0}
        lg={0}
        xl={0}
      >
        <Search
          style={{
            maxWidth: "70vw",
          }}
          onPressEnter={handelReset}
          placeholder=" Search any service"
          loading={false}
          width={"70vw"}
          suffix={suffix}
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
              right: "0",
              top: "42px",
              width: "full",
              maxHeight: "300px",
              overflow: "auto",
              zIndex: "2",
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "15px",
            }}
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
    </div>
  );
};

export default NavBar;
