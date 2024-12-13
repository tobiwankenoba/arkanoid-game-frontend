import * as Yup from 'yup'

export const profileValidationSchema = Yup.object({
  first_name: Yup.string()
    .matches(
      /^[A-ZА-Я][a-zа-я-]*$/,
      'Первая буква должна быть заглавной, допустим только дефис'
    )
    .required('Имя обязательно для заполнения'),
  second_name: Yup.string()
    .matches(
      /^[A-ZА-Я][a-zа-я-]*$/,
      'Первая буква должна быть заглавной, допустим только дефис'
    )
    .required('Фамилия обязательна для заполнения'),
  login: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
      'Логин от 3 до 20 символов, латиница, допустимы дефис и подчёркивание'
    )
    .required('Логин обязателен для заполнения'),
  old_password: Yup.string()
    .required('Старый пароль обязателен для заполнения')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(40, 'Пароль должен содержать максимум 40 символов')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      'Пароль должен содержать заглавную букву и цифру'
    ),
  new_password: Yup.string()
    .required('Новый пароль обязателен для заполнения')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(40, 'Пароль должен содержать максимум 40 символов')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      'Пароль должен содержать заглавную букву и цифру'
    ),
})
