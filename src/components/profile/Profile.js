import React, { Component } from 'react'
import Api from '../Api'

class Profile extends Component {
    state = {
        active: '',
        file: 'http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030', sendFile: '',
        error: '',
        name: '',
        email: '',
        image: ''
    }

    constructor(props) {
        super(props)
        this.editImageProfile = this.editImageProfile.bind(this)
        this.editProfile = this.editProfile.bind(this)
    }

    componentDidMount() {
        Api.profile()
            .then(res => {
                this.setState({ name: res.data.name, email: res.data.email, image: res.data.image })
            }).catch(error => {
                console.log(error.responsa.data.error)
            })
    }


    editImageProfile(event) {
        if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            })

            var imageProfile = new FormData();
            imageProfile.append("image", event.target.files[0]);

            Api.imageProfile(imageProfile)
                .then(res => {
                    alert('Imagem alterada com sucesso')
                    document.location.reload(true)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
        } else if (event.target.files[0].type !== 'image/png' || event.target.files[0].type !== 'image/jpeg') {
            this.setState({ error: 'Selecione apenas imagens' })
        }
    }

    removeImageProfile(e) {
        e.preventDefault();
        if (window.confirm('Deseja realmente excluir a sua foto ?') === true) {
            const removeImage = {
                removeImage: ''
            }

            Api.removeImageProfile(removeImage)
                .then(res => {
                    alert('Imagem de perfil removida com sucesso')
                    document.location.reload(true)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
        }
    }

    editProfile(e, type) {
        e.preventDefault();

        switch (type) {
            case 'name':
                const name = {
                    name: this.refs.nameProfile.value
                }
                Api.nameProfile(name)
                    .then(res => {
                        alert('Nome atualizado com sucesso')
                        document.location.reload(true)
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                break;
            case 'email':
                const email = {
                    email: this.refs.emailProfile.value
                }
                Api.emailProfile(email)
                    .then(res => {
                        alert('E-mail atualizado com sucesso')
                        document.location.reload(true)
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                break;
            case 'password':
                const password = {
                    password: this.refs.passwordProfile.value
                }
                Api.passwordProfile(password)
                    .then(res => {
                        alert('Senha atualizado com sucesso')
                        document.location.reload(true)
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                break;
            default:
                console.log('Erro default')
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.image === '' ? <img className="img-circle img-profile" src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/null.jpg'} width="30" height="30" alt="img-user" onClick={() => this.setState({ active: 'show animated-s fadeInLeftBig-s' })}   /> : <img className="img-circle img-profile" src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/' + this.state.image} width="30" height="30" alt="img-user" onClick={() => this.setState({ active: 'show animated-s fadeInLeftBig-s' })}   />}

                <div className={this.state.active + ' w-100 colum bg-danger position-absolute'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>
                                {this.state.image === '' ? <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/null.jpg'} width="200" height="200" className="img-fluid img-circle mt-3 img-newGroup" alt="logo" /> : <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/' + this.state.image} width="200" height="200" className="img-fluid img-circle mt-3 img-newGroup" alt="logo" />}
                                <div>
                                    <label htmlFor="selecao-arquivo-profile" className="mt-3 label-file btn btn-dark btn-sm ">Selecionar uma imagem &#187;</label>
                                    <input id="selecao-arquivo-profile" className="input-file d-none" type='file' accept="image/png, image/jpeg" ref="image" onChange={this.editImageProfile} />
                                </div>
                                <div>
                                    <form onSubmit={(e) => this.removeImageProfile(e)} >
                                        <input type="submit" className="btn btn-light btn-sm" value="Excluir foto" />
                                    </form>
                                </div>
                            </center>
                            {this.state.error && <div className="alert alert-danger text-center mt-3 ml-5 mr-5" role="alert">
                                {this.state.error}
                            </div>}
                        </div>
                        <div className="col-md-12 p-5">
                            <form onSubmit={(e) => this.editProfile(e, 'name')}>
                                <div className="input-group mb-3">
                                    <input type="text" ref="nameProfile" className="form-control form-control-sm" placeholder={this.state.name}  aria-label="Seu nome" aria-describedby="button-addon1" />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark btn-sm" type="submit" id="button-addon1"><i className="fas fa-check"></i></button>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={(e) => this.editProfile(e, 'email')}>
                                <div className="input-group mb-3">
                                    <input type="email" ref="emailProfile" className="form-control form-control-sm" placeholder={this.state.email}  aria-label="Seu e-mail" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark btn-sm" type="submit" id="button-addon2"><i className="fas fa-check"></i></button>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={(e) => this.editProfile(e, 'password')}>
                                <div className="input-group mb-3">
                                    <input type="password" ref="passwordProfile" className="form-control form-control-sm" placeholder="Alterar sua senha" aria-label="Alterar sua senha" aria-describedby="button-addon3" />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark btn-sm" type="submit" id="button-addon3"><i className="fas fa-check"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile