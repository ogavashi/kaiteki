import { memo, useCallback, useState } from 'react';
import { Button, Layout, Row, Typography, theme } from 'antd';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { BookOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { CustomMenu } from '../Menu';
import { ROUTES } from '@features/navigation';
import { useUserStore } from '@features/user';

const { Header, Sider, Content } = Layout;

export const MainLayout = memo(() => {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const { logout } = useUserStore((state) => state);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => setCollapsed((prev) => !prev), []);

  const { user } = useUserStore((state) => state);

  if (!user) {
    return <Navigate to={ROUTES.LOGIN.path} />;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ overflowY: 'auto' }}>
        <Row
          align='middle'
          style={{
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to={ROUTES.HOME.path}>
            <Typography.Title
              level={2}
              style={{
                color: 'white',
                fontWeight: 700,
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {!collapsed ? (
                <>
                  Kaiteki <BookOutlined />
                </>
              ) : (
                <BookOutlined />
              )}
            </Typography.Title>
          </Link>
        </Row>
        <CustomMenu />
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            paddingInline: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colorBgContainer,
          }}
        >
          <Button
            type='text'
            onClick={toggleCollapse}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Row align='middle' style={{ gap: 20 }}>
            <Typography.Text style={{ opacity: 0.65 }}>User</Typography.Text>
            <Button type='primary' danger onClick={logout}>
              Вийти
            </Button>
          </Row>
        </Header>
        <Content
          style={{
            padding: '1.5rem',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadius,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
});

MainLayout.displayName = 'AuthenticatedLayout';
