import React from 'react'
import { BrowserRouter, Switch, Route, Router, useHistory,  } from 'react-router-dom'
import EstatisticaEgressos from './coordenador/EstatisticaEgressos'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import Footer from './Footer'
import Menu from './Menu'
import CadastroEgresso from './egresso/CadastroEgresso'
import  {history}  from './history'
import  PerfilEgresso from './egresso/PerfilEgresso'
import ListaOportunidades from './egresso/ListaOportunidades'


const  Routes = () =>  (
    <Switch>
        <Route exact path="/estatistica" component={EstatisticaEgressos} />
        <Route exact path="/cadastro" component={CadastroEgresso}/>
        <Route exact path="/perfil/:id" component={PerfilEgresso}/>
        <Route exact path="/oportunidades" component={ListaOportunidades}/>
        <Route component={NotFound} />
    </Switch>
)

export default Routes