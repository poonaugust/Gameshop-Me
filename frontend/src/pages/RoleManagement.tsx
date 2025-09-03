import React, { useState } from "react";
import {
  Button,
  Input,
  Table,
  Typography,
  Space,
  Card,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RoleManagement: React.FC = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    {
      key: "1",
      role: "Admin",
      members: 1,
      icon: <UserOutlined style={{ color: "#1890ff" }} />,
    },
    {
      key: "everyone",
      role: "@everyone",
      members: 0,
      icon: <UserOutlined style={{ color: "#52c41a" }} />,
    },
  ]);

  const columns = [
    {
      title: "บทบาท",
      dataIndex: "role",
      key: "role",
      render: (text: string, record: any) => (
        <Space>
          {record.icon}
          {text}
        </Space>
      ),
    },
    {
      title: "สมาชิก",
      dataIndex: "members",
      key: "members",
      render: (count: number) => (
        <Space>
          <UserOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            style={{ border: "none" }}
            onClick={() => navigate(`/roles/${record.key}`)}
          />
          <Button shape="circle" icon={<MoreOutlined />} style={{ border: "none" }} />
        </Space>
      ),
    },
  ];

  const handleAddRole = () => {
    const newRole = {
      key: Date.now().toString(),
      role: "ตำแหน่งใหม่",
      members: 0,
      icon: <UserOutlined style={{ color: "#faad14" }} />,
    };

    setRoles((prev) => {
      // ดึง everyone ออกมา
      const everyone = prev.find((r) => r.key === "everyone");
      const others = prev.filter((r) => r.key !== "everyone");

      // ใส่ role ใหม่ก่อน everyone
      return [...others, newRole, everyone!];
    });

    // 👉 หลัง setState เสร็จแล้ว ให้เด้งไป RoleEdit
    navigate(`/roles/${newRole.key}`);
  };

  return (
    <div style={{ background: "#141414", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "16px", maxWidth: "600px" }}>
        <Title level={3} style={{ color: "white" }}>
          บทบาท
        </Title>
        <Card
          style={{
            background: "#1f1f1f",
            color: "white",
            marginBottom: 16,
            borderRadius: 8,
          }}
        >
          <Space style={{ color: "white" }}>
            <UserOutlined />
            การอนุญาตตั้งต้น @everyone - มีผลกับสมาชิกทุกคนในเซิร์ฟเวอร์
          </Space>
        </Card>
        <Space style={{ marginBottom: 16 }}>
          <Input.Search placeholder="ค้นหาบทบาท" style={{ width: 430 }} />
          <Button type="primary" shape="round" onClick={handleAddRole}>
            สร้างบทบาทใหม่
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={roles}
          pagination={false}
          style={{
            background: "#1f1f1f",
            borderRadius: 8,
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default RoleManagement;
