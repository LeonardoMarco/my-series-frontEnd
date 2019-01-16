import React, { Component } from 'react'
import Api from '../Api'
import { Link } from 'react-router-dom'

export class Recover extends Component {

    constructor(props) {
        super(props)
        this.recover = this.recover.bind(this)
    }

    recover() {
        const email = {
            email: this.refs.email.value
        }

        Api.recover(email)
            .then(res => {
                alert('As informações para a recuperação de senha foram enviadas para o seu e-mail')
            }).catch(error => {
                alert(error.response.data.error)
            })
    }

    render() {
        return (
            <div>
                <button className="link" data-toggle="modal" data-target="#emailReset">Esqueci a senha</button>
                <div className="modal fade" id="emailReset" tabIndex="-1" role="dialog" aria-labelledby="emailReset" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="emailReset">Esqueceu a sua senha ?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="pr-5 pl-5 pb-5 mt-3" onSubmit={(e) => { this.recover(); e.preventDefault(); }}>
                                Digite o seu e-mail para recuperar a senha
                                <input className="form-control mt-2" ref="email" type="email" />
                                <input className="btn btn-danger btn-sm mx-auto mt-2" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ResetPassword extends Component {
    state = {
        error: '',
        loading: 'Recuperar senha'
    }

    constructor(props) {
        super(props)
        this.Reset = this.Reset.bind(this)
    }


    Reset(e) {
        e.preventDefault();


        if (this.refs.password.value !== this.refs.confirmPassword.value) {
            this.setState({ error: 'As senhas não conferem' })
        } else {
            const user = {
                password: this.refs.password.value,
                token: this.props.match.params.token,
                email: this.props.match.params.email
            };


            Api.resetPassword(user)
                .then((res) => {
                    alert('Sua senha foi alterada com sucesso')
                }).catch((error) => {
                    this.setState({ error: error.response.data.error })
                })
        }
    }

    render() {
        return (
            <div className="row bg-image">
                <div className="col-md-12 bg-color">
                    <div className="box-login ">
                        <img src="../../dist/images/logo.png" className="img-fluid" alt="logo" />

                        <form onSubmit={(e) => { this.Reset(e); }} className="text-light">
                            <div className="form-group mt-3">
                                <label>Nova senha</label>
                                <input ref="password" type="password" name="password" id="password" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label>Confirme a sua nova senha</label>
                                <input ref="confirmPassword" type="password" className="form-control" name="confirmPassword" id="confirmPassword" required />
                            </div>

                            <div className="form-group">
                                <input type="submit" className="btn form-control btn-danger" value={this.state.loading} />
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
                        <div>

                        </div>}
                        </div>
                </div>
            </div>
        )
    }
}