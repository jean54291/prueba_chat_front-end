
import '../../styles/login/login.css'
import '../../styles/index.css'
import React, { Fragment, useState } from 'react'
// actions de redux
import {iniciarSesion} from '../../actions/loginActions';
import {cargarMenu} from '../../actions/barraNavegacionActions';
import {useDispatch, useSelector} from 'react-redux'

import Spinner from '../other/Spinner'


const Login = ({history}) => {
    
    const [datosLogin, getDatosLogin] = useState({
        username:"" , pass :""
    });
    const cargarDatos = e =>{
        getDatosLogin({
            ...datosLogin,
            [e.target.name] : e.target.value
        });
    }
    
    const { username, pass } = datosLogin   

    // redux
    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();
    // mandar a llamar la funcion del actions
    const iniciaSesion = (loginDatos) => dispatch( iniciarSesion(loginDatos) );
    const cargaMenu = (datosUser) => dispatch(cargarMenu(datosUser));
    // acceder a state del store
    const cargando = useSelector((state) => state.usuarioLogueado.loading);
    const error = useSelector((state)=> state.usuarioLogueado.error);
    const datosUsurios = useSelector((state) => state.usuarioLogueado.usuarioLogueado);
    const subimitIniciarSesion = e =>{
        e.preventDefault();
        // validar formulario
        // si no hay errores
        //iniciar session
        iniciaSesion(datosLogin);        
        if(datosUsurios.length>0) {
            if(typeof datosUsurios[0]['token'] != "undefined" && datosUsurios[0]['token']!= null && datosUsurios[0]['token']!=""){
                cargaMenu(datosUsurios);
                history.push('/home');
            }
        }        
    }
    return ( 
        <Fragment>
            <div className="wrapper fadeInDown col-sm-12">

                <div className="formContent col-sm-12">
                    { 
                        error 
                        ? 
                        <div className="alert alert-danger" role="alert">
                            Los datos Son incorrectos
                        </div>
                        : 
                        null
                    }
                    <form className ="form-inline col-sm-12" onSubmit={subimitIniciarSesion} >
                        <div className="form-group row col-md-12 col-lg-3 col-xl-5">
                            <div className="col-sm-12 col-md-12 col-lg-10">
                                <h1>Bienvenidos</h1>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-2">
                                { cargando ? <Spinner/> : null }    
                            </div>
                        </div>
                        <div className="form-group row col-md-12 col-lg-4 col-xl-3">
                                <label className="col-sm-4 col-md-6 col-lg-3 col-form-label">Usuario:</label>
                                <div className="col-sm-8 col-md-6 col-lg-9">
                                    <input type="text" className="form-control" name="username" onChange={cargarDatos} value={username} />    
                                </div>
                        </div>

                        <div className="form-group row col-md-12 col-lg-4 col-xl-3">
                            <label className="col-sm-4 col-md-6 col-lg-3 col-form-label">Contraseña:</label>
                            <div className="col-sm-8 col-md-6 col-lg-9">
                                <input type="password" className="form-control "  name="pass" onChange={cargarDatos} value={pass}   />
                            </div>
                        </div>
                        <div className="form-group row col-md-12 col-lg-1">
                            <div className="col-sm-12">
                              
                                <button type="submit" className="btn btn-primary col-sm-12">Entrar</button>
                            </div>
                        </div>
                    </form>
                    <div id="formFooter" className="col-sm-12">
                        <a className="underlineHover" href="#">Recuperar contraseña?</a>
                    </div>
                    <div id="EspacioLibreLogin">
                        <br></br>
                    </div>
                </div>
           </div>
        </Fragment>    
    );
}
 
export default Login;