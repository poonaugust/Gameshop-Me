import { Typography, Card, Input, Button, Space } from "antd";
import Navbar from "../components/Navbar";
import { UploadOutlined, FileTextOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

interface WorkshopItem {
  id: string;
  title: string;
  items: number;
  image?: string;
}

// mock ข้อมูลเกมที่ user มี
const userGames: WorkshopItem[] = [
  { id: "1", title: "Counter Strike", items: 6 },
  { id: "2", title: "Half-Life", items: 3 },
];

const Workshop = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
  const game = userGames.find((g) => g.id === gameId);

  return (
    <div style={{ background: "#141414", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2} style={{ color: "white" }}>
          {game ? `Upload Mods for ${game.title}` : "Upload Game Mods"}
        </Title>

        {/* หัวข้อผลงาน */}
        <Card
          title={
            <span style={{ color: "white" }}>
              <FileTextOutlined /> Give your mods a title
            </span>
          }
          style={{
            background: "#1f1f1f",
            marginBottom: "24px",
            borderRadius: 8,
            borderColor: "#404040",
          }}
          headStyle={{ color: "white", borderBottomColor: "#404040" }}
        >
          <Input
            placeholder="Your mods title"
            style={{
              background: "#2d2d2d",
              color: "white",
              borderColor: "#595959",
            }}
          />
        </Card>

        {/* เลือกไฟล์ผลงาน */}
        <Card
          title={
            <span style={{ color: "white" }}>
              <UploadOutlined /> Select your mods file
            </span>
          }
          style={{
            background: "#1f1f1f",
            marginBottom: "24px",
            borderRadius: 8,
            borderColor: "#404040",
          }}
          headStyle={{ color: "white", borderBottomColor: "#404040" }}
        >
          <Space>
            <Button>เลือกไฟล์</Button>
            <Input
              value="ไม่ได้เลือกไฟล์ใด"
              readOnly
              style={{
                width: 250,
                background: "#2d2d2d",
                color: "white",
                borderColor: "#595959",
              }}
            />
          </Space>
        </Card>

        {/* description */}
        <Card
          title={
            <span style={{ color: "white" }}>
              <FileTextOutlined /> Add a description
            </span>
          }
          style={{
            background: "#1f1f1f",
            marginBottom: "24px",
            borderRadius: 8,
            borderColor: "#404040",
          }}
          headStyle={{ color: "white", borderBottomColor: "#404040" }}
        >
          <Input.TextArea
            rows={4}
            placeholder="Use this space to describe your mods or what was involved in making it."
            style={{
              background: "#2d2d2d",
              color: "white",
              borderColor: "#595959",
            }}
          />
        </Card>

        {/* ปุ่มอัปโหลด */}
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            size="large"
            style={{ background: "#9254de", borderColor: "#9254de" }}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
