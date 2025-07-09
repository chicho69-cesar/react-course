import '../styles/styles.css'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import MyCheckbox from '../components/MyCheckbox'
import MySelect from '../components/MySelect'
import MyTextInput from '../components/MyTextInput'

export default function FormikAbstraction() {
  return (
    <div>
      <h1>Formik Abstraction</h1>

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
            <MyTextInput
              label='Nombre'
              name='firstName'
              placeholder='John'
            />
            
            <MyTextInput
              label='Apellidos'
              name='lastName'
              placeholder='Doe'
            />

            <MyTextInput
              label='Email'
              name='email'
              type='email'
              placeholder='johndoe@gmail.com'
            />

            <MySelect name='jobType' label='Job Type'>
              <option value=''>Select a job type</option>
              <option value='developer'>Developer</option>
              <option value='designer'>Designer</option>
              <option value='devops'>DevOps</option>
              <option value='manager'>Manager</option>
            </MySelect>

            <MyCheckbox
              label='Términos y condiciones'
              name='terms'
            />

            {JSON.stringify(formik.values, null, 2)}

            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
