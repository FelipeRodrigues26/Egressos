import Axios from 'axios'
import React, { Component } from 'react'

export default class EgressoProfissional extends Component {
    
    state={
        displayFormAdicionar:'none',
        displayBtnAdicionar:'',
        listaHistoricoProfissional:[],

        historicoProfissional:{
            empresa:'',
            profissao:'',
            dataInicio:'',
            dataTermino:'',
            egresso:{}
        }
    }

    mostraFormAdicionar = () => {
        this.setState({
            displayFormAdicionar:'',
            displayBtnAdicionar:'none'
        })
    }
    escondeFormAdicionar = () => {
        this.setState({
            displayFormAdicionar:'none',
            displayBtnAdicionar:''
        })
    }
    
    async pegarHistoricoProfissional(){
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let resp =  await Axios.get('http://localhost:8080/profissional', config)
        
        this.setState({
            listaHistoricoProfissional:resp.data
        })
        
    }
    componentDidMount(){
        this.pegarHistoricoProfissional()
    }

    handleOnChange = evento => {
        let campo = evento.target.name;
        const hp = Object.assign({}, this.state.historicoProfissional)
         hp[campo] = evento.target.value;
        this.setState({
            historicoProfissional:hp
        })
    }

    handleSubmit = evento => {  
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let historicoProfissional = this.state.historicoProfissional
        historicoProfissional.egresso = this.props.egresso;
        Axios.post('http://localhost:8080/profissional/', historicoProfissional, config, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.escondeFormAdicionar()
            this.pegarHistoricoProfissional()   
        })
    }

    deletarHistoricoProfissional(id){
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        Axios.delete(`http://localhost:8080/profissional/${id}`, config
        ).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.pegarHistoricoProfissional()
        })
    }
    

    render() {
        return (
            <div>
                <div className="card-body">
                    {
                        this.state.listaHistoricoProfissional.map(hp =>{
                            return <div>
                                <strong><i className="fas fa-book" /> {hp.empresa}</strong>
                                    <p className="text-muted">
                                        {hp.profissao}<br/>
                                        {hp.dataInicio} - {hp.dataTermino} 
                                    </p>
                                
                                <a href="" class="btn btn-info" style={{ padding: '0.3em 0.6em', marginRight: '0.1em' }}><i class="fas fa-edit"></i></a>
                                <a href="" class="btn btn-danger" style={{ padding: '0.3em 0.6em' }} onClick={()=> this.deletarHistoricoProfissional(hp.id)}><i class="fas fa-trash"></i></a>
                                <hr />
                            </div>
                        })
                    }
                    <form className="form-horizontal" style={{display:this.state.displayFormAdicionar}}>
                        
                        <div className="form-group row">
                            <label htmlFor="inputEmpresa" className="col-sm-2 col-form-label">Empresa</label>
                            <div className="col-sm-10">
                                <input name="empresa"  value={this.state.historicoProfissional.empresa} type="text" className="form-control" id="inputEmpresa" placeholder="Empresa" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputProfissao" className="col-sm-2 col-form-label">Profissão</label>
                            <div className="col-sm-10">
                                <input name="profissao"  value={this.state.historicoProfissional.profissao} type="text" className="form-control" id="inputProfissao" placeholder="Profissão" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputDataInicio" className="col-sm-2 col-form-label">Data Inicio</label>
                            <div className="col-sm-10">
                                <input name="dataInicio" value={this.state.historicoProfissional.dataInicio} type="text" className="form-control" id="inputDataInicio" placeholder="Informe a data" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputDataTermino" className="col-sm-2 col-form-label">Data Término</label>
                            <div className="col-sm-10">
                                <input name="dataTermino" value={this.state.historicoProfissional.dataTermino} type="text" className="form-control" id="inputDataTermino" placeholder="Informe a data" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <a onClick={this.handleSubmit} className="btn btn-primary" style={{marginRight:'0.1em', color:'#FFF'}}>Salvar</a>
                                <a className="btn btn-danger" style={{color:'#FFF'}} onClick={this.escondeFormAdicionar}>Cancelar</a>
                            </div>
                        
                        </div>
                    </form>
                    <bottom onClick={this.mostraFormAdicionar} className="btn btn-primary" style={{display:this.state.displayBtnAdicionar}}><i className="fas fa-plus"></i> Adicionar experiência</bottom>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" /> Dica</strong>
                    <p className="text-muted">Mantenha seus dados sempre atualizados para obter melhores resultados.</p>
                </div>
                {/* /.card-body */}
            </div>
        )
    }
}
