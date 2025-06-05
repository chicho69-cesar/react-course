import PropTypes from 'prop-types'
import { Fragment } from 'react'

export const FirstApp = ({ title, subtitle, name }) => {
  return (
    <Fragment>
      <h1 data-testid="test-title">{title}</h1>
      <p>{subtitle}</p>
      <p>{name}</p>
    </Fragment>
  )
}

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  name: PropTypes.string
}
