import { combineReducers } from 'redux'

import produtos from './produtoReducer'
import reservas from './reservaReducer'
import pedidos from './pedidoReducer'
import usuarios from './usuarioReducer'
import login from './loginReducer'

export default combineReducers({
   produtos,
   reservas,
   pedidos,
   usuarios,
   login,
})