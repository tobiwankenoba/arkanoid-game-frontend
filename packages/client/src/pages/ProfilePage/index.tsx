import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

const profileMock = {
  first_name: 'Илья',
  second_name: 'Котовский',
  login: 'ilya.dev__',
  old_password: '123qwerty',
  new_password: '123456qwerty',
}

export function ProfilePage() {
  const { control, handleSubmit, setValue, getValues } = useForm<
    typeof profileMock
  >({
    defaultValues: profileMock,
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)

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

  const onSubmit = (data: typeof profileMock) => {
    if (isDisabled) {
      const isDataChanged = Object.keys(profileMock).some(
        key =>
          data[key as keyof typeof profileMock] !==
          profileMock[key as keyof typeof profileMock]
      )

      if (!isDataChanged) {
        console.log('Нету изменений.')
        return
      }

      console.log('Отправление данных: ', data)
    }
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
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Имя"
                fullWidth
                disabled={isDisabled}
                required
              />
            )}
          />
          <Controller
            name="second_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Фамилия"
                fullWidth
                disabled={isDisabled}
                required
              />
            )}
          />
          <Controller
            name="login"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Логин"
                fullWidth
                disabled={isDisabled}
                required
              />
            )}
          />
          <FormControl variant="outlined">
            <InputLabel>Старый пароль</InputLabel>
            <OutlinedInput
              value={getValues('old_password')}
              onChange={e => setValue('old_password', e.target.value)}
              disabled={isDisabled}
              type={showPassword.old_password ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.old_password
                        ? 'hide the old password'
                        : 'display the old password'
                    }
                    onClick={() => handleClickShowPassword('old_password')}
                    edge="end">
                    {isDisabled ? null : showPassword.old_password ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Старый пароль"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Новый пароль</InputLabel>
            <OutlinedInput
              value={getValues('new_password')}
              onChange={e => setValue('new_password', e.target.value)}
              disabled={isDisabled}
              type={showPassword.new_password ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.new_password
                        ? 'hide the new password'
                        : 'display the new password'
                    }
                    onClick={() => handleClickShowPassword('new_password')}
                    edge="end">
                    {isDisabled ? null : showPassword.new_password ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Новый пароль"
            />
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
