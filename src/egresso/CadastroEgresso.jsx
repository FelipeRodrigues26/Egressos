import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component, useState } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import history from '../history'
import * as yup from 'yup'

import './egresso.css'
const CadastroEgresso = props => {

    const regex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
    const [sucessCadastro, setSucess] = useState("none")
    const [msgErro, setMsgErro] = useState(null)


    const handleSubmit = values => {
        console.log(values)
        var egresso = {
            cpf:values.cpf,
            nome:values.nome,
            dataNascimento:values.dataNascimento,
            nomeMae:values.nomeMae,
            email:values.email,
            fone:values.fone,
            endereco:{
                rua:values.rua,
                numero:values.numero,
                bairro:values.bairro,
                cidade:values.cidade,
                
            },
            usuario:{
                login:values.cpf,
                senha:values.senha
            }
        }

        
        
       var dados =JSON.stringify(egresso);
       console.log(dados)
    
        axios.post('http://localhost:8080/egressos', dados,{
            headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
        }).then(resp =>{
            const {data} = resp
            if(resp.status=='201'){
                setSucess('block')
                window.location.href ='/'
            }   
        }).catch( (erro) => { 
            //setMsgErro(erro.toString()); 
            //setLoading("none")
        }).finally(() =>{
            if(msgErro==null){
            
            }
          }
        )
        
    }
    const validations = yup.object().shape({
        cpf:yup.string().trim().matches(regex,'CPF inválido').required('Informe CPF'),
        senha:yup.string().min(3,'No mínimo 6 digitos').required('Digite a senha'),
        senhaConfirm:yup.string().oneOf([yup.ref('senha'), null], 'Senhas não conferem').min(3,'No mínimo 6 digitos').required('Digite a senha'),
        nascimento:yup.date('Informe uma da válida').required('Informe uma data')
    })
    return (
        <>
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-sm-6">
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item ">Cadastro Egresso</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">

                                <div className="card-header">
                                    <h3 className="card-title">Cadastro Egresso</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <div class="alert alert-success" role="alert" style={{
                                    display:sucessCadastro
                                    }}>
                                    Realizado com sucesso.
                                </div>
                                <div className="card-body">
                                  <Formik initialValues={{
                                        cpf:'', nome:'n1',nascimento:'26101993', nomeMae:'M1',email:'teste@teste',fone:'f1', 
                                        rua:'R1', numero:'N1', bairro:'B1', cidade:'C1',login:'',senha:''}
                                    } onSubmit={handleSubmit} validationSchema={validations}>
                                    <Form role="form" id="FormCadastroEgresso">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="InputCPF">CPF</label>
                                                    <Field name="cpf" type="text" className="form-control" id="InputCPF" placeholder="Informe o CPF" />
                                                    <ErrorMessage component="span" name="cpf" />
                                                </div>
                                                <div className="form-group">
                                                     <label htmlFor="InputNome">Nome</label>
                                                     <Field name="nome" type="text" className="form-control" id="InputNome" placeholder="Informe o nome" />
                                                     <ErrorMessage component="span" name="nome" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <label htmlFor="InputDataNasc">Data Nasc.</label>
                                                            <Field name="nascimento"  className="form-control" id="InputDataNasc" placeholder="Nascimento" />
                                                            <ErrorMessage component="span" name="nascimento" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <label htmlFor="InputNomeMae">Nome mãe</label>
                                                            <Field name="nomeMae" type="text" className="form-control" id="InputNomeMae" placeholder="Informe nome da mãe" />
                                                            <ErrorMessage component="span" name="nomeMae" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <label htmlFor="InputEmail">Email</label>
                                                            <Field name="email" type="email" className="form-control" id="InputEmail" placeholder="Informe o email" />
                                                            <ErrorMessage component="span" name="email" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor="InputFone">Fone</label>
                                                            <Field name="fone" type="text" className="form-control" id="InputFone" placeholder="Informe o fone" />
                                                            <ErrorMessage component="span" name="fone" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="InputRua">Rua</label>
                                                    <Field name="rua" type="text" className="form-control" id="InputRua" placeholder="Enter rua" />
                                                    <ErrorMessage component="span" name="rua" />
                                                </div>
                                                <div className="form-group">
                                                <div className="row">
                                                        <div className="col-md-4">
                                                            <label htmlFor="InputNumero">Número</label>
                                                            <Field name="numero" type="text" className="form-control" id="InputNumero" placeholder="Número" />
                                                            <ErrorMessage component="span" name="numero" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <label htmlFor="InputBairro">Bairro</label>
                                                            <Field name="bairro" type="text" className="form-control" id="InputBairro" placeholder="Informe bairro" />
                                                            <ErrorMessage component="span" name="bairro" />
                                                        </div>
                                                    </div>   
                                                </div>
                                                <div className="form-group">
                                                        <label htmlFor="InputCidade">Cidade</label>
                                                        <Field name="cidade" type="text" className="form-control" id="InputCidade" placeholder="Informe cidade" />
                                                        <ErrorMessage component="span" name="cidade" />
                                                    
                                                </div>
                                                <div className="form-group">
                                                        <label htmlFor="InputSenha">Senha</label>
                                                        <Field name="senha" type="text" className="form-control" id="InputSenha" placeholder="Crie uma senha" />
                                                        <ErrorMessage component="span" name="senha" />
                                                    
                                                </div>
                                                <div className="form-group">
                                                        <label htmlFor="InputSenha">Confirmar senha</label>
                                                        <Field name="senhaConfirm" type="text" className="form-control" id="InputSenha" placeholder="Confirme a senha" />
                                                        <ErrorMessage component="span" name="senhaConfirm" />
                                                    
                                                </div>
                                               
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" htmlFor="exampleCheck1"><i>Li e concordo com o <a href="">termo</a> de uso.</i></label>
                                                </div>
                                            </div>

                                        </div>

                                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                                    </Form>
                                  </Formik>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                            {/* /.card */}
                            {/* Form Element sizes */}
                            <div className="card card-success">
                                <div className="card-header">
                                    <h3 className="card-title">Different Height</h3>
                                </div>
                                <div className="card-body">
                                    <input className="form-control form-control-lg" type="text" placeholder=".form-control-lg" />
                                    <br />
                                    <input className="form-control" type="text" placeholder="Default input" />
                                    <br />
                                    <input className="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>

                    </div>
                    {/* /.row */}
                    <div className="col-md-12">
                        {/* general form elements disabled */}
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title">General Elements</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <form role="form">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Text</label>
                                                <input type="text" className="form-control" placeholder="Enter ..." />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Text Disabled</label>
                                                <input type="text" className="form-control" placeholder="Enter ..." disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* textarea */}
                                            <div className="form-group">
                                                <label>Textarea</label>
                                                <textarea className="form-control" rows={3} placeholder="Enter ..." defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Textarea Disabled</label>
                                                <textarea className="form-control" rows={3} placeholder="Enter ..." disabled defaultValue={""} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* input states */}
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputSuccess"><i className="fas fa-check" /> Input with
                    success</label>
                                        <input type="text" className="form-control is-valid" id="inputSuccess" placeholder="Enter ..." />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputWarning"><i className="far fa-bell" /> Input with
                    warning</label>
                                        <input type="text" className="form-control is-warning" id="inputWarning" placeholder="Enter ..." />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputError"><i className="far fa-times-circle" /> Input with
                    error</label>
                                        <input type="text" className="form-control is-invalid" id="inputError" placeholder="Enter ..." />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* checkbox */}
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" />
                                                    <label className="form-check-label">Checkbox</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                    <label className="form-check-label">Checkbox checked</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" disabled />
                                                    <label className="form-check-label">Checkbox disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            {/* radio */}
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="radio1" />
                                                    <label className="form-check-label">Radio</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="radio1" defaultChecked />
                                                    <label className="form-check-label">Radio checked</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" disabled />
                                                    <label className="form-check-label">Radio disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* select */}
                                            <div className="form-group">
                                                <label>Select</label>
                                                <select className="form-control">
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Select Disabled</label>
                                                <select className="form-control" disabled>
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* Select multiple*/}
                                            <div className="form-group">
                                                <label>Select Multiple</label>
                                                <select multiple className="form-control">
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Select Multiple Disabled</label>
                                                <select multiple className="form-control" disabled>
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                        {/* general form elements disabled */}
                        {/* /.card */}
                    </div>


                </div>{/* /.container-fluid */}
            </section>
        </>

    )

}
export default CadastroEgresso;
