import reactLogo from '../logo.svg'

export default function Logo() {
  return (
    <img src={reactLogo}
      alt='React Logo'
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '130px'
      }}
    />
  )
}
