import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  login: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
      'Логин от 3 до 20 символов, латиница, допустимы дефис и подчёркивание'
    )
    .required('Логин обязателен'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      'Пароль должен быть от 8 до 40 символов, содержать заглавную букву и цифру'
    )
    .required('Пароль обязателен'),
})
