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
  DatePicker,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // เพิ่มการ import useNavigate

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // สร้าง instance ของ useNavigate

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // You can add your registration logic here
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #9254de 0%, #f759ab 100%)",
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
            <Title level={2} style={{ color: "#9254de", marginBottom: 0 }}>
              <span style={{ verticalAlign: "middle" }}>REGISTER ACCOUNT</span>
            </Title>
          </div>

          <Form
            form={form}
            name="register_form"
            onFinish={onFinish}
            layout="vertical"
          >
            {/* Username */}
            <Form.Item
              name="username"
              label={<Text strong style={{ color: "#66c0f4" }}>USERNAME</Text>}
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label={<Text strong style={{ color: "#66c0f4" }}>EMAIL</Text>}
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "The input is not a valid E-mail!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                {/* Firstname */}
                <Form.Item
                  name="firstname"
                  label={<Text strong style={{ color: "#66c0f4" }}>FIRSTNAME</Text>}
                  rules={[
                    { required: true, message: "Please input your Firstname!" },
                  ]}
                >
                  <Input
                    placeholder="Firstname"
                    style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* Lastname */}
                <Form.Item
                  name="lastname"
                  label={<Text strong style={{ color: "#66c0f4" }}>LASTNAME</Text>}
                  rules={[
                    { required: true, message: "Please input your Lastname!" },
                  ]}
                >
                  <Input
                    placeholder="Lastname"
                    style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                {/* Password */}
                <Form.Item
                  name="password"
                  label={<Text strong style={{ color: "#66c0f4" }}>PASSWORD</Text>}
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* Confirmed Password */}
                <Form.Item
                  name="confirm"
                  label={<Text strong style={{ color: "#66c0f4" }}>CONFIRM PASSWORD</Text>}
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords that you entered do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                    style={{ background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Birthday */}
            <Form.Item
              name="birthday"
              label={<Text strong style={{ color: "#66c0f4" }}>BIRTHDAY</Text>}
              rules={[
                { required: true, message: "Please input your Birthday!" },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: "100%", background: "#26303d", borderColor: "#304153", color: "#c6d4df" }}
                allowClear
                suffixIcon={<CalendarOutlined style={{ color: "#8c98a5" }} />}
                inputReadOnly
                placeholder="Select Date"
              />
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
                  background: "linear-gradient(90deg, #9254de 0%, #f759ab 100%)",
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
                }}
              >
                REGISTER
              </Button>
            </Form.Item>
          </Form>

          <Row justify="center" style={{ marginTop: 16 }}>
            <Col>
              <Text style={{ color: "#8c98a5" }}>Already have an account?</Text>{" "}
              <Link 
                onClick={() => navigate("/")} // เพิ่ม onClick เพื่อนำทางกลับไปหน้า Login
                style={{ color: "#66c0f4" }}
              >
                Sign in
              </Link>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegisterPage;
