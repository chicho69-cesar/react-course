import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidationState, setFormValidationState] = useState({})

  useEffect(() => {
    createValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidationState)) {
      if (formValidationState[formValue] !== null) return false
    }

    return true
  }, [formValidationState])

  const onInputChange = ({ target }) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
    setFormValidationState({})
  }

  const createValidators = () => {
    const formCheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }

    setFormValidationState(formCheckedValues)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidationState,
    isFormValid,
    formValidationState,
  }
}
