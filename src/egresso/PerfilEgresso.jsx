import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component, createRef, useEffect, useState } from 'react'
import './egresso.css'
import * as yup from 'yup'
import { useParams } from 'react-router'
import Axios from 'axios'
import './egresso.css'
import EgressoQualificacoes from './EgressoQualificacoes'
import EgressoProfissional from './EgressoProfissional'

const PerfilEgresso = props => {

    const [sucessAlteracao, setSucess] = useState("none")
    const [msgErro, setMsgErro] = useState(null)
    const [egresso, setEgresso] = useState({})
    const [camposHabilitados, setCamposHabilitados] = useState(false)
    const [displaySalvar, setDisplaySalvar] = useState('none');
    const [displayAtualizar, setDisplayAtualizar] = useState('block');
    const { id } = useParams();

    useEffect(() => {
        pegarEgresso()
    }, [])

    const habilitaDesabilitaCampos = () => {
        setCamposHabilitados(!camposHabilitados)
        document.getElementById("InputEmail").focus()
    }
    const pegarEgresso = () => {
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }
        Axios.get('http://localhost:8080/egressos/' + id, config)
            .then((resp) => {
                setEgresso(resp.data)
            })

    }

    const validations = yup.object().shape({
        //dataNascimento:yup.date('Informe uma data válida').required('Campo obrigatório'),
        //nome:yup.string('Informe um nome válido').required('Campo obrigatório')
    })

    const handleOnChange = evento => {
        const e = Object.assign({}, egresso)
        let campo = evento.target.name;
        if (campo === 'rua' || campo === 'numero' || campo === 'bairro' || campo === 'cidade')
            e.endereco[campo] = evento.target.value;
        else
            e[campo] = evento.target.value;

        setEgresso(e)

        //mostra botão salvar sempre que algo for alterado
        setDisplaySalvar('block')
        setDisplayAtualizar('none')
    }
    const handleSubmit = values => {
        console.log(egresso)
        const token = localStorage.getItem('app-token');
        const config = { headers: { 'Authorization': token } }

        Axios.put('http://localhost:8080/egressos/' + id, egresso, config, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            const { data } = resp
            console.log(resp.status)
            if (resp.status == '204') {
                setSucess('block')
            }
        }).catch((erro) => {
            //setMsgErro(erro.toString()); 
            //setLoading("none")
        }).finally(() => {
            setTimeout(function () {
                setSucess('none');
            }, 2000);
            setDisplaySalvar('none')
            setDisplayAtualizar('block')
            habilitaDesabilitaCampos()
        }
        )

    }
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Perfil</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Perfil Egresso</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline ">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user1-128x128.jpg" alt="User profile picture" />
                                    </div>

                                    <h3 className="profile-username text-center">{egresso.nome}</h3>
                                    <p className="text-muted text-center">Sistemas de Informação</p>
                                    <div className="text-center">
                                        <span className="btn btn-secondary" style={{ marginBottom: '2rem' }}>Egresso</span>
                                    </div>
                                    <ul className="list-group list-group-unbordered mb-3">

                                        <li className="list-group-item">
                                            Avaliação<a className="float-right">
                                                <i class="fas fa-star" style={{ color: '#dfce35' }}></i>
                                                <i class="fas fa-star" style={{ color: '#dfce35' }}></i>
                                                <i class="fas fa-star" style={{ color: '#dfce35' }}></i>
                                            </a>
                                        </li>

                                    </ul>
                                    <a href="#" className="btn btn-primary btn-block">Acessar lates</a>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>

                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item"><a className="nav-link active" href="#dadosPessoais" data-toggle="tab">Dados Pessoais</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#qualificacoes" data-toggle="tab">Qualificações</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#profissional" data-toggle="tab">Experiência Profissional</a></li>
                                    </ul>
                                </div>{/* /.card-header */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="dadosPessoais">
                                            <div className="row">
                                                {/* left column */}
                                                <div className="col-md-12">
                                                    {/* general form elements */}
                                                    <div className="card card-primary">
                                                        <div class="alert alert-success" role="alert" style={{
                                                            display: sucessAlteracao
                                                        }}>
                                                            Salvo.
                                                            </div>
                                                        <div className="card-body">
                                                            <Formik initialValues={{}}
                                                                validationSchema={validations}>
                                                                <Form role="form" id="FormEditEgresso">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label htmlFor="InputCPF">CPF</label>
                                                                                <Field name="cpf" value={egresso?.cpf} type="text" className="form-control" id="InputCPF" placeholder="Informe o CPF" readOnly={true} />
                                                                                <ErrorMessage component="span" name="cpf" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="InputNome">Nome</label>
                                                                                <Field name="nome" value={egresso?.nome} type="text" className="form-control" id="InputNome" placeholder="Informe o nome" readOnly={true} />
                                                                                <ErrorMessage component="span" name="nome" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label htmlFor="InputDataNasc">Data Nasc.</label>
                                                                                        <Field name="datNascimento" value={egresso?.dataNascimento} className="form-control" id="InputDataNasc" placeholder="Nascimento" onChange={handleOnChange} readOnly={true} />
                                                                                        <ErrorMessage component="span" name="dataNascimento" />
                                                                                    </div>
                                                                                    <div className="col-md-8">
                                                                                        <label htmlFor="InputNomeMae">Nome mãe</label>
                                                                                        <Field name="nomeMae" value={egresso?.nomeMae} type="text" className="form-control" id="InputNomeMae" placeholder="Informe nome da mãe" onChange={handleOnChange} readOnly={true} />
                                                                                        <ErrorMessage component="span" name="nomeMae" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <div className="col-md-8">
                                                                                        <label htmlFor="InputEmail">Email</label>
                                                                                        <Field name="email" value={egresso?.email} type="email" className="form-control" id="InputEmail" placeholder="Informe o email" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                        <ErrorMessage component="span" name="email" />
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label htmlFor="InputFone">Fone</label>
                                                                                        <Field name="fone" value={egresso?.fone} type="text" className="form-control" id="InputFone" placeholder="Informe o fone" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                        <ErrorMessage component="span" name="fone" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label htmlFor="InputRua">Rua</label>
                                                                                <Field name="rua" value={egresso?.endereco?.rua} type="text" className="form-control" id="InputRua" placeholder="Enter rua" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                <ErrorMessage component="span" name="rua" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label htmlFor="InputNumero">Número</label>
                                                                                        <Field name="numero" value={egresso?.endereco?.numero} type="text" className="form-control" id="InputNumero" placeholder="Número" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                        <ErrorMessage component="span" name="numero" />
                                                                                    </div>
                                                                                    <div className="col-md-8">
                                                                                        <label htmlFor="InputBairro">Bairro</label>
                                                                                        <Field name="bairro" value={egresso?.endereco?.bairro} type="text" className="form-control" id="InputBairro" placeholder="Informe bairro" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                        <ErrorMessage component="span" name="bairro" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="InputCidade">Cidade</label>
                                                                                <Field name="cidade" value={egresso?.endereco?.cidade} type="text" className="form-control" id="InputCidade" placeholder="Informe cidade" onChange={handleOnChange} readOnly={!camposHabilitados} />
                                                                                <ErrorMessage component="span" name="cidade" />

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <button id="btnAtualizar" type="bottom" onClick={habilitaDesabilitaCampos} className="btn btn-primary" style={{ display: displayAtualizar }}>Atualizar</button>
                                                                    <button id="btnSalvar" type="bottom" onClick={handleSubmit} className="btn btn-primary" style={{ display: displaySalvar }}>Salvar</button>
                                                                </Form>
                                                            </Formik>
                                                        </div>
                                                        <div className="card-footer"></div>
                                                    </div>
                                                    {/* /.card */}

                                                </div>

                                            </div>
                                            {/* /.row */}

                                        </div>
                                        {/* /.tab-pane */}
                                        <div className="tab-pane" id="qualificacoes">
                                            {/* About Me Box */}
                                            <div className="card card-primary">
                                                <EgressoQualificacoes egresso={egresso}/>
                                            </div>

                                        </div>
                                        {/* /.tab-pane */}
                                        <div className="tab-pane" id="profissional">
                                               <EgressoProfissional egresso={egresso}/>
                                        </div>
                                        {/* /.tab-pane */}
                                    </div>
                                    {/* /.tab-content */}
                                </div>{/* /.card-body */}
                            </div>
                            {/* /.nav-tabs-custom */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>

        </>
    )

}
export default PerfilEgresso;

