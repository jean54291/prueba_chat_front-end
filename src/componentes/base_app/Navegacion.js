import React, { Fragment, useState }  from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    const menu = [
        {'titulo':'Clientes','botones_sec':[{'titulo':'Crear Clientes'},{'titulo':'Consultar Clientes'}]}
    ]
    return ( 
        <Fragment>
            <Navbar expand="lg">
                <Navbar.Brand>APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {
                            menu.map(
                                (boton,index)=><NavDropdown key={index} title={boton.titulo} id="basic-nav-dropdown">
                                    { boton.botones_sec.map((btn_sec,llave)=><NavDropdown.Item key={llave}>
                                        <Link  to={'/cliente'}>{btn_sec.titulo}</Link>
                                    </NavDropdown.Item>
                                    )}
                                   
                                </NavDropdown>
                            )
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
}
 
export default Navegacion;