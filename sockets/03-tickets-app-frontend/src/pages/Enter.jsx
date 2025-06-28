import { SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

import { getStorageUser } from '../helpers/getStorageUser'
import { useHideMenu } from '../hooks/useHideMenu'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
}

export function Enter() {
  useHideMenu(false)

  const navigate = useNavigate()
  const [user] = useState(getStorageUser())

  const handleFinish = ({ agent, desktop }) => {
    localStorage.setItem('tickets_data', JSON.stringify({ agent, desktop }))
    navigate('/desktop', { replace: true })
  }

  const handleFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo)
  }

  if (user.agent && user.desktop) {
    return <Navigate to='/desktop' replace />
  }

  return (
    <>
      <Typography.Title level={2}>Ingresar</Typography.Title>
      <Typography.Text>Ingrese su nombre y número de escritorio</Typography.Text>

      <Divider />

      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item
          label='Nombre del agente'
          name='agent'
          rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Escritorio'
          name='desktop'
          rules={[{ required: true, message: 'Ingrese el número de escritorio' }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type='primary'
            htmlType='submit'
            shape='round'
          >
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
