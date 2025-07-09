/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MySelect from '../components/MySelect'
import MyTextInput from '../components/MyTextInput'
import formJson from '../data/custom-form.json'

const initialValues: {
  [key: string]: any
} = {}

const requiredFields: {
  [key: string]: any
} = {}

for (const input of formJson) {
  initialValues[input.name] = input.value

  if (!input.validations) continue

  let schema = Yup.string()

  for (const rule of input.validations) {
    if (rule.type === 'required') {
      schema = schema.required('Este campo es requerido')
    }

    if (rule.type === 'minLength') {
      schema = schema.min((rule as any).value || 2, `Mínimo de ${(rule as any).value || 2} caracteres`)
    }

    if (rule.type === 'email') {
      schema = schema.email(`Revise el formato del email`)
    }
  }

  requiredFields[input.name] = schema
}

const validationSchema = Yup.object({ ...requiredFields })

export default function DynamicForm() {
  return (
    <div>
      <h1>Dynamic Form</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted', { values })
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, label, options, placeholder}) => {
              if (type === 'text' || type === 'email' || type === 'password') {
                return (
                  <MyTextInput
                    key={name}
                    label={label}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                  />
                )
              }

              if (type === 'select') {
                return (
                  <MySelect
                    key={name}
                    label={label}
                    name={name}
                  >
                    <option value=''>Seleccione una opción</option>
                    
                    {options?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </MySelect>
                )
              }

              return null
            })}

            {JSON.stringify(formik.values, null, 2)}

            <div>
              <button type="submit">
                Submit
              </button>
              
              <button type="reset" onClick={formik.handleReset}>
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
