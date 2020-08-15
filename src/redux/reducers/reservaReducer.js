import { dadosReservas } from '../../utils/DadosBase'

export default (state = dadosReservas(), action) => {
   switch (action.type) {
      case 'ADICIONAR_RESERVA':
         return adicionarReserva(state, action)

      case 'CANCELAR_RESERVA':
         return deletarReserva(state, action)

      default:
         return state
   }
}

const adicionarReserva = (state, action) => {
   return [...state, action.dados ]
}

const deletarReserva = (state, action) => {
   const numero = action.dados
   const reservas = state.filter((reserva) => reserva.numero !== numero)
   return [ ...reservas ]
}