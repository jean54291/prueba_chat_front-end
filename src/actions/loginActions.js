import axios from 'axios';

import {
    INICIAR_SESION,
    INICIAR_SESION_EXITO,
    INICIAR_SESION_ERROR,
} from '../types';


export function iniciarSesion(datosLogin){
    return (dispactch) => {
        dispactch(validarDatos());
        // para validar si existe error al momento de consultar los datos de los clientes en la bd
        
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post("http://127.0.0.1:8000/login", datosLogin, {
            headers: headers
          })
          .then((response) => {
            if(response.data.errores!=false){
                dispactch(inicioSesionError(true));
            }else{
                const datos = response.data.datos[0];
                const getUsuarioDatos = {id:datos['id'],  'name':(datos['first_name']+" "+datos['last_name'] ), 'token':response.data.token}
                dispactch(inicioSesionExitoso(getUsuarioDatos));
            }            
          })
          .catch((error) => {
            console.log(error)
          })
        
    }
}
// el payload se utiliza cuando se va a modificar el state
const validarDatos = () => ({
    type: INICIAR_SESION
})

const inicioSesionExitoso = (getUsuarioDatos) => ({
    type: INICIAR_SESION_EXITO,
    payload: getUsuarioDatos
})

const inicioSesionError = (estado) => ({
    type: INICIAR_SESION_ERROR,
    payload: estado
})