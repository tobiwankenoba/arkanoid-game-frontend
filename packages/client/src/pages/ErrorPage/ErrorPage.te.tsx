import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ErrorPage', () => {
  it('renders ErrorPage correctly', () => {
    render(<ErrorPage />)
    const firstText = screen.getByText(/Ууупс/i)
    expect(firstText).toBeInTheDocument()
    const secondText = screen.getByText(/Что-то пошло не так/i)
    expect(secondText).toBeInTheDocument()
  })

  it('navigates to home on button click', () => {
    const mockNavigate = useNavigate as jest.Mock
    const navigateMock = jest.fn()
    mockNavigate.mockReturnValue(navigateMock)
    render(<ErrorPage />)
    const button = screen.getByRole('button', { name: /Вернуться на главную/i })
    fireEvent.click(button)
    console.log(navigateMock.mock.calls)
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.home)
  })
})
