import { DownloadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { useState } from 'react'

import { useSocket } from '../context/sockets/useSocket'
import { useHideMenu } from '../hooks/useHideMenu'

export function CreateTicket() {
  useHideMenu(true)
  const { socket } = useSocket()
  const [ticket, setTicket] = useState(null)

  const handleNewTicket = () => {
    socket.emit('request-ticket', null, (ticket) => {
      setTicket(ticket)
    })
  }

  return (
    <>
      <Row>
        <Col span={18} offset={6} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>
            Presione el botón para crear un nuevo ticket
          </Typography.Title>

          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={handleNewTicket}
          >
            Nuevo ticket
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align='center'>
            <Typography.Text level={2}>
              Su número
            </Typography.Text>

            <br />

            <Typography.Text type='success' style={{ fontSize: 55 }}>
              {ticket.number}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </>
  )
}
