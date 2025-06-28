import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

import { useSocket } from '../context/sockets/useSocket'
import { getStorageUser } from '../helpers/getStorageUser'
import { useHideMenu } from '../hooks/useHideMenu'

export function Desktop() {
  useHideMenu(false)

  const navigate = useNavigate()
  const { socket } = useSocket()
  const [user] = useState(getStorageUser())
  const [ticket, setTicket] = useState(null)

  const handleLeave = () => {
    localStorage.removeItem('tickets_data')
    navigate('/enter', { replace: true })
  }

  const handleNextTicket = () => {
    socket.emit('next-ticket', user, (ticket) => {
      setTicket(ticket)
    })
  }

  if (!user.agent || !user.desktop) {
    return <Navigate to='/enter' replace />
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Typography.Title level={2}>{user.agent}</Typography.Title>
          <Typography.Text>Usted está trabajando en el escritorio: </Typography.Text>
          <Typography.Text type='success'> {user.desktop} </Typography.Text>
        </Col>

        <Col span={4} align='right'>
          <Button
            shape='round'
            type='danger'
            onClick={handleLeave}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Typography.Text>
              Esta atendiendo el ticket número:
            </Typography.Text>

            <Typography.Text
              style={{ fontSize: 30 }}
              type='danger'
            >
              {ticket.number}
            </Typography.Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align='right'>
          <Button
            onClick={handleNextTicket}
            shape='round'
            type='primary'
          >
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}
