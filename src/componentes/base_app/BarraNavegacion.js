import React, { Fragment, useState, useEffect } from 'react'
import {Navbar, Nav, NavDropdown, Dropdown, Image } from 'react-bootstrap';
import {cerraSesion} from '../../actions/barraNavegacionActions';
import '../../styles/app.css'
// actions de redux
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

const BarraNavegacion = () => {
    // boton usuario nav
    // --------------
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
         
        </a>
      ));     
    // --------------



    // redux
    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();
    const history = useHistory();
    const cerrarSesion = (datosUsuario) => dispatch(cerraSesion(datosUsuario));
    
    const MostrarMenu = useSelector((state) => state.menuUsuario.mostrarMenu); 
    const listaDeOpciones = useSelector((state) => state.menuUsuario.opcionesMenu); 
    const datosUsuarioLogueado = useSelector((state)=> state.usuarioLogueado.usuarioLogueado);
    const redireccionar = (userDatos) => {
        if(userDatos){
            history.push('/'+userDatos.nombreModulo+'/'+userDatos.funcion);
        }else{
            history.push('/home');
        }
        
    }
    const sesionoff = () => {
        cerrarSesion(datosUsuarioLogueado)
        history.push('/');
    }
   
    return ( 
        <Fragment>
            {
                MostrarMenu
                ?
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand className="col-sm-2 col-md-2">
                        <Dropdown key='Secondary'>
                        {/* <Image src={datosUsuarioLogueado[0].imagen ? datosUsuarioLogueado[0].name : <FontAwesomeIcon icon={faUserCog} />} roundedCircle/> */}
                                <Dropdown.Toggle as={CustomToggle}> <FontAwesomeIcon icon={faUserCog} /> {datosUsuarioLogueado[0].name}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Mi Perfil</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>sesionoff()}>Cerrar Sesion</Dropdown.Item>
                                </Dropdown.Menu>
                            
                        </Dropdown>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="col-sm-2 col-md-2" />
                    <Navbar.Collapse id="basic-navbar-nav" className="col-sm-10 col-md-8">
                        <Nav>
                            <Nav.Item><Nav.Link onClick={()=>redireccionar(false)}>Inicio</Nav.Link></Nav.Item>
                        {
                            
                            listaDeOpciones[0].map(
                                (boton,index)=><NavDropdown key={index} title={boton.titulo} id="basic-nav-dropdown">
                                    { boton.botones_sec.map((btn_sec,llave)=><NavDropdown.Item key={llave}>
                                        <span onClick={()=>redireccionar(btn_sec)}>{btn_sec.titulo}</span>
                                    </NavDropdown.Item>
                                    )}
                                   
                                </NavDropdown>
                            )
                        }
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
                :
                null
            }
            
        </Fragment>
     );
}
 
export default BarraNavegacion;