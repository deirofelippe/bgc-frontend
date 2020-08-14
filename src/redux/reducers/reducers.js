import { combineReducers } from 'redux'

import produtos from './produtoReducer'
import reservas from './reservaReducer'
import usuarios from './usuarioReducer'

export default combineReducers({
   produtos,
   reservas,
   usuarios,
})