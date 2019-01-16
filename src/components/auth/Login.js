import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Api from '../Api'
import {Recover} from './Reset'


class Login extends Component {

    state = {
        error: '',
        loading: 'Entrar'
    }

    constructor(props) {
        super(props)
        this.logar = this.logar.bind(this)
    }

    componentDidMount() {
        localStorage.clear();
    }

    logar() {
        this.setState({error: '', loading: 'Carregando...'})
        const login = {
            email: this.refs.email.value,
            password: this.refs.senha.value
        }


        Api.login(login)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                window.location.href = '/home'
            }).catch(error => { 
                if(error.response === undefined){
                    this.setState({error: 'Ocorreu um erro. Tente novamente mais tarde', loading: 'Entrar'})
                } else{
                    this.setState({error: error.response.data.error, loading: 'Entrar'})
                }
            })
    }

    render() {
        return (
            <div className="row bg-image">
                <div className="col-md-12 bg-color">
                    <div className="box-login ">
                        <img src="./dist/images/logo.png" className="img-fluid" alt="logo" />

                        <form onSubmit={(e) => { this.logar(); e.preventDefault(); }} className="text-light">
                            <div className="form-group mt-3">
                                <label>E-mail</label>
                                <input ref="email" type="text" name="email" id="email" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input ref="senha" type="password" className="form-control" name="senha" id="senha" required />
                            </div>

                            <div className="form-group">
                                <input type="submit" value={this.state.loading} className="btn form-control     btn-danger" />
                            </div>
                        </form>
                        <center className="mt-3">
                            <small>
                                <Link to="/register">Cadastrar uma conta </Link> 
                                <Recover />
                            </small>
                        </center>
                        <div>
                            {this.state.error && <div className="alert alert-danger text-center mt-3" role="alert">
                                {this.state.error}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;