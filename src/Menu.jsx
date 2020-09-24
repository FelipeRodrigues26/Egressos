import React, { Component } from 'react'
import PainelAcesso from './acesso/PainelAcesso'
import PainelEgresso from './egresso/PainelEgresso'
import PainelCoordenador from './coordenador/PainelCoordenador'
import UsuarioService from './UsuarioService'
import axios from "axios";
import jwt from "jsonwebtoken"

export default class Menu extends Component {
    
    painelGerado = null;
    token=null
    
    state = {
        usuarioLogado:false,
        usuario:{},
    }
    
  
    constructor(props){
        super(props)
        this.token = localStorage.getItem('app-token');     
        console.log(this.state.isTokenValido)
    }

    componentDidMount(){
        this.isLogado()
        this.pegarUsuarioPorToken()
      
    }
    
    async pegarUsuarioPorToken() {
        let usuario={};
        
        if(this.token!="" && this.token!=null ){
            console.log('entrou')
            var jwtDecoded = jwt.decode(this.token.replace('Bearer','').trim(),{complete:true})
            console.log(jwtDecoded.payload.sub)
            let login = jwtDecoded?.payload.sub
            const config = { headers: {'Authorization': this.token} }
              let response = await axios.get('http://localhost:8080/usuarios/'+login,config)
                this.setState({
                    usuario:response.data
                })
        }
    }


    async isLogado(){
        const config = { headers: {'Authorization': this.token} }
        let response =  await axios.get('http://localhost:8080/',config)
      
           this.setState({
            usuarioLogado:true
         })
            


          
      console.log(this.state.usuarioLogado)       
    }
   

    geraPainel(){
        const {usuario} = this.state;
        console.log(usuario)
        if(this.state.usuarioLogado){
            if (usuario?.role=='1') 
                this.painelGerado = <PainelEgresso infoUsuario={usuario}/>;
            else if(usuario?.role=='2')
                this.painelGerado = <PainelCoordenador  infoUsuario={usuario}/>;
        } else {
            this.painelGerado = <PainelAcesso/>;
        }
    }

    render() {
        this.geraPainel()
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="/" className="brand-link">
                        <img src="dist/img/ufpa.png" alt="Sistema Egressos" className="img-circle elevation-2" style={{ width: '50px', marginRight: '5%' }} />
                        {/* <span><a style={{color:'#FFF', fontSize:'20px', marginLeft:'1em'}} data-widget="pushmenu" href="#"><i className="fas fa-angle-left" /></a></span> */}
                        <span className="font-weight-light">Sistema Egressos</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3">
                            {this.painelGerado}
                        </div>

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library */}

                                {/* <li className="nav-header">Menu</li> */}
                                <li className="nav-item">
                                    <a href="pages/calendar.html" className="nav-link">
                                        <i className="nav-icon fas fa-calendar-alt" />
                                        <p>
                                            Banco de Talentos
                                            <span className="badge badge-info right">2</span>
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/gallery.html" className="nav-link">
                                        <i className="nav-icon far fa-newspaper" />
                                        <p>
                                            Notícias
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/gallery.html" className="nav-link">
                                        <i className="nav-icon fas fa-address-book" />
                                        <p>
                                            Contato
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/gallery.html" className="nav-link">
                                        <i className="nav-icon fas fa-info" />
                                        <p>
                                            Sobre
                                        </p>
                                    </a>
                                </li>

                                <li className="nav-header">Sistemas UFPA</li>
                                <li className="nav-item has-treeview menu-open">
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="./index3.html" className="nav-link">
                                                <img src="dist/img/sigaa.png" className=" elevation-2" style={{ marginRight: '6px' }} />
                                                <p>Sigaa</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="./index3.html" className="nav-link">
                                                <img src="dist/img/sagitta.png" className=" elevation-2" style={{ marginRight: '6px' }} />
                                                <p>Sagitta</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="./index3.html" className="nav-link">
                                                <img src="dist/img/universitec.png" className=" elevation-2" style={{ marginRight: '6px' }} />
                                                <p> Universitec</p>
                                            </a>
                                        </li>
                                       
                                        <li className="nav-item">
                                            <a href="./index3.html" className="nav-link">
                                                <img src="dist/img/editais-concursos.png" className=" elevation-2" style={{ marginRight: '6px' }} />
                                                <p>Editais e Concursos</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>

                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
        )
    }
}
