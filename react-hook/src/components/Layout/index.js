/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-05 09:44:45
 * @LastEditors: candice
 * @LastEditTime: 2020-08-05 10:55:34
 */
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import "./index.less"

const { Header, Sider, Content } = Layout;

const LayoutContainer = (props) => {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    const flag = collapsed
    setCollapsed(!flag)
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
            </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
            </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}


export default LayoutContainer