import axios from 'axios';

export const buscarCEP = async cep => {
   const url = `https://viacep.com.br/ws/${cep}/json/`
   const lugar = await axios.get(url)
   return lugar.data
}