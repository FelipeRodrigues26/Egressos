import Axios from 'axios'
import React, { Component } from 'react'
import { useParams } from 'react-router';
 
export default class ManterOportunidades extends Component {

    state={
        empresa:{},
        displayFormAdicionar:'none',
        displayBtnAdicionar:'',

        listaOportunidades:[],

        oportunidade:{
            tipo:'',
            descricao:'',
            requisitos:'',
            empresa:{},
        }
    }
  
    async pegarEmpresa(id){

        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        const resp = await Axios.get('http://localhost:8080/empresas/' + id, config)
           
        this.setState({
            empresa:resp.data
        })
            

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

    componentDidMount(){
        let params = this.props.match.params;
        this.pegarEmpresa(params.id)
        this.pegarOportunidades(params.id)
    }

   
    
    async pegarOportunidades(cnpj){
       const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let resp =  await Axios.get('http://localhost:8080/oportunidades/buscaPorCNPJ/'+cnpj, config)
        
        this.setState({
            listaOportunidades:resp.data
        })

    }
    handleOnChange = evento => {
        let campo = evento.target.name;
        const op = Object.assign({}, this.state.oportunidade)
         op[campo] = evento.target.value;
        this.setState({
            oportunidade:op
        })
    }
    handleSubmit = evento => {  
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let oportunidade = this.state.oportunidade
        oportunidade.empresa = this.state.empresa;
        Axios.post('http://localhost:8080/oportunidades/', oportunidade, config, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.escondeFormAdicionar()
            this.pegarOportunidades(this.state.empresa.cnpj)
            
        })
    }

    deletarOportunidade(id){
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        Axios.delete(`http://localhost:8080/oportunidades/${id}`, config
        ).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.pegarOportunidades(this.state.empresa.cnpj)
        })
    }
    

    render() {
        return (
            <div>
                {JSON.stringify(this.state.oportunidade)}

                <div className="card-body">
                    {
                        this.state.listaOportunidades.map(op =>{
                            return <div>
                                <strong><i className="fas fa-book" /> {op.tipo}</strong>
                                    <p className="text-muted">
                                        {op.descricao}<br/>
                                        {op.requisitos}
                                    </p>


                                <bottom class="btn btn-info" style={{ padding: '0.3em 0.6em', marginRight: '0.1em' }}><i class="fas fa-edit"></i></bottom>
                                <bottom class="btn btn-danger" style={{ padding: '0.3em 0.6em' }} onClick={()=> this.deletarOportunidade(op.id)}><i class="fas fa-trash"></i></bottom>
                                <hr />
                            </div>
                        })
                    }
                    <form className="form-horizontal" style={{display:this.state.displayFormAdicionar}}>
                        <div className="form-group row">
                            <label className="col-sm-10 col-form-label">Tipo</label>
                            <div className="col-sm-4">
                                <select name="tipo" class="form-control" onChange={this.handleOnChange}>
                                    <option>Selecione</option>
                                    <option>Emprego</option>
                                    <option>Estágio</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputDescricao" className="col-sm-10 col-form-label">Descrição</label>
                            <div className="col-sm-6">
                                <input value={this.state.oportunidade.descricao} name='descricao' type="text" className="form-control" id="inputDescricao" placeholder="descrição" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputRequisitos" className="col-sm-12 col-form-label">Requisitos</label>
                            <div className="col-sm-6">
                                <textarea value={this.state.oportunidade.requisitos} name='requisitos' className="form-control" id="inputRequisitos" placeholder="Insira os requisitos" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-4">
                                <a onClick={this.handleSubmit} className="btn btn-primary" style={{marginRight:'0.1em', color:'#FFF'}}>Salvar</a>
                                <a className="btn btn-danger" style={{color:'#FFF'}} onClick={this.escondeFormAdicionar}>Cancelar</a>
                            </div>
                        
                        </div>
                    </form>

                    <bottom onClick={this.mostraFormAdicionar} className="btn btn-primary" style={{display:this.state.displayBtnAdicionar}}><i className="fas fa-plus"></i> Adicionar oportunidade</bottom>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" /> Dica</strong>
                    <p className="text-muted">Mantenha seus dados sempre atualizados para obter melhores resultados.</p>
               </div>
                {/* /.card-body */}
            </div>
        )
    }
}

