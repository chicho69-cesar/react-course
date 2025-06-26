import AddBand from '../components/AddBand'
import BandChart from '../components/BandChart'
import BandList from '../components/BandList'
import { useSocket } from '../context/useSocket'

export default function HomePage() {
  const { online } = useSocket()

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service Status:{' '}
          {online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </p>
      </div>

      <h1>
        Band Names
      </h1>

      <hr />

      <div className='row'>
        <div className='col'>
          <BandChart />
        </div>
      </div>

      <div className='row'>
        <div className='col-8'>
          <BandList />
        </div>

        <div className='col-4'>
          <AddBand />
        </div>
      </div>
    </div>
  )
}
