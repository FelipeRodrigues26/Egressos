import Axios from 'axios';
import React, { Component } from 'react'

export default class PainelCoordenador extends Component {
    
    state ={
        coordenador:[]
    }
    token=null;
    constructor(){
        super()
        this.token = localStorage.getItem('app-token'); 
    }

    async pegarCoordenador(){
        const config = { headers: {'Authorization': this.token} }
        let response = await Axios.get('http://localhost:8080/coordenador/buscaPorLogin/'+this.props.infoUsuario.login,config)
            console.log(response.data)
            this.setState({
                coordenador:response.data
            })
    }
    componentDidMount(){
        this.pegarCoordenador()
    }
    
    
    render() {
        return (
            <div>
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                         <p href="/" style={{color:'#FFF'}} class="d-block">{this.state.coordenador.nome} <a onClick={ () =>{
                            localStorage.setItem('app-token','')
                            window.location.reload()
                            }
                        }> <i className="fas fa-sign-out-alt"></i> </a></p>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library */}

                        {/* <li className="nav-header">Menu</li> */}
                        <li className="nav-item">
                            <a href="pages/calendar.html" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Dados Estatísticos
                                            <span className="badge badge-info right">2</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Validar Oportunidades
                                        </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon far fa-imagenav-icon fas fa-edit" />
                                <p>
                                    Gerar Questionario
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>
                                    Egressos
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        )
    }
}
