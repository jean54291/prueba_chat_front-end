import {
    INICIAR_SESION,
    INICIAR_SESION_EXITO,
    INICIAR_SESION_ERROR,
} from '../types'


const initialState = {
    usuarioLogueado : [],
    logOut: false,
    logIn:true,
    error : null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case INICIAR_SESION:
            return{
                ...state,
                loading:true,
            }
        case INICIAR_SESION_EXITO:
            return{
                ...state,
                loading:false,
                logIn:false,
                logOut:true,
                usuarioLogueado: [...state.usuarioLogueado, action.payload]
            }
        case INICIAR_SESION_ERROR:
            return{
                ...state,
                loading:false,
                logIn:true,
                logOut:false,
                error:action.payload
            }
        default:
            return state;
    }
}