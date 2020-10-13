import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component, useState } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import history from '../history'
import * as yup from 'yup'

const CadastroEmpresa = props => {

    const regex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
    const [sucessCadastro, setSucess] = useState("none")
    const [msgErro, setMsgErro] = useState(null)


    const handleSubmit = values => {
        console.log(values)
        var empresa = {
            cnpj:values.cnpj,
            areaAtuacao:values.areaAtuacao,
            nomeFantasia:values.nomefantasia,
            email:values.email,
            fone:values.fone,
            razaoSocial:values.razaoSocial,
            endereco:{
                rua:values.rua,
                numero:values.numero,
                bairro:values.bairro,
                cidade:values.cidade,
                
            },
            usuario:{
                login:values.cnpj,
                senha:values.senha
            }
        }

        
        
       var dados =JSON.stringify(empresa);
       console.log(dados)
        axios.post('http://localhost:8080/empresas', dados,{
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
        cnpj:yup.string().trim().matches(regex,'CNPJ inválido').required('Informe CNPJ'),
        senha:yup.string().min(3,'No mínimo 6 digitos').required('Digite a senha'),
        senhaConfirm:yup.string().oneOf([yup.ref('senha'), null], 'Senhas não conferem').min(3,'No mínimo 6 digitos').required('Digite a senha'),
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
                                <li className="breadcrumb-item ">Cadastro Empresa</li>
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
                                    <h3 className="card-title">Cadastro Empresa</h3>
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
                                        cnpj:'',areaAtuacao:'', nomeFantasia:'',razaoSocial:'', email:'teste@teste',fone:'f1', 
                                        rua:'R1', numero:'N1', bairro:'B1', cidade:'C1',login:'',senha:''}
                                    } onSubmit={handleSubmit} validationSchema={validations}>
                                    <Form role="form" id="FormCadastroEgresso">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="InputCNPJ">CNPJ</label>
                                                    <Field name="cnpj" type="text" className="form-control" id="InputCNPJ" placeholder="Informe o CNPJ" />
                                                    <ErrorMessage component="span" name="cnpj" />
                                                </div>
                                                <div className="form-group">
                                                     <label htmlFor="InputNomeFantasia">Nome Fantasia</label>
                                                     <Field name="nomeFantasia" type="text" className="form-control" id="InputNomeFantasia" placeholder="Informe o nome" />
                                                     <ErrorMessage component="span" name="nomeFantasia" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <label htmlFor="InputAreaAtuacao">Área atuação</label>
                                                            <Field name="areaAtuacao" type="text" className="form-control" id="InputAreaAtuacao" placeholder="Informe a área atuacao" />
                                                            <ErrorMessage component="span" name="areaAtuacao" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor="InputRazaoSocial">Razão social</label>
                                                            <Field name="razaoSocial"  className="form-control" id="InputRazaoSocial" placeholder="Informa Razão Social" />
                                                            <ErrorMessage component="span" name="razaoSocial" />
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
                            
                        </div>

                    </div>
                    {/* /.row */}
                   
                </div>{/* /.container-fluid */}
            </section>
        </>

    )

}
export default CadastroEmpresa;
