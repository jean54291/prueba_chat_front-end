import React, { Fragment, useState }  from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from '../login/Login'
import Navegacion from './Navegacion'
import '../../styles/css_chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faImage } from '@fortawesome/free-solid-svg-icons'

import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
// import RNFetchBlob from 'react-native-fetch-blob'
// import FilesDemo from '../other/file'
import Files from 'react-files'
import FormData from 'form-data'


const Home = () => {

    // const Blob = RNFetchBlob.polyfill.Blob
    // const fs 
        
    const [datosMensajesEnviar, getDatosMensajesEnviar] = useState({
        mensaje:""
    });
    const [setfile, getFile] = useState({
        setfile:null
    });
    const cargaDatos = e =>{
        getDatosMensajesEnviar({
            ...datosMensajesEnviar,
            [e.target.name] : e.target.value
        });
    }
    const {} = setfile
    const { mensaje } = datosMensajesEnviar   
    const datosUsuarioLogueado = useSelector((state)=> state.usuarioLogueado.usuarioLogueado);

    const [mensanjesChat, mensajeData] = React.useState([]); 


    const [data, cargarData] = React.useState([]);
    //---------- imahgenes---------------

    const onFilesChange =(files)  =>{
        getFile(files)
    }

    const onFilesError= (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    

    // ----------------------------------

    React.useEffect(() => {
        async function mensajeFecthData(){
            var data = await fetch("http://localhost:8000/mensajes/lista_mensajes/").then(res => {
                return res.json();
            });
            mensajeData(data);
        }
        mensajeFecthData();
    }, [])
    const validarUsuario = (id_usuario) =>{
        // console.log(datosUsuarioLogueado[0]['id']+"--"+id_usuario)
        if(datosUsuarioLogueado[0]['id']==id_usuario){
            return true
        }else{
            return false
        }
    }
    React.useEffect(() => {
        async function fetchData(){
            var data = await fetch("http://localhost:8000/persona/lista_personas/").then(res => {
                return res.json();
            });
            cargarData(data);
        }
        fetchData();
    }, [])
    const actualizarChat = () =>{

        async function fetchData(){
            var data = await fetch("http://localhost:8000/persona/lista_personas/").then(res => {
                return res.json();
            });
            cargarData(data);
        }
        fetchData();

    }
    const actualizarMensajes = () =>{
        async function mensajeFecthData(){
            var data = await fetch("http://localhost:8000/mensajes/lista_mensajes/").then(res => {
                return res.json();
            });
            mensajeData(data);
        }
        mensajeFecthData();
    }
    // setTimeout(() => {
    //     actualizarChat()
    //     actualizarMensajes()
    // }, 9000);
    const borrarMensaje = (mensaje_data) =>{
        // console.log(mensaje_data)
        const headers = {
            'Content-Type': 'application/json',
        }
        const url = "http://localhost:8000/mensajes/update/"+mensaje_data.id+"/"
        mensaje_data.borrado = true;
        mensaje_data.notas = 'envio'
        mensaje_data.observaciones = 'envio'
        mensaje_data.image="/uploads/Prueba_Tecnica_Noviembre_-_useit5235.pdf"
        axios.put(url, mensaje_data, {
            headers: headers
        })
        .then((response) => {
            if(response.data){
                actualizarMensajes()
            }else{
                alert("Ocurrio un error: ",response[0])
            }                    
        })
        .catch((error) => {
            alert("Ocurrio un error al borrar mensaje")
        })

    }

    const EnviarMensaje = (mensaje)=>{
        const mensaje_data = {}
        const formData = new FormData()
        const headers = {
            'Content-Type': 'application/json',
        }
        const url = "http://localhost:8000/mensajes/create_mensajes/"
        if(setfile.lengt>0){
            mensaje_data.image="/uploads/"+setfile[0]['name']
        }else{
            mensaje_data.image="sin imagen"
        }
        mensaje_data.borrado = false;
        mensaje_data.notas = 'envio'
        mensaje_data.observaciones = mensaje.mensaje       
        mensaje_data.usuario_id = datosUsuarioLogueado[0]['id']
        axios.post(url, mensaje_data, {
            headers: headers
        })
        .then((response) => {
            if(response.data){
                actualizarMensajes()
            }else{
                alert("Ocurrio un error: ",response[0])
            }                    
        })
        .catch((error) => {
            alert("Ocurrio un error al enviar el mensaje")
        })
    }


    const mensajesChat = mensanjesChat.map((boton,index) => 
        
        <li className="active border-top" style={{"border-top":"1px solid","transition":"none 0s ease 0s","z-index": '33',"height": '72px',"border-color":'black',transform:"translateY(10px)"}}>
            <table style={{width :"100%"}}>
                <thead>
                    <tr>
                        <td>{(boton.usuario__first_name)} {(boton.usuario__last_name)}</td>
                        <td>
                            {( validarUsuario(boton.usuario_id) ? <button type="button" className="btn btn-danger" onClick={()=>borrarMensaje(boton)}>Eliminar</button>:"" )}                            
                        </td>
                    </tr>
                    
                    <tr>
                        <td style={{width :"80%"}}>{(boton.observaciones)}</td>
                        <td align="left">{(boton.image)}</td>
                    </tr>
                </thead>
            </table>
        </li>
    
    );
    const listaChat = data.map((boton,index) => 
    
        <li className="active border-top" style={{"border-top":"1px solid","transition":"none 0s ease 0s","z-index": '33',"height": '72px',"border-color":'black',transform:"translateY(10px)"}}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={faUserCircle} />
                    </span>
                </div>
                
                <div style={{"margin-left": "2em"}}>
                    <table>
                        <tbody>
                            <tr>{boton.first_name} {boton.last_name}</tr>
                            <tr>
                                {( boton.en_linea ? <input type="checkbox" className="input-assumpte" checked disabled/>:<input type="checkbox" className="input-assumpte" disabled/> )}                            
                            </tr>
                            <tr>{(Moment(boton.fecha_ultima_sesion).format('YYYY-MM-DD hh:m'))}</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    );


    return ( 
        <Fragment>
            <div className="container col-12">
                <div className="row row no-gutters">
                    <div className="col-3">    
                        <aside className="sidebar_chat overflow-auto" id="barra_chat" data-spy="scroll" data-offset="0">
                            <nav className="nav_chat" id="nav_chat">
                            <ul className="ul_chat">
                                {listaChat}
                            </ul>
                            </nav>
                        </aside>
                    </div>
                    <div className="col-9" >
                        <div className="container col-12">
                            <div className="row align-items-center">
                                <div className="mensajes col-12 overflow-auto border rounded" style={{height:"90vh",transform:"translateY(10px)"}} data-spy="scroll" data-offset="0">
                                    <ul>
                                        {mensajesChat}
                                    </ul>
                                </div>
                            </div>
                            <br></br>
                            <div className="row align-items-end">
                                <div className="chat col-12">
                                    <div className="input-group mb-3">
                                        <input type="text" name="mensaje" onChange={cargaDatos} value={mensaje}  className="form-control" placeholder="Mensaje" aria-label="Mensaje" aria-describedby="button-addon2" />
                                        <div className="input-group-append">
                                            <div className="files btn btn-outline-secondary">
                                                    <Files
                                                    className='files-dropzone'
                                                    onChange={onFilesChange}
                                                    onError={onFilesError}
                                                    accepts={['image/png', '.pdf', 'audio/*']}
                                                    multiple
                                                    maxFiles={3}
                                                    maxFileSize={10000000}
                                                    minFileSize={0}
                                                    clickable
                                                    >
                                                <FontAwesomeIcon icon={faImage} />
                                                    </Files>
                                                </div>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>EnviarMensaje(datosMensajesEnviar)}>Enviar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </div>    
            </div>
        </Fragment>
        
    );
}
 
export default Home;