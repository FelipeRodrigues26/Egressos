import React from 'react'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import EstatisticaEgressos from './coordenador/EstatisticaEgressos'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import Footer from './Footer'
import Menu from './Menu'
import CadastroEgresso from './egresso/CadastroEgresso'
import App from './App'
import { render } from 'react-dom'
import history from './history'

const  Routes = () =>  (
    <Router history={history}>
        <Switch > 
            <Route component={EstatisticaEgressos} exact path="/estatistica"/>
            <Route component={CadastroEgresso} exact path="/cadastro"/>
            <PrivateRoute component={NotFound} />
        </Switch>
    </Router>
)

export default Routes