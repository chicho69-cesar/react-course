import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, initialFormValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidations, setFormValidations] = useState(initialFormValidations)

  useEffect(() => {
    createValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidations)) {
      if (formValidations[formValue] !== null) return false
    }

    return true
  }, [formValidations])

  const onInputChange = ({ target }) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
    setFormValidations(initialFormValidations)
  }

  const createValidators = () => {
    const formCheckedValues = {}

    for (const formValue of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formValue]
      formCheckedValues[`${formValue}Valid`] = fn(formState[formValue]) ? null : errorMessage
    }

    setFormValidations(formCheckedValues)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidations,
    formValidations,
    isFormValid
  }
}
