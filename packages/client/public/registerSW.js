export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          reg.scope
        )
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error)
      })
  }
}
