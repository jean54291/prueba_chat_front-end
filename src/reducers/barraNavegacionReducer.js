import {
    CARGAR_MENU,
    CERRAR_SESION
} from '../types'


const initialState = {
    opcionesMenu : [],
    mostrarMenu : false,
    loadingMenu : false,
    error : null
}

export default function(state = initialState, action){
    switch(action.type){
        case CARGAR_MENU:
            return{
                ...state,
                loading:false,
                mostrarMenu:true,
                opcionesMenu:[...state.opcionesMenu, action.payload]
            }
        case CERRAR_SESION:
            return{
                ...state,
                loading:false,
                mostrarMenu:false
            }
        default:
            return state;
    }
}