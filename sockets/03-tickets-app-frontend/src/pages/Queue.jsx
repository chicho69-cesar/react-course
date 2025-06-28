import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { useSocket } from '../context/sockets/useSocket'
import { getLastTickets } from '../helpers/getLastTickets'
import { useHideMenu } from '../hooks/useHideMenu'

export function Queue() {
  useHideMenu(true)

  const { socket } = useSocket()
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getLastTickets()
      .then(setTickets)
  }, [])

  useEffect(() => {
    socket.on('last-tickets', (tickets) => {
      setTickets(tickets)
    })

    return () => {
      socket.off('last-tickets')
    }
  }, [socket])

  return (
    <>
      <Typography.Title level={1}>
        Atendiendo al cliente
      </Typography.Title>

      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color='volcano'>{item.agent} </Tag>,
                    <Tag color='magenta'>Escritorio: {item.desktop}</Tag>,
                  ]}
                >
                  <Typography.Title>No. {item.number}</Typography.Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider> Historial </Divider>

          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Typography.Text type='secondary'>En el escritorio: </Typography.Text>
                      <Tag color='magenta'>{item.desktop}</Tag>
                      <Typography.Text type='secondary'>Agente: </Typography.Text>
                      <Tag color='volcano'>{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
