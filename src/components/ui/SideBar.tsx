"use client"
import { ConfigProvider, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

    const [collapsed, setCollapsed] = useState(false);
    const userInfo = getUserInfo() as any;
    return (
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              
            },
            
          },
        }}
      >
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
          {isClient &&
            <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems(userInfo?.role)}
          />}
        </Sider>
      </ConfigProvider>
    );
};

export default SideBar;