import { useState } from 'react'
import * as Yup from 'yup'

interface IUseFormOptions<T extends Record<string, any>> {
  initialValues: T
  validationSchema: Yup.ObjectSchema<Yup.InferType<Yup.ObjectSchema<T>>>
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validationSchema,
}: IUseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues(prevValues => ({ ...prevValues, [name]: value }))

    try {
      validationSchema.validateSyncAt(name, { ...values, [name]: value })
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[name]
        return newErrors
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: err.message }))
      }
    }
  }

  const validateForm = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false })
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {}
        err.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path] = error.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit =
    (onSubmit: (values: T) => void) => async (e: React.FormEvent) => {
      e.preventDefault()

      if (await validateForm()) {
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
