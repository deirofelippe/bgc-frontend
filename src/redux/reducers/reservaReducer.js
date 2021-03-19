import { dados_reservas } from '../../utils/baseDeDados'

export default (state = dados_reservas(), action) => {
   switch (action.type) {
      case 'FINALIZAR_RESERVA':
         return finalizar(state, action.dados)

      default:
         return state
   }
}

const finalizar = (state, reserva) => {
   return [...state, ...reserva ]
}