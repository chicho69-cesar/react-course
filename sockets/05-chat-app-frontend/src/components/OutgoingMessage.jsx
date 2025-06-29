import { formatHour } from '../helpers/format-hour'

export function OutgoingMessage({ msg }) {
  return (
    <div className='outgoing_msg'>
      <div className='sent_msg'>
        <p>{msg.message}</p>
        <span className='time_date'> {formatHour(msg.created_at)} </span>
      </div>
    </div>
  )
}
