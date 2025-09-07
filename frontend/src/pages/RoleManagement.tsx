import React, { useState } from "react";
import {
  Button,
  Table,
  Typography,
  Space,
  message,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
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
      key: "2",
      role: "User",
      members: 2,
      icon: <UserOutlined style={{ color: "#52c41a" }} />,
    },
  ]);

  const handleDeleteRole = (key: string) => {
    setRoles((prev) => prev.filter((r) => r.key !== key));
    message.success("ลบบทบาทเรียบร้อยแล้ว");
  };

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
      key: "edit",
      render: (_: any, record: any) => (
        <Button
          shape="circle"
          icon={<EditOutlined />}
          style={{ border: "none" }}
          onClick={() => navigate(`/roles/${record.key}`)}
        />
      ),
    },
  ];

  return (
    <div style={{ background: "#141414", minHeight: "100vh", padding: "16px" }}>
      <Title level={3} style={{ color: "white", marginBottom: 24 }}>
        บทบาท
      </Title>

      <Table
        columns={columns}
        dataSource={roles}
        pagination={false}
        style={{
          background: "transparent",
        }}
        rowClassName={() => "custom-row"}
      />
    </div>
  );
};

export default RoleManagement;
