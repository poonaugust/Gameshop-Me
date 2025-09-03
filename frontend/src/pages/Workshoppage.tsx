import { useState } from "react";
import { Card, Row, Col, Button, Typography, Modal, Form, Input, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Mod {
  id: number;
  title: string;
  author: string;
  downloads: number;
  rating: number;
  image: string;
}

const mockMods: Mod[] = [
  { id: 1, title: "Ultra Graphics Mod", author: "Modder123", downloads: 1200, rating: 4.8, image: "https://picsum.photos/400/250?random=1" },
  { id: 2, title: "New Weapons Pack", author: "GamerX", downloads: 950, rating: 4.5, image: "https://picsum.photos/400/250?random=2" },
  { id: 3, title: "Map Expansion", author: "AliceDev", downloads: 500, rating: 4.2, image: "https://picsum.photos/400/250?random=3" },
];

const GameDetailPage: React.FC = () => {
  const [mods, setMods] = useState(mockMods);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleUpload = (values: any) => {
    // จำลองการเพิ่มม็อดใหม่
    const newMod: Mod = {
      id: mods.length + 1,
      title: values.title,
      author: "CurrentUser",
      downloads: 0,
      rating: 0,
      image: values.image?.fileList[0]?.thumbUrl || "https://picsum.photos/400/250?random=99",
    };
    setMods([newMod, ...mods]);
    message.success("Mod uploaded successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Game Info */}
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={8}>
          <img src="https://picsum.photos/400/250?random=10" alt="Game Cover" style={{ width: "100%", borderRadius: 12 }} />
        </Col>
        <Col xs={24} md={16}>
          <Title level={2}>Awesome Game</Title>
          <Paragraph>
            This is a description of the game. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Here you can see the overview, system requirements, and details about the game.
          </Paragraph>
          <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />}>
            Upload Your Mod
          </Button>
        </Col>
      </Row>

      {/* Mods Grid */}
      <Title level={3} style={{ marginTop: 32 }}>Workshop Mods</Title>
      <Row gutter={[16, 16]}>
        {mods.map((mod) => (
          <Col xs={24} sm={12} md={8} key={mod.id}>
            <Card
              hoverable
              cover={<img alt={mod.title} src={mod.image} />}
            >
              <Title level={4}>{mod.title}</Title>
              <Text type="secondary">by {mod.author}</Text>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Text>⬇️ {mod.downloads}</Text> | <Text>⭐ {mod.rating}</Text>
              </div>
              <Button type="primary" block>Subscribe</Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upload Modal */}
      <Modal
        title="Upload Your Mod"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpload}>
          <Form.Item
            label="Mod Title"
            name="title"
            rules={[{ required: true, message: "Please enter mod title" }]}
          >
            <Input placeholder="Enter mod title" />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Upload Mod
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GameDetailPage;
