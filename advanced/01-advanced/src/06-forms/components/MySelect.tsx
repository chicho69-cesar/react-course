/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, useField } from 'formik'

interface Props {
  label: string
  name: string
  placeholder?: string
  [key: string]: any
}

export default function MySelect({ label, ...props }: Props) {
  const [field] = useField(props)
  
  return (
    <>
      <label htmlFor={props.id || props.name}>
        {label}
      </label>

      <select {...field} {...props} />

      <ErrorMessage name={props.name} component='span' />
    </>
  )
}
