import './PainelAcesso.css';
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { history } from '../history';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
const PainelAcesso = props => {

    const regex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
    const [loading, setLoading] = useState("none")
    const [msgErro, setMsgErro] = useState(null)
    const [show, setShow] = useState(false);

    const handleSubmit = values => {
        setLoading("")
        axios.post('http://localhost:8080/login', values)
            .then(resp => {
                const { data } = resp
                if (resp) {
                    localStorage.setItem('app-token', resp.headers.authorization)
                    window.location.href = '/'
                }
            }).catch((erro) => {
                setMsgErro(erro.toString());
                setLoading("none")
            })
            .finally(() => {
                if (msgErro == null) {

                }
            }
            )
        console.log(msgErro)
    }


    const validations = yup.object().shape({
        login: yup.string().trim().matches(regex, 'CPF/CNPJ inválido').required('Informe CPF/CNPJ'),
        senha: yup.string().min(3, 'No mínimo 6 dígitos').required('Digite a senha')
    })
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <div >
                <a>Sign in <i className="fas fa-sign-in-alt"></i> </a>
                <span style={{ color: 'white' }}> ou</span>
                <a onClick={handleShow}> Cadastro </a>

                {/* Modal escolha de cadastro (Egresso ou Empresa)*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Escolha um cadastro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Link to="/cadastroEgresso" className="btn btn-primary" onClick={handleClose}>Egresso UFPA</Link>
                            <span> ou </span>   
                        <Link to="/cadastroEmpresa" className="btn btn-primary" onClick={handleClose}>Empresa Parceira</Link>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>

            </div>
            <Formik initialValues={{ login: '', senha: '' }} onSubmit={handleSubmit}
                validationSchema={validations}>
                <Form role="form" id="FormLogin">
                    <div className="card-body brand-text">
                        <div className="Form-Group">
                            <Field name="login" className="form-control" placeholder="CPF/CNPJ" />
                            <ErrorMessage component="span" name="login" />
                        </div>
                        <div className="Form-Group">
                            <Field name="senha" type="password" className="form-control" placeholder="Senha" />
                            <ErrorMessage component="span" name="senha" />
                            <div className="fa-2x" style={{ display: loading }}>
                                <i className="fas fa-spinner fa-spin" ></i><strong style={{ fontSize: '14px' }}> Carregando... </strong>
                            </div>
                        </div>
                        <span className="Error">{msgErro}</span>
                        <div className="card-group">
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </div>
                    </div>
                </Form>
            </Formik>


        </div>
    )
}
export default PainelAcesso

