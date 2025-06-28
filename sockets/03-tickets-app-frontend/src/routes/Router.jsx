import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Navigate, Route, Routes, useNavigate } from 'react-router'

import { useUI } from '../context/ui/useUI'
import { CreateTicket } from '../pages/CreateTicket'
import { Desktop } from '../pages/Desktop'
import { Enter } from '../pages/Enter'
import { Queue } from '../pages/Queue'

const items = [
  { key: 'enter', icon: <UserOutlined />, label: 'Ingresar' },
  { key: 'queue', icon: <VideoCameraOutlined />, label: 'Cola de tickets' },
  { key: 'create-ticket', icon: <UploadOutlined />, label: 'Crear tickets' },
]

export function Router() {
  const { showMenu } = useUI()
  const navigate = useNavigate()

  return (
    <>
      <Layout style={{ minHeight: '100dvh' }}>
        <Layout.Sider
          collapsedWidth='0'
          breakpoint='md'
          hidden={showMenu}
        >
          <div className='logo' />

          <Menu
            defaultSelectedKeys={['queue']}
            mode='inline'
            theme='dark'
            items={items}
            onClick={(values) => navigate(`/${values.key}`)}
          />
        </Layout.Sider>

        <Layout className='site-layout'>
          <Layout.Content
            className='site-layout-background'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <Routes>
              <Route path='/enter' element={<Enter />} />
              <Route path='/queue' element={<Queue />} />
              <Route path='/create-ticket' element={<CreateTicket />} />
              <Route path='/desktop' element={<Desktop />} />

              <Route path='/*' element={<Navigate to='/enter' replace />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  )
}
