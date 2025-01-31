export const useAuthStatus = () => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token')
    return !!token
  }
}
