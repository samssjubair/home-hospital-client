"use client"
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { USER_ROLE } from '@/constants/role';
import { sidebarItems } from '@/constants/sidebarItems';
import { getUserInfo } from '@/services/auth.service';

type MenuItem = Required<MenuProps>["items"][number];



const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {role} = getUserInfo() as any;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        width={200}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: ".5rem",
            padding: "10px 0px",
          }}
        >
          {collapsed ? "UCS" : "University of CS"}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    );
};

export default SideBar;