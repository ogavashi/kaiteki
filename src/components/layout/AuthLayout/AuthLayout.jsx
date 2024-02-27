import { memo } from 'react';
import { Layout, Row, Typography } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';
import { useUserStore } from '@features/user';
import { ROUTES } from '@features/navigation';

export const AuthLayout = memo(() => {
  const { Header, Content, Footer } = Layout;

  const { user } = useUserStore((state) => state);

  if (user) {
    return <Navigate to={ROUTES.HOME.path} />;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Row
          align='middle'
          style={{
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography.Title level={2} style={{ color: 'white', fontWeight: 700, margin: 0 }}>
            Kaiteki <BookOutlined />
          </Typography.Title>
        </Row>
      </Header>
      <Content
        className='site-layout'
        style={{
          padding: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        OG ©2024
      </Footer>
    </Layout>
  );
});

AuthLayout.displayName = 'AuthLayout';
