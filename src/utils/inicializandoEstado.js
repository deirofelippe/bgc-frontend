import { v1 } from 'uuid';

export const iniciarEstadoLogin = () => {
   return {
      logado: false,
      id: '',
      email: '',
      nome: '',
      tipoDeUsuario: ''
   }
}

export const iniciarEstadoProduto = () => {
   return {
      id: v1(),
      nome: '',
      descricao: '',
      preco: '',
   }
}

export const iniciarEstadoUsuario = () => {
   return {
      id: v1(),
      nome: '',
      email: '',
      senha: '',
      tipo: 'CLIENTE',
      endereco: {
         cep: '',
         estado: '',
         cidade: '',
         bairro: '',
         endereco: '',
         numero: '',
      }
   }
}

export const iniciarEstadoReserva = (idProduto = '', idUsuario = '') => {
   return {
      idProduto: idProduto, 
      idUsuario: idUsuario, 
      quantidade: '1', 
      dataReserva: '', 
      numero: ''
   }
}