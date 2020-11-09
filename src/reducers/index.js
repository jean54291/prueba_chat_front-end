import {combineReducers} from 'redux';
import loginReducer from './loginReducer'
import barraNavegacionReducer from './barraNavegacionReducer'


const appReducer = combineReducers({
    usuarioLogueado : loginReducer,
    menuUsuario : barraNavegacionReducer
});

const rootReducer = (state, action)=>{
    if (action.type === 'CERRAR_SESION') {
        state = undefined
    }
    
    return appReducer(state, action)
}

export default rootReducer;