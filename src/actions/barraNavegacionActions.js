import {
    CARGAR_MENU,
    CERRAR_SESION
} from '../types'
import axios from 'axios';
export function cargarMenu(getUsuarioDatos){
    const menu = [
        {
            'titulo':'Usuarios',
            'botones_sec':[
                {
                    'titulo':'Crear Usuarios',
                    'nombreModulo':'usuarios',
                    'funcion':'nuevo'
                }
                ,{
                    'titulo':'Consultar Usuarios',
                    'nombreModulo':'usuarios',
                    'funcion':'lista'
                }
            ]
        },


    ]
    return (dispactch) => {
        // consultar Opciones dependiendo los roles del usuario
        if(menu.length > 0){
            dispactch (barraNavegacion(menu));
        }
    }
}

export function cerraSesion(datosUsuarioLogueado){
    try {
        localStorage.removeItem("state");
        
    } catch (error) {
        return undefined
    }
    return (dispactch) => {
        
        const headers = {
            'Content-Type': 'application/json',
        }
        const datos= {"id":datosUsuarioLogueado[0]['id']}
        axios.post("http://127.0.0.1:8000/logout", datos, {
            headers: headers
          })
          .then((response) => {
            if(response.data.errores===false){
                dispactch(cerrarSesion())
            }           
          })
          .catch((error) => {
            console.log(error)
          })
    }
}


// el payload se utiliza cuando se va a modificar el state
const barraNavegacion = (listaNavegacion) => ({
    type: CARGAR_MENU,
    payload:listaNavegacion
})

const cerrarSesion = ()=>({
    type: CERRAR_SESION,
    // payload:listaNavegacion
})