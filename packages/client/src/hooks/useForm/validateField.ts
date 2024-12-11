import { TValidationResult } from '@/types/validationResult'

export const validateField = (
  name: string,
  value: string
): TValidationResult => {
  switch (name) {
    case 'first_name':
    case 'second_name':
      if (!/^[A-ZА-Я][a-zа-я-]*$/.test(value)) {
        return {
          isValid: false,
          message: 'Первая буква должна быть заглавной, допустим только дефис',
        }
      }
      break

    case 'login':
      if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(value)) {
        return {
          isValid: false,
          message:
            'Логин от 3 до 20 символов, латиница, допустимы дефис и подчёркивание',
        }
      }
      break

    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { isValid: false, message: 'Некорректный email' }
      }
      break

    case 'password':
      if (!/^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)) {
        return {
          isValid: false,
          message:
            'Пароль должен быть от 8 до 40 символов, содержать заглавную букву и цифру',
        }
      }
      break

    case 'phone':
      if (!/^\+?\d{10,15}$/.test(value)) {
        return {
          isValid: false,
          message:
            'Телефон должен содержать от 10 до 15 цифр и может начинаться с +',
        }
      }
      break

    default:
      return { isValid: true, message: '' }
  }

  return { isValid: true, message: '' }
}
