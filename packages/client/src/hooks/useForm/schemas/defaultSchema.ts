import * as yup from 'yup'

export const defaultSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(
      /^[A-ZА-Я][a-zа-я-]*$/,
      'Первая буква должна быть заглавной, допустим только дефис'
    )
    .required('Имя обязательно'),
  second_name: yup
    .string()
    .matches(
      /^[A-ZА-Я][a-zа-я-]*$/,
      'Первая буква должна быть заглавной, допустим только дефис'
    )
    .required('Фамилия обязательна'),
  login: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
      'Логин от 3 до 20 символов, латиница, допустимы дефис и подчёркивание'
    )
    .required('Логин обязателен'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      'Пароль должен быть от 8 до 40 символов, содержать заглавную букву и цифру'
    )
    .required('Пароль обязателен'),
  phone: yup
    .string()
    .matches(
      /^\+?\d{10,15}$/,
      'Телефон должен содержать от 10 до 15 цифр и может начинаться с +'
    )
    .required('Телефон обязателен'),
})
