import React, { Component } from 'react'
import Api from '../Api'

class Profile extends Component {
    state = {
        active: '',
        membros: 'salve',
        file: 'http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030', sendFile: '',
        error: ''
    }

    constructor(props) {
        super(props)
        this.editImage = this.editImage.bind(this)
        this.editProfile = this.editProfile.bind(this)
    }

    componentDidMount() {

    }

    editImage(event) {
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

    editProfile(e, type) {
        e.preventDefault();

        switch (type) {
            case 'name':
                const name = {
                    name: this.refs.nameProfile.value
                }
                Api.nameProfile(name)
                    .then(res => {
                        // const genres = res.data;
                        // this.setState({ genres });
                        alert('Nome atualizado com sucesso')
                        document.location.reload(true)
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response)
                    })
                break;
            case 'email':
                const email = {
                    email: this.refs.emailProfile.value
                }
                Api.emailProfile(email)
                    .then(res => {
                        // const genres = res.data;
                        // this.setState({ genres });
                        alert('email atualizado com sucesso')
                        document.location.reload(true)
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response)
                    })
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <img className="img-fluid img-circle" src="http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030" width="30" alt="img-user" onClick={() => this.setState({ active: 'show animated-s fadeInLeftBig-s' })} data-toggle="modal" data-target="#exampleModal" />

                <div className={this.state.active + ' w-100 colum bg-danger position-absolute'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>
                                <img src={this.state.file} width="200" className="img-fluid img-circle mt-3 img-newGroup" alt="logo" />
                                <div>
                                    <label htmlFor="selecao-arquivo" className="mt-3 label-file btn btn-dark btn-sm ">Selecionar uma imagem &#187;</label>
                                    <input id="selecao-arquivo" className="input-file d-none" type='file' accept="image/png, image/jpeg" ref="image" onChange={this.editImage} />
                                </div>
                            </center>
                            {this.state.error && <div className="alert alert-danger text-center mt-3 ml-5 mr-5" role="alert">
                                {this.state.error}
                            </div>}
                        </div>
                        <div className="col-md-12 p-0">
                            <form onSubmit={(e) => this.editProfile(e, 'name')}>
                                <div class="input-group mb-3">
                                    <input type="text" ref="nameProfile" class="form-control form-control-sm" placeholder="Seu nome" aria-label="Seu nome" aria-describedby="button-addon2" />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark btn-sm" type="submit" id="button-addon2"><i class="fas fa-check"></i></button>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={(e) => this.editProfile(e, 'email')}>
                                <div class="input-group mb-3">
                                    <input type="email" ref="emailProfile" class="form-control form-control-sm" placeholder="Seu nome" aria-label="Seu nome" aria-describedby="button-addon2" />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark btn-sm" type="submit" id="button-addon2"><i class="fas fa-check"></i></button>
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