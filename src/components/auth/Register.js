import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Api from '../Api'


class Register extends Component {
    state = {
        error: ''
    }

    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }



    register() {
        if (this.refs.confirm_senha.value !== this.refs.senha.value) {
            this.setState({error: 'As senhas não conferem'})
        } else {
            const user = {
                name: this.refs.nome.value,
                email: this.refs.email.value,
                password: this.refs.senha.value,
            };

            Api.register(user)
                .then((res) => {
                    alert('Conta cadastrada com sucesso')
                }).catch((error) => {
                    if(error.response === undefined){
                        this.setState({error: 'Ocorreu um erro. Tente novamente mais tarde'})
                    }else{
                        this.setState({error: error.response.data.error})
                    }
                })
        }
    }

    render() {
        return (
                <div className="row bg-image">
                    <div className="col-md-12 bg-color">
                        <div className="box-login">
                            <img src="./dist/images/logo.png" className="img-fluid" alt="logo" />
                            <form onSubmit={(e) => {this.register(); e.preventDefault();}} className="text-light">
                                <div className="form-group mt-3">
                                    <label>Nome</label>
                                    <input type="text" ref="nome" name="nome" id="nome" className="form-control" required/>
                                </div>

                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input ref="email" type="email" name="email" id="email" className="form-control" required/>
                                </div>

                                <div className="form-group">
                                    <label>Senha</label>
                                    <input ref="senha" type="password" className="form-control" name="password" id="senha" required/>
                                </div>

                                <div className="form-group">
                                    <label>Confirme sua senha</label>
                                    <input ref="confirm_senha" type="password" className="form-control" name="confirm_password" id="confirm_senha" required/>
                                </div>

                                <div className="form-group">
                                    <input type="submit"  value="Cadastrar" className="btn form-control btn-danger"/>
                                </div>
                            </form>
                            {this.state.error && <div className="alert alert-danger text-center mt-3" role="alert">
                                {this.state.error}
                            </div>}
                            <center className="mt-3">
                                <small>
                                    <Link to="/">Voltar para login</Link>
                                </small>
                            </center>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Register