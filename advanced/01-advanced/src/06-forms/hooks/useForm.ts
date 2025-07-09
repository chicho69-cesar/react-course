import { useState, type ChangeEvent } from 'react'

export default function useForm<T>(initState: T) {
  const [formData, setFormData] = useState<T>(initState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleResetForm = () => {
    setFormData(initState)
  }

  const handleValidateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  return {
    ...formData,
    formData,

    handleChange,
    handleResetForm,
    handleValidateEmail,
  }
}
