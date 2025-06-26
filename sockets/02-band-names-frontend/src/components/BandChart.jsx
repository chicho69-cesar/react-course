import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useEffect } from 'react'
import { useSocket } from '../context/useSocket'
import { useRef } from 'react'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

export default function BandChart() {
  const { socket } = useSocket()
  const chartRef = useRef(null)

  useEffect(() => {
    if (!socket) return

    socket.on('current-bands', (bands) => {
      createGraph(bands)
    })

    return () => {
      socket.off('current-bands')

      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [socket])

  const createGraph = (bands = []) => {
    const context = document.getElementById('myChart')

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(context, {
      type: 'bar',
      data: {
        labels: bands.map((band) => band.name),
        datasets: [{
          label: '# of Votes',
          data: bands.map((band) => band.votes),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        animation: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  return (
    <canvas id='myChart'></canvas>
  )
}
