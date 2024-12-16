export const useAuthStatus = () => {
  const token = sessionStorage.getItem('token')
  return !!token
}
