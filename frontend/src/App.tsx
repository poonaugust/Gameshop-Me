import { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RoleManagement from "./pages/RoleManagement";
import RoleEditor from "./pages/RoleEdit";
import Home from "./pages/Home";
import WorkshopMainPage from "./pages/WorhshopMain";
import LoginPage from "./pages/authentication/Login/index";
import RegisterPage from "./pages/authentication/Register/index"; // 👈 เพิ่มการ import RegisterPage
import YourGames from "./pages/YourGames";
import WorkshopDetail from "./pages/WorkshopDetail";
import Workshop from "./pages/Workshop";

const { Content } = Layout;

const App = () => {
  // เปลี่ยนค่าเริ่มต้นเป็น false เพื่อให้เริ่มที่หน้า Login
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/role-management" element={<RoleManagement />} />
                <Route path="/roles/:id" element={<RoleEditor />} />
                <Route path="/workshop" element={<WorkshopMainPage />} />
                <Route path="/workshop/:id" element={<WorkshopDetail />} />
                <Route path="/upload" element={<Workshop />} />
                <Route path="/your-games" element={<YourGames />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* 👈 เพิ่ม Route สำหรับหน้าลงทะเบียน */}
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
