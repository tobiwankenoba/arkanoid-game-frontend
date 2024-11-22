interface props {
  type: string
}

export function AuthPage(props: props) {
  const { type } = props

  return <h1>Auth Page -- {type === 'login' ? 'Login' : 'Register'}</h1>
}
