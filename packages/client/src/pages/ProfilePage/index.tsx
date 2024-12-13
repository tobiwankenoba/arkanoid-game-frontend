import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import { useForm } from '@/hooks/useForm'
import { profileValidationSchema } from '@/hooks/useForm/schemas/profileSchema'

export function ProfilePage() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      first_name: 'Илья',
      second_name: 'Kотовский',
      login: 'ilya-dev',
      old_password: '1209Qwee',
      new_password: '1209Qwerty',
    },
    validationSchema: profileValidationSchema,
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  })

  const handleClickShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }
  const handleToggleDisabled = () => setIsDisabled(disabled => !disabled)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSubmit = (data: typeof values) => {
    if (isDisabled) {
      console.log('Нет изменений для сохранения.')
      return
    }
    console.log('Отправка данных:', data)
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: 'calc(100vh - 92px)',
        }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: 400,
          }}>
          <Avatar
            src={avatar || ''}
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              cursor: 'pointer',
            }}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleAvatarChange}
          />
          <TextField
            label="Имя"
            id="first_name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
            fullWidth
            required
            disabled={isDisabled}
          />
          <TextField
            label="Фамилия"
            id="second_name"
            name="second_name"
            value={values.second_name}
            onChange={handleChange}
            error={!!errors.second_name}
            helperText={errors.second_name}
            fullWidth
            required
            disabled={isDisabled}
          />
          <TextField
            label="Логин"
            id="login"
            name="login"
            value={values.login}
            onChange={handleChange}
            error={!!errors.login}
            helperText={errors.login}
            fullWidth
            required
            disabled={isDisabled}
          />
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.old_password}>
            <InputLabel htmlFor="old_password">Старый пароль</InputLabel>
            <OutlinedInput
              id="old_password"
              name="old_password"
              type={showPassword.old_password ? 'text' : 'password'}
              value={values.old_password}
              onChange={handleChange}
              disabled={isDisabled}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('old_password')}
                    edge="end">
                    {showPassword.old_password ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Старый пароль"
            />
            {!!errors.old_password && (
              <FormHelperText>{errors.old_password}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.new_password}>
            <InputLabel htmlFor="new_password">Новый пароль</InputLabel>
            <OutlinedInput
              id="new_password"
              name="new_password"
              type={showPassword.new_password ? 'text' : 'password'}
              value={values.new_password}
              onChange={handleChange}
              disabled={isDisabled}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('new_password')}
                    edge="end">
                    {showPassword.new_password ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Новый пароль"
            />
            {!!errors.new_password && (
              <FormHelperText>{errors.new_password}</FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleToggleDisabled}>
            {isDisabled ? 'Изменить профиль' : 'Сохранить изменения'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
