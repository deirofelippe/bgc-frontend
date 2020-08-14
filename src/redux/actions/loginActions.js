export const fazerLogin = (dados) => {
   return {
      type: 'FAZER_LOGIN',
      dados
   }
}

export const fazerLogout = () => {
   return {
      type: 'FAZER_LOGOUT'
   }
}