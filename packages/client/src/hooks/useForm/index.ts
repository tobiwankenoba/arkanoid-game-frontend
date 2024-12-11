import { useState } from 'react'

import { validateField } from '@/hooks/useForm/validateField'

interface IUseFormOptions<T> {
  initialValues: T
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
}: IUseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues(prevValues => ({ ...prevValues, [name]: value }))

    const validation = validateField(name, value)
    if (!validation.isValid) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: validation.message }))
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    Object.entries(values).forEach(([name, value]) => {
      const validation = validateField(name, value)
      if (!validation.isValid) {
        newErrors[name] = validation.message
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit =
    (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault()

      if (validateForm()) {
        onSubmit(values)
      }
    }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  }
}
