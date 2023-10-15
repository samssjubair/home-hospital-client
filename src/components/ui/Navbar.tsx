"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Row,
  Col
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  FontColorsOutlined,
  PhoneOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../assets/logo/logos_white.png";
import Link from "next/link";
import {  isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storage";

const { Header } = Layout;



const ResponsiveNav = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [visible, setVisible] = useState(false);
  const router=useRouter();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/");
    window.location.reload();
  };

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: "0 24px" }}
        >
          <Col xs={16} sm={12} md={4} lg={8}>
            <Image src={logo} alt="logo" width={150} height={50} />
          </Col>
          <Col xs={8} sm={12} md={20} lg={16}>
            {" "}
            {/* Adjust column widths for responsiveness */}
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ justifyContent: "end" }}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link href="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link href="/upcoming">Upcoming</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>
                <Link href="/categories">Categories</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<FontColorsOutlined />}>
                <Link href="/about">About Us</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<PhoneOutlined />}>
                <Link href="/contact">Contacts</Link>
              </Menu.Item>
              {isClient && !isLoggedIn() && (
                <Menu.Item key="6">
                  <div>
                    <Button
                      type="primary"
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#00b4d8",
                      }}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                </Menu.Item>
              )}
              {isClient && isLoggedIn() && (
                <Menu.Item key="6">
                  <Button type="default" onClick={logOut}>
                    Logout
                  </Button>
                </Menu.Item>
              )}
            </Menu>
          </Col>
          <Col xs={0} sm={0} md={0} lg={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="right"
          onClick={onClose}
          onClose={onClose}
          visible={visible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link href="/upcoming">Upcoming</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              <Link href="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<FontColorsOutlined />}>
              <Link href="/about">About Us</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PhoneOutlined />}>
              <Link href="/contact">Contacts</Link>
            </Menu.Item>
            {1 && (
              <Menu.Item key="6">
                {isClient &&  !isLoggedIn() ? (
                  <div>
                    <Button
                      type="primary"
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#00b4d8",
                      }}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                ) : (
                  <Button type="default" onClick={logOut}>
                    Logout
                  </Button>
                )}
              </Menu.Item>
            )}
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default ResponsiveNav;