import '../styles/styles.css'

import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


export default function FormikComponents() {
  return (
    <div>
      <h1>Formik Components</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: '',
        }}
        onSubmit={(values) => {
          console.log('Form submitted', { values })
        }}
        validationSchema={
          Yup.object({
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
            terms: Yup
              .boolean()
              .oneOf([true], 'Debes aceptar los términos y condiciones'),
            jobType: Yup
              .string()
              // .oneOf(['developer', 'designer', 'devops'], 'Elige un tipo de trabajo')
              .notOneOf(['manager'], 'No puedes elegir manager')
              .required('Campo requerido'),
          })
        }
      >
        {(formik) => (
          <Form>
            <>
              <label htmlFor="firstName">
                Nombre
              </label>

              <Field
                name='firstName'
                placeholder='John'
                type='text'
              />

              <ErrorMessage name='firstName' component='span' />
            </>

            <>
              <label htmlFor="lastName">
                Apellidos
              </label>

              <Field
                name='lastName'
                placeholder='Dow'
                type='text'
              />

              <ErrorMessage name='lastName' component='span' />
            </>
            
            <>
              <label htmlFor="email">
                Nombre
              </label>

              <Field
                name='email'
                placeholder='johndoe@gmail.com'
                type='email'
              />

              <ErrorMessage name='email' component='span' />
            </>

            <>
              <label htmlFor="jobType">
                Tipo de trabajo
              </label>

              <Field name='jobType' as='select'>
                <option value=''>Select a job type</option>
                <option value='developer'>Developer</option>
                <option value='designer'>Designer</option>
                <option value='devops'>DevOps</option>
                <option value='manager'>Manager</option>
              </Field>
            </>

            <label>
              <Field
                type='checkbox'
                name='terms'
              />

              Términos y condiciones
            </label>

            {JSON.stringify(formik.values, null, 2)}

            <button type='submit'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
