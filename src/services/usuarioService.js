import axios from 'axios';

export const buscar_CEP = async cep => {
   const url = `https://viacep.com.br/ws/${cep}/json/`
   const lugar = await axios.get(url)
   return lugar.data
}

export const buscar_usuario = (usuarios, id) => {
   return usuarios.find(usuario => usuario.id === id)
}

export const buscar_usuario_por_email = (usuarios, email) => {
   return usuarios.find(usuario => usuario.email === email)
}

export const verificar_email_existe = (usuarios, email) => {
   return usuarios.some(usuario => usuario.email === email)
}

export const verificar_login_existe = (usuarios, login) => {
   return usuarios.some(usuario => (usuario.email === login.email) && (usuario.senha === login.senha))
}

export const verificar_pode_atualizar_email = (usuarios, login) => {
   const usuarioBuscado = buscar_usuario_por_email(usuarios, login.email)
   
   if(usuarioBuscado === undefined){
      return true
   }

   login.id = usuarioBuscado.id
   
   return usuarios.some(usuario => (usuario.email === login.email) && (usuario.id === login.id))
}