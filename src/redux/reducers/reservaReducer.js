import { dados_reservas } from '../../utils/baseDeDados'

export default (state = dados_reservas(), action) => {
   switch (action.type) {
      case 'ADICIONAR_RESERVA':
         return adicionar(state, action.dados)

      case 'CANCELAR_RESERVA':
         return deletar(state, action.dados)

      default:
         return state
   }
}

const adicionar = (reservas, reserva) => {
   return [...reservas, reserva ]
}

const deletar = (reservas, numero) => {
   reservas = reservas.filter((reserva) => reserva.numero !== numero)
   return [ ...reservas ]
}