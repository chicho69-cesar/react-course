import '../styles/styles.css'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import MyTextInput from '../components/MyTextInput'

export default function AuthFormikPage() {
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password1: '',
          password2: '',
        }}
        onSubmit={(values) => {
          console.log('Form submitted', { values })
        }}
        validationSchema={
          Yup
            .object({
              name: Yup.string()
                .min(2, 'El nombre debe de ser de 3 caracteres o mas')
                .max(15, 'El nombre debe de ser menor de 15 caracteres')
                .required('Requerido'),
              email: Yup.string()
                .email('Revise el formato del correo')
                .required('Requerido'),
              password: Yup.string()
                .min(6, 'Mínimo 6 letras')
                .required('Requerido'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Las contraseñas no son iguales')
                .required('Requerido')
          })
        }
      >
        {({ handleReset, values }) => (
          <Form>
            <MyTextInput
              label="Nombre"
              name="name"
              placeholder="John Doe"
            />

            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="johndoe@google.com"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="******"
            />

            <MyTextInput
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="******"
            />

            {JSON.stringify(values, null, 2)}

            <div>
              <button type="submit">
                Create
              </button>
  
              <button type="button" onClick={handleReset}>
                Reset Form
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
