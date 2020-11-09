import React, { Fragment, useState } from 'react'
import axios from 'axios';

const VistaNuevoUsuario = () => {
    const [datosUsuarios, getDatosUsuarios] = useState({
        first_name:"" , last_name :"",username:"" , password :"",email:"" 
    });
    const cargarDatos = e =>{
        getDatosUsuarios({
            ...datosUsuarios,
            [e.target.name] : e.target.value
        });
    }

    const { first_name,last_name,username, password,email} = datosUsuarios
    const [datosUser, guardarDatos] = React.useState([]);
    const headers = {
        'Content-Type': 'application/json',
    }
    const subimitGuardarUsuario = e =>{
        
        e.preventDefault();
        console.log(datosUsuarios)


        axios.post("http://localhost:8000/persona/create_persona/", datosUsuarios, {
            headers: headers
          })
          .then((response) => {
            if(response.data){
                alert("Se creo con exito el usuario")
            }else{
                alert("Ocurrio un error: ",response[0])
            }            
          })
          .catch((error) => {
            alert("Ocurrio un error validar que no exite ya creado el usuario o comuniquese con el administrador")
          })
    }

    return ( 
        <Fragment>
            <div className="bodyViews">
                <form className ="form-inline col-sm-12" onSubmit={subimitGuardarUsuario} >
                    <div className="form-group row col-md-12 col-lg-4 col-xl-3">
                                <label className="col-sm-4 col-md-6 col-lg-3 col-form-label">Nombre:</label>
                                <div className="col-sm-8 col-md-6 col-lg-9">
                                    <input type="text" className="form-control" name="first_name" onChange={cargarDatos} value={first_name} />    
                                </div>
                        </div>
                        <div className="form-group row col-md-12 col-lg-4 col-xl-3">
                                <label className="col-sm-4 col-md-6 col-lg-3 col-form-label">Apellidos:</label>
                                <div className="col-sm-8 col-md-6 col-lg-9">
                                    <input type="text" className="form-control" name="last_name" onChange={cargarDatos} value={last_name} />    
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
                                <input type="password" className="form-control "  name="password" onChange={cargarDatos} value={password}   />
                            </div>
                        </div>

                        <div className="form-group row col-md-12 col-lg-4 col-xl-3">
                                <label className="col-sm-4 col-md-6 col-lg-3 col-form-label">Email:</label>
                                <div className="col-sm-8 col-md-6 col-lg-9">
                                    <input type="email" className="form-control" name="email" onChange={cargarDatos} value={email} />    
                                </div>
                        </div>

                        <div className="form-group row col-md-12 col-lg-1">
                            <div className="col-sm-12">
                              
                                <button type="submit" className="btn btn-primary col-sm-12">Guardar</button>
                            </div>
                        </div>
                    </form>
            </div>
        </Fragment>
     );
}
 
export default VistaNuevoUsuario;