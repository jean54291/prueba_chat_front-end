import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import React from 'react';
import Home from './componentes/base_app/Home';
import Login from './componentes/login/Login';
import ListaUsuarios from './componentes/usuarios/ListaUsuarios'
import VistaNuevoUsuario from './componentes/usuarios/VistaNuevoUsuario'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import axios from 'axios';
// redux
import {Provider} from 'react-redux';
import store from './store';
import BarraNavegacion from './componentes/base_app/BarraNavegacion';
import Footer from './componentes/base_app/Footer';

// css
import './App.css'
function App() {


  return (
  
    <Router>
      <Provider store={store}>
        <BarraNavegacion />
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route  exact path="/home" component={Home}/>
          <Route  exact path="/usuarios" component={ListaUsuarios}/>
          <Route  exact path="/usuarios/lista" component={ListaUsuarios}/>
          <Route  exact path="/usuarios/nuevo" component={VistaNuevoUsuario}/>
          
        </Switch>
        <Footer />
      </Provider>
    </Router>

  );
}

export default App;
