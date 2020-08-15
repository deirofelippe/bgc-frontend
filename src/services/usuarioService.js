import axios from 'axios';

export const buscarCEP = async cep => {
   const url = `https://viacep.com.br/ws/${cep}/json/`
   const lugar = await axios.get(url)
   return lugar.data
}

export const buscarUsuario = (usuarios, id) => {
   return usuarios.find(usuario => usuario.id === id)
}

export const emailJaExiste = (usuarios, email) => {
   usuarios.some(usuario => usuario.email === email)
}

export const emailNaoPodeSerAtualizado = (usuarios, usuario) => {
   return usuarios.some(usuarioBuscado => {
      if(usuarioBuscado.email === usuario.email && usuarioBuscado.id !== usuario.id){
            return true
      }
      return false
   });
}