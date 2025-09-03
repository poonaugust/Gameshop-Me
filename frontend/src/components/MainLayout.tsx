// src/layouts/MainLayout.tsx (หรือ src/components/MainLayout.tsx)
import React from "react";
import { Layout, Menu, Typography } from "antd"; // เพิ่ม Typography, Menu
import {
  UserOutlined,
  SettingOutlined,
  ShopOutlined, // ตัวอย่าง icon อื่นๆ
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Section */}
      <Sider width={250} style={{ background: "#202020", padding: "16px" }}> {/* ปรับสีและ padding ให้เข้ากับธีม */}
        <div style={{ height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px" }} /> {/* โลโก้/พื้นที่ว่างด้านบน */}
        <Title level={3} style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
          GAME STORE
        </Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']} // '2' คือ Workshop
          style={{ background: "#202020" }} // สีพื้นหลังเมนู
          items={[
            {
              key: '1',
              icon: <SettingOutlined />,
              label: 'จัดการสิ่งของใช้งาน',
            },
            {
              key: '2',
              icon: <ShopOutlined />,
              label: 'Workshop',
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'บทบาท', // เพิ่มเมนูบทบาท
              // คุณอาจจะเพิ่ม onClick หรือ link ไปยังหน้า RoleManagement ที่นี่
            },
          ]}
        />
      </Sider>

      {/* Content Section */}
      <Layout style={{ background: "#141414" }}> {/* สีพื้นหลังโดยรวมของเนื้อหา */}
        <Content style={{ margin: "16px", background: "#141414" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;