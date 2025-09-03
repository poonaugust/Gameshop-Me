import { Layout, Menu } from 'antd';
import { AppstoreOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider theme="dark" width={220}>
      <div style={{ color: '#9254de', fontSize: 20, textAlign: 'center', padding: '16px 0' }}>
        GAME STORE
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          {/* แก้ไขให้ Link ไปที่หน้าเริ่มต้น "/" */}
          <Link to="/">Store</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <Link to="/role-management">จัดการสิทธิผู้ใช้งาน</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ToolOutlined />}>
          <Link to="/workshop">Workshop</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;