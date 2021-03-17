export const fazer_login = (dados) => {
   return {
      type: 'FAZER_LOGIN',
      dados
   }
}

export const fazer_login_direto = (dados) => {
   return {
      type: 'FAZER_LOGIN_DIRETO',
      dados
   }
}

export const fazer_logout = () => {
   return {
      type: 'FAZER_LOGOUT'
   }
}