import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class PainelEgresso extends Component {
    state ={
        egresso:{}
    }
    token=null;
    constructor(){
        super()
        this.token = localStorage.getItem('app-token'); 
    }

    async pegarEgresso(){
        const config = { headers: {'Authorization': this.token} }
        let response = await axios.get('http://localhost:8080/egressos/'+this.props.infoUsuario.login,config)
            console.log(response.data)
            this.setState({
                egresso:response.data
            })
    }
    componentDidMount(){
        this.pegarEgresso()
    }
    render() {
        return (
            <div>
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <p href="/" style={{color:'#FFF'}} className="d-block">{this.state.egresso?.nome} 
                        <a onClick={ () =>{
                            localStorage.setItem('app-token','')
                            window.location.href ='/'
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
                        <Link to={`/perfil/${this.state.egresso.cpf}`} className="nav-link">
                                <i className="nav-icon fas fa-user-tie"/>
                                <p>
                                    Perfil
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/oportunidades'} className="nav-link">
                                <i className="nav-icon fas fa-book" />
                                    <p>
                                        Oportunidades
                                    </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon fas fa-question" />
                                <p>
                                    Questionário
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p>
                                Parceiros
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        )
    }
}
