import React from "react";
import { Card, Row, Col, Input, Typography } from "antd";

const { Title } = Typography;
const { Search } = Input;

const games = [
  {
    id: 1,
    name: "Game A",
    image: "", // ยังไม่มีภาพจริง
  },
  {
    id: 2,
    name: "Game B",
    image: "",
  },
  {
    id: 3,
    name: "Game C",
    image: "",
  },
];

const YourGames: React.FC = () => {
  return (
    <div style={{ padding: "20px", background: "#141414", minHeight: "100vh" }}>
      <Title level={3} style={{ color: "white" }}>
        🎮 Your Games
      </Title>

      {/* Search bar */}
      <div style={{ marginBottom: "16px" }}>
        <Search
          placeholder="ค้นหาเกมของคุณ..."
          enterButton
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Game Grid */}
      <Row gutter={[16, 16]}>
        {games.map((game) => (
          <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                background: "#1f1f1f",
                borderRadius: 8,
                textAlign: "center",
              }}
              cover={
                game.image ? (
                  <img
                    alt={game.name}
                    src={game.image}
                    style={{ height: "140px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "140px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#2a2a2a",
                      color: "#888",
                      fontSize: "14px",
                    }}
                  >
                    ไม่มีภาพเกม
                  </div>
                )
              }
            >
              <Card.Meta title={game.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default YourGames;
