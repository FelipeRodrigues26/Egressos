import React from 'react'
import { BrowserRouter, Switch, Route, Router, useHistory,  } from 'react-router-dom'
import EstatisticaEgressos from './coordenador/EstatisticaEgressos'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import Footer from './Footer'
import Menu from './Menu'
import CadastroEgresso from './egresso/CadastroEgresso'
import  {history}  from './history'
import  PerfilEgresso from './egresso/perfil/PerfilEgresso'
import ListaOportunidades from './egresso/ListaOportunidades'
import CadastroEmpresa from './parceiro/CadastroEmpresa'
import ManterOportunidades from './parceiro/ManterOportunidades'


const  Routes = () =>  (
    <Switch path="egresso">
        <Route exact path="/estatistica" component={EstatisticaEgressos} />
        <Route exact path="/cadastroEgresso" component={CadastroEgresso}/>
        <Route exact path="/perfil/:id" component={PerfilEgresso}/>
        <Route exact path="/oportunidades" component={ListaOportunidades}/>
        <Route exact path="/cadastroEmpresa" component={CadastroEmpresa} />
        <Route exact path="/gerenciarOportunidades/:id" component={ManterOportunidades} />
        
        <Route component={NotFound} />

    </Switch>
)

export default Routes