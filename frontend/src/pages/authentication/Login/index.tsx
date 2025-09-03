import React from "react";
import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Typography,
  Layout,
  Row,
  Col,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // 👈 เพิ่มการ import useNavigate

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  
  const navigate = useNavigate(); // 👈 สร้าง instance ของ useNavigate

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: 'linear-gradient(90deg, #9254de 0%, #f759ab 100%)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content>
        <Card
          style={{
            width: 500,
            background: "#121a22",
            border: "1px solid #1f2a37",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
            padding: 24,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2} style={{ color: '#9254de', marginBottom: 0 }}>
              <span style={{ verticalAlign: "middle" }}>GAME STORE</span>
            </Title>
          </div>

          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Text
              strong
              style={{ color: "#66c0f4", display: "block", marginBottom: 8 }}
            >
              SIGN IN WITH ACCOUNT NAME
            </Text>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Account Name"
                style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
              />
            </Form.Item>

            <Text
              strong
              style={{ color: "#66c0f4", display: "block", marginBottom: 8 }}
            >
              PASSWORD
            </Text>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#8c98a5" }}>Remember me?</Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  marginTop: 24,
                  height: 48,
                  fontSize: 18,
                  background: 'linear-gradient(90deg, #9254de 0%, #f759ab 100%)',
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
                }}
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>

          <Row justify="space-between" style={{ marginTop: 16 }}>
            <Col>
              <Text style={{ color: "#8c98a5" }}>
                Don't have an account?
              </Text>{" "}
              <Link 
                onClick={() => navigate("/register")} // 👈 เพิ่ม onClick event
                style={{ color: "#66c0f4" }}
              >
                Sign up now
              </Link>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
