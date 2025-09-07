import React, { useMemo, useState } from "react";
import {
  Typography,
  Input,
  Tabs,
  Button,
  Row,
  Col,
  Modal,
  List,
  Checkbox,
  Space,
  Popconfirm,
  message,
  Empty,
} from "antd";
import { ArrowLeftOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type Role = { id: string; name: string; color: string; description: string };
type Member = { id: number; name: string; tag: string };

const RoleEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---- Mock roles ----
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Admin", color: "#1890ff", description: "ผู้ดูแลระบบทั้งหมด" },
    { id: "2", name: "Customer", color: "#52c41a", description: "ลูกค้าทั่วไป" },
  ]);

  // ---- Active role ----
  const [activeRoleId, setActiveRoleId] = useState(id ?? "1");
  const currentRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  // ---- Editable fields (name lock) ----
  const [roleName, setRoleName] = useState(currentRole.name);
  const [roleDescription, setRoleDescription] = useState(currentRole.description);
  const [color, setColor] = useState(currentRole.color);
  const [activeTab, setActiveTab] = useState("display");

  // ---- Modal + selection ----
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");

  // ---- Mock members directory ----
  const allMembers: Member[] = [
    { id: 1, name: "User_A", tag: "user_a#1234" },
    { id: 2, name: "User_B", tag: "user_b#5678" },
    { id: 3, name: "User_C", tag: "user_c#9101" },
    { id: 4, name: "User_D", tag: "user_d#1121" },
    { id: 5, name: "User_E", tag: "user_e#3141" },
  ];

  // ---- Role -> member ids (ready to sync with API later) ----
  const [roleMembers, setRoleMembers] = useState<Record<string, number[]>>({
    "1": [1, 2], // ตัวอย่าง: Admin มีสมาชิก 2 คน
    "2": [],     // Customer ยังไม่มี
  });

  const currentMemberIds = roleMembers[activeRoleId] || [];
  const currentMembers: Member[] = useMemo(
    () => allMembers.filter((m) => currentMemberIds.includes(m.id)),
    [allMembers, currentMemberIds]
  );

  // ---- Filter for modal & inline search ----
  const filteredMembers = useMemo(
    () =>
      allMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(searchText.toLowerCase()) ||
          m.tag.toLowerCase().includes(searchText.toLowerCase())
      ),
    [allMembers, searchText]
  );

  const colorPalette = [
    "#1890ff", "#52c41a", "#13c2c2", "#722ed1", "#eb2f96",
    "#fa8c16", "#f5222d", "#a0a0a0", "#ffec3d", "#2f54eb",
  ];

  // ---- Handlers ----
  const showModal = () => {
    setIsModalVisible(true);
    setSelectedMembers([]); // reset selection
    setSearchText("");
  };

  const handleOk = () => {
    // Merge selected into roleMembers for this role (no duplicates)
    setRoleMembers((prev) => {
      const existing = new Set(prev[activeRoleId] || []);
      selectedMembers.forEach((id) => existing.add(id));
      return { ...prev, [activeRoleId]: Array.from(existing) };
    });
    setIsModalVisible(false);
    setSelectedMembers([]);
    message.success("เพิ่มสมาชิกเข้าบทบาทแล้ว");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedMembers([]);
  };

  const handleCheckboxChange = (memberId: number) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const removeMemberFromRole = (memberId: number) => {
    setRoleMembers((prev) => ({
      ...prev,
      [activeRoleId]: (prev[activeRoleId] || []).filter((id) => id !== memberId),
    }));
    message.success("ลบสมาชิกออกจากบทบาทแล้ว");
  };

  const updateRole = () => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === activeRoleId ? { ...r, color, description: roleDescription } : r
      )
    );
    message.success("บันทึกการแก้ไขบทบาทแล้ว");
  };

  // เมื่อคลิกเปลี่ยน role ในเมนูซ้าย ให้ sync fields
  const handleSelectRole = (role: Role) => {
    setActiveRoleId(role.id);
    setRoleName(role.name);
    setColor(role.color);
    setRoleDescription(role.description);
  };

  return (
    <div style={{ background: "#141414", minHeight: "100vh", display: "flex" }}>
      {/* Role List */}
      <div
        style={{
          width: 220,
          padding: 12,
          borderRight: "1px solid #333",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Button
            type="text"
            size="small"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ color: "white" }}
          >
            ย้อนกลับ
          </Button>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {roles.map((role) => {
            const isActive = role.id === activeRoleId;
            const count = (roleMembers[role.id] || []).length;
            return (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  marginBottom: 4,
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "white",
                  background: isActive ? "#2f3136" : "transparent",
                  borderLeft: isActive ? `4px solid ${role.color}` : "4px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: role.color }}>●</span>
                  <span>{role.name}</span>
                </div>
                <span style={{ color: "#9aa3b2", fontSize: 12 }}>
                  <UserOutlined style={{ marginRight: 6 }} />
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          padding: "16px 32px",
          boxSizing: "border-box",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            marginBottom: 16,
            alignItems: "center",
            gap: 16,
            flexShrink: 0,
          }}
        >
          <Title level={4} style={{ color: "white", margin: 0 }}>
            แก้ไขบทบาท – {roleName.toUpperCase()}
          </Title>
          <Button
            type="primary"
            onClick={updateRole}
            style={{ marginLeft: "auto", padding: "0 16px", height: 36 }}
          >
            บันทึก
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: "display", label: <Text style={{ color: "white" }}>การแสดงผล</Text> },
            { key: "members", label: <Text style={{ color: "white" }}>จัดการสมาชิก</Text> },
          ]}
          style={{ flexShrink: 0 }}
        />

        {/* Tab Content Scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: 16,
            paddingRight: 8,
            scrollbarWidth: "thin",
            scrollbarColor: "#555 #2f3136",
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar { width: 8px; }
              div::-webkit-scrollbar-track { background: #2f3136; }
              div::-webkit-scrollbar-thumb { background-color: #555; border-radius: 4px; }
            `}
          </style>

          {/* Display Tab */}
          {activeTab === "display" && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ color: "white" }}>ชื่อตำแหน่ง</Text>
                <Input
                  value={roleName}
                  disabled
                  style={{
                    marginTop: 8,
                    background: "#2f3136",
                    color: "#aaa",
                    border: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <Text style={{ color: "white" }}>คำอธิบายตำแหน่ง</Text>
                <Input.TextArea
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  rows={3}
                  style={{
                    marginTop: 8,
                    background: "#2f3136",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              <div>
                <Text style={{ color: "white" }}>สี ตำแหน่ง</Text>
                <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                  {colorPalette.map((c) => (
                    <Col key={c}>
                      <div
                        onClick={() => setColor(c)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          cursor: "pointer",
                          background: c,
                          border: color === c ? "2px solid white" : "2px solid transparent",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  gap: 12,
                }}
              >
                <Input
                  placeholder="ค้นหาสมาชิก"
                  style={{ width: "70%", background: "white", color: "black" }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <Button type="primary" onClick={showModal}>
                  เพิ่มสมาชิก
                </Button>
              </div>

              {currentMembers.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#aaa",
                  }}
                >
                  <Empty
                    description={
                      <span style={{ color: "#c9d1d9" }}>
                        ไม่พบสมาชิกในบทบาทนี้{" "}
                        <a style={{ color: "#1890ff" }} onClick={showModal}>
                          เพิ่มสมาชิก
                        </a>
                      </span>
                    }
                  />
                </div>
              ) : (
                <List
                  dataSource={currentMembers.filter(
                    (m) =>
                      m.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      m.tag.toLowerCase().includes(searchText.toLowerCase())
                  )}
                  renderItem={(member) => (
                    <List.Item
                      key={member.id}
                      style={{
                        background: "#1f2328",
                        borderRadius: 8,
                        marginBottom: 8,
                        padding: "12px 16px",
                        border: "1px solid #2f3136",
                      }}
                      actions={[
                        <Popconfirm
                          key="remove"
                          title="ลบสมาชิกออกจากบทบาทนี้?"
                          okText="ลบ"
                          cancelText="ยกเลิก"
                          onConfirm={() => removeMemberFromRole(member.id)}
                        >
                          <Button type="text" danger icon={<DeleteOutlined />}>
                            ลบ
                          </Button>
                        </Popconfirm>,
                      ]}
                    >
                      <Space direction="vertical" size={0}>
                        <Text style={{ color: "white", fontWeight: 500 }}>{member.name}</Text>
                        <Text style={{ color: "#9aa3b2" }}>{member.tag}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add members */}
      <Modal
        title={<span style={{ color: "black" }}>เพิ่มสมาชิก</span>}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="เพิ่ม"
        cancelText="ยกเลิก"
      >
        <Input.Search
          placeholder="ค้นหาสมาชิก"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <List
            dataSource={filteredMembers}
            renderItem={(member) => {
              const checked = selectedMembers.includes(member.id);
              const alreadyInRole = currentMemberIds.includes(member.id);
              return (
                <List.Item
                  key={member.id}
                  style={{
                    backgroundColor: checked ? "#f0f0f0" : "transparent",
                    borderRadius: 4,
                    cursor: "pointer",
                    opacity: alreadyInRole ? 0.65 : 1,
                  }}
                  onClick={() => handleCheckboxChange(member.id)}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => handleCheckboxChange(member.id)}
                    style={{ marginRight: 8 }}
                  />
                  <span>{member.name}</span>
                  <span style={{ marginLeft: 8, color: "#888" }}>{member.tag}</span>
                  {alreadyInRole && (
                    <span style={{ marginLeft: "auto", color: "#999", fontSize: 12 }}>
                      อยู่ในบทบาทนี้แล้ว
                    </span>
                  )}
                </List.Item>
              );
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RoleEdit;
