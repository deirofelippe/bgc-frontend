import axios from 'axios';

export const buscarCEP = async cep => {
   const url = `https://viacep.com.br/ws/${cep}/json/`
   const lugar = await axios.get(url)
   return lugar.data
}

export const buscarUsuario = (usuarios, id) => {
   return usuarios.find(produto => produto.id === id)
}

export const verificarEmailExiste = (usuarios, email) => {
   return usuarios.some(usuario => usuario.email === email)
}