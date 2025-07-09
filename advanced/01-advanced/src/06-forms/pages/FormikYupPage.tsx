import '../styles/styles.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  firstName: string
  lastName: string
  email: string
}

export default function FormikYupPage() {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit: (values) => {
      console.log('Form submitted', { values })
    },
    validationSchema: Yup
      .object({
        firstName: Yup
          .string()
          .max(15, 'Debe ser menor a 15 caracteres')
          .required('Campo requerido'),
        lastName: Yup
          .string()
          .max(15, 'Debe ser menor a 15 caracteres')
          .required('Campo requerido'),
        email: Yup
          .string()
          .email('Email inválido')
          .required('Campo requerido'),
      })
  })

  return (
    <div>
      <h1>Formik Basic</h1>

      <form onSubmit={handleSubmit} noValidate>
        <>
          <label htmlFor="firstName">
            Nombre
          </label>

          <input
            type="text"
            name="firstName"
            id="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
          />

          {touched.firstName && errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </>
        
        <>
          <label htmlFor="lastName">
            Apellidos
          </label>

          <input
            type="text"
            name="lastName"
            id="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
          />

          {touched.lastName && errors.lastName && (
            <span className="error">{errors.lastName}</span>
          )}
        </>
        
        <>
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />

          {touched.email && errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </>

        {JSON.stringify(values, null, 2)}

        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
