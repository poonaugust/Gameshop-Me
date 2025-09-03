import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Input,
  Row,
  Col,
  Card,
  Select,
  List,
  Button,
  message,
} from "antd";
import { PictureOutlined } from "@ant-design/icons";

const { Content, Sider, Header } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

interface WorkshopItem {
  id: string;
  title: string;
  items: number;
  image?: string;
}

const WorkshopDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workshop = location.state as WorkshopItem; // 👈 รับ object ตรงนี้

  // mock data (ในอนาคตอาจจะโหลดจาก API)
  const mods = [
    { id: "m1", title: "Weapons Course", author: "Asmisint" },
    { id: "m2", title: "CS:CTF Double Cross", author: "CS:CTF" },
    { id: "m3", title: "CS:CTF 2Fort", author: "CS:CTF" },
    { id: "m4", title: "Mocha", author: "Bevster" },
    { id: "m5", title: "CS:CTF Turbine", author: "CS:CTF" },
    { id: "m6", title: "1v1_the_desert_pit", author: "MMArezech_" },
  ];

  // mock: เกมที่ user มีจริง ๆ (ควรมา backend / auth)
  const userGames = ["1", "3", "6"];

  const handleUpload = () => {
    if (userGames.includes(workshop.id)) {
      navigate(`/upload?gameId=${workshop.id}`);
    } else {
      message.error("คุณไม่มีเกมนี้ ไม่สามารถอัปโหลดม็อดได้");
    }
  };

  return (
    <Layout style={{ background: "#0f1419", minHeight: "100vh" }}>
      {/* Header Banner */}
      <Header
        style={{
          background: "#1f1f1f",
          padding: 0,
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {workshop.image ? (
          <img
            src={workshop.image}
            alt={workshop.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "90%",
              height: "100%",
              background: "#2a2a2a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#888",
              fontSize: 20,
            }}
          >
            <PictureOutlined style={{ fontSize: 40, marginRight: 10 }} />
            Banner for {workshop.title}
          </div>
        )}
      </Header>

      <Layout>
        {/* Content */}
        <Content style={{ padding: "20px" }}>
          <Title level={3} style={{ color: "white" }}>
            {workshop.title} – {workshop.items} items
          </Title>
          <Text style={{ color: "#aaa" }}>
            Showing 1–6 of {mods.length} entries
          </Text>

          {/* Filter / Sort / Search */}
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Select defaultValue="Most Popular" style={{ width: 150 }}>
              <Select.Option value="popular">Most Popular</Select.Option>
              <Select.Option value="latest">Latest</Select.Option>
            </Select>
            <Select defaultValue="One Week" style={{ width: 150 }}>
              <Select.Option value="week">One Week</Select.Option>
              <Select.Option value="month">One Month</Select.Option>
            </Select>
            <Search
              placeholder="Search mods..."
              allowClear
              style={{ maxWidth: 250 }}
            />
          </div>

          {/* Grid Mods */}
          <Row gutter={[16, 16]}>
            {mods.map((mod) => (
              <Col xs={24} sm={12} md={8} lg={6} key={mod.id}>
                <Card
                  hoverable
                  style={{ background: "#1f1f1f", borderRadius: 8 }}
                  cover={
                    <div
                      style={{
                        height: 120,
                        background: "#2a2a2a",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#888",
                        fontSize: 24,
                      }}
                    >
                      <PictureOutlined />
                    </div>
                  }
                >
                  <Text style={{ color: "white" }}>{mod.title}</Text>
                  <br />
                  <Text type="secondary" style={{ color: "#aaa" }}>
                    by {mod.author}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Upload Button */}
          <div style={{ marginTop: 30 }}>
            <Button type="primary" onClick={handleUpload}>
              Upload Mod
            </Button>
          </div>
        </Content>

        {/* Sidebar */}
        <Sider
          width={220}
          style={{
            background: "#141414",
            padding: "20px",
            borderLeft: "1px solid #2a2a2a",
          }}
        >
          <h3 style={{ color: "white" }}>SHOW:</h3>
          <List
            dataSource={[
              { name: "All", path: "#" },
              { name: "Your Favorites", path: "#" },
            ]}
            renderItem={(item) => (
              <List.Item
                style={{
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                  padding: "8px 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.color = "#40a9ff"))
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget.style.color = "white"))
                }
              >
                {item.name}
              </List.Item>
            )}
          />

          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={handleUpload}
          >
            Upload Mod
          </Button>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default WorkshopDetail;
