import Axios from 'axios'
import React, { Component } from 'react'

export default class EgressoQualificacoes extends Component {
     
    state={
        cpf:null,
        displayFormAdicionar:'none',
        displayBtnAdicionar:'',
        tiposQualificacao:[],
        listaQualificacoes:[],

        qualificacao:{
            qualificacaoTipo:{},
            descricao:'',
            anoConclusao:'',
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

    componentDidMount(){
        this.pegarTiposQualificacao()
    }

    componentDidUpdate(){
        if(this.state.cpf==null){
            console.log('fxsfgrgsdkalsjslafjsdhodsuhlfdshldjgkdfjhlkfjhlkfjdhlkfdjlgkjdslkj');
            this.state.cpf = this.props.egresso.cpf;
            this.pegarQualificacoes(this.state.cpf)
        }
    }
    
    

    async pegarTiposQualificacao(){
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let resp =  await Axios.get('http://localhost:8080/qualificacoes/tipos', config)
        
        this.setState({
            tiposQualificacao:resp.data
        })
    }
    async pegarQualificacoes(cpf){
        console.log(cpf)
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let resp =  await Axios.get('http://localhost:8080/qualificacoes/buscaPorCPF/'+cpf, config)
        
        this.setState({
            listaQualificacoes:resp.data
        })

        window.alert(JSON.stringify( this.state.listaQualificacoes))
    }
    handleOnChange = evento => {
        let campo = evento.target.name;
        const q = Object.assign({}, this.state.qualificacao)
        if(campo==="qualificacaoTipo")
            q[campo] = JSON.parse(evento.target.value);
        else
            q[campo] = evento.target.value;
        this.setState({
            qualificacao:q
        })
    }
    handleSubmit = evento => {  
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        let qualificacao = this.state.qualificacao
        qualificacao.egresso = this.props.egresso;
        Axios.post('http://localhost:8080/qualificacoes/', qualificacao, config, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.escondeFormAdicionar()
            this.pegarQualificacoes(this.state.cpf)
            
        })
    }

    deletarQualificacao(id){
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        Axios.delete(`http://localhost:8080/qualificacoes/${id}`, config
        ).then(resp => {
            const { data } = resp
            
        }).catch((erro) => {
            
        }).finally(() => {
            this.pegarQualificacoes(this.state.cpf)
        })
    }
    

    render() {
        return (
            <div>
                <div className="card-body">
                    {
                        this.state.listaQualificacoes.map(q =>{
                            return <div>
                                <strong><i className="fas fa-book" /> {q.qualificacaoTipo.descricao}</strong>
                                    <p className="text-muted">
                                        {q.descricao}<br/>
                                        {q.anoConclusao}
                                    </p>


                                <bottom class="btn btn-info" style={{ padding: '0.3em 0.6em', marginRight: '0.1em' }}><i class="fas fa-edit"></i></bottom>
                                <bottom class="btn btn-danger" style={{ padding: '0.3em 0.6em' }} onClick={()=> this.deletarQualificacao(q.id)}><i class="fas fa-trash"></i></bottom>
                                <hr />
                            </div>
                        })
                    }
                    <form className="form-horizontal" style={{display:this.state.displayFormAdicionar}}>
                        <div className="form-group row">
                            <label className="col-sm-10 col-form-label">Tipo</label>
                            <div className="col-sm-4">
                                <select name="qualificacaoTipo" class="form-control" onChange={this.handleOnChange}>
                                    <option value={null}>Selecione</option>
                                    {
                                    this.state.tiposQualificacao.map(q =>{
                                        return <option value={JSON.stringify(q)}>{q.descricao}</option>
                                    })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputDescricao" className="col-sm-10 col-form-label">Descrição</label>
                            <div className="col-sm-8">
                                <input value={this.state.qualificacao.descricao} name='descricao' type="text" className="form-control" id="inputDescricao" placeholder="descrição" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAnoConclusao" className="col-sm-12 col-form-label">Ano Conclusão</label>
                            <div className="col-sm-3">
                                <input value={this.state.qualificacao.anoConclusao} name='anoConclusao' type="text" className="form-control" id="inputAnoConclusao" placeholder="Ano conclusão" onChange={this.handleOnChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-4">
                                <a onClick={this.handleSubmit} className="btn btn-primary" style={{marginRight:'0.1em', color:'#FFF'}}>Salvar</a>
                                <a className="btn btn-danger" style={{color:'#FFF'}} onClick={this.escondeFormAdicionar}>Cancelar</a>
                            </div>
                        
                        </div>
                    </form>

                    <bottom onClick={this.mostraFormAdicionar} className="btn btn-primary" style={{display:this.state.displayBtnAdicionar}}><i className="fas fa-plus"></i> Adicionar qualificação</bottom>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" /> Dica</strong>
                    <p className="text-muted">Mantenha seus dados sempre atualizados para obter melhores resultados.</p>
               </div>
                {/* /.card-body */}
            </div>
        )
    }
}

