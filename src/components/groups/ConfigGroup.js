import React, { Component } from 'react'
import Api from '../Api'


class EditGroup extends Component {
    state = {
        active: '',
        active2: '',
        file: 'http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030',
        error: '',
        member: [],
        error_member: '',
        value_input_member: ''
    }

    constructor(props) {
        super(props)
        this.editGroup = this.editGroup.bind(this)
        this.editImage = this.editImage.bind(this)
        this.addMemberGroup = this.addMemberGroup.bind(this)
    }

    editImage(event) {
        if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            })

            var editImage = new FormData();
            editImage.append("id", this.props.idGroup);
            editImage.append("image", event.target.files[0]);

            Api.editImage(editImage)
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

    editGroup(e) {
        e.preventDefault()

        const editGroup = {
            id: this.props.idGroup,
            name: this.refs.name.value,
            description: this.refs.description.value
        }

        Api.editGroup(editGroup)
            .then(res => {
                alert('Grupo editado com sucesso')
                document.location.reload(true)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }

    removeGroup(e) {
        e.preventDefault()

        const removeGroup = {
            id: this.props.idGroup,
        }

        Api.removeGroup(removeGroup)
            .then(res => {
                alert('Grupo excluído com sucesso')
                document.location.reload(true)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }

    removeImage(e) {
        e.preventDefault()
        if (window.confirm('Deseja realmente excluir a foto do grupo ?') === true) {
            const removeImage = {
                id: this.props.idGroup,
            }

            Api.removeImage(removeImage)
                .then(res => {
                    alert('Imagem excluída com sucesso')
                    document.location.reload(true)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
        }
    }

    validMember(e) {
        this.setState({value_input_member: e.target.value})
        var a = this.refs.member.value
        if (a.lastIndexOf('@') > -1 && a.lastIndexOf('.') > 1) {
            const check = {
                email: this.refs.member.value,
                group: this.props.idGroup
            }

            Api.checkMember(check)
                .then(res => {
                    this.setState({ member: [res.data], error_member: ''})
                }).catch(error => {
                    this.setState({ error_member: error.response.data.error })

                })
        } else {
            this.setState({ member: [],error_member: '' })
        }


    }

    addMemberGroup() {
        const member = {
            email: this.state.member[0].email,
            group: this.props.idGroup
        }   
        

        Api.addMember(member)
            .then(res => {
                alert('Membro adicionado com sucesso')
                this.setState({value_input_member: '', member: []})
            }).catch(error => {
                console.log(error.response.data.error)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="dropdown float-left dropdown-s">
                    <button className="btn btn-light dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={() => this.setState({ active: 'show animated-s fadeInRightBig-s' })} data-toggle="modal" data-target="#exampleModal">Editar grupo</button>
                        <button className="dropdown-item" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setState({ active2: 'show animated-s fadeInRightBig-s' })}>Adicionar membros</button>
                    </div>
                </div>
                <div className={this.state.active + ' w-100 colum colum-2 bg-danger position-absolute edit-group'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>
                                {this.props.imageGroup === '' ? <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/null.jpeg'} className="mt-3 img-circle" width="200" height="200" alt="img-group" /> : <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/' + this.props.imageGroup} className="mt-3 img-circle" width="200" height="200" alt="img-group" />}
                                <div>
                                    <div>
                                        <label htmlFor="alterar-arquivo" className="mt-3 label-file btn btn-dark btn-sm ">Selecionar uma imagem &#187;</label>
                                        <input id="alterar-arquivo" className="input-file d-none" type='file' accept="image/png, image/jpeg" ref="image_group" onChange={this.editImage} />
                                    </div>
                                    {this.props.imageGroup !== '' ?
                                        <form onClick={(e) => this.removeImage(e)}>
                                            <input className="input-file btn btn-light btn-sm" value="Excluir imagem" type="submit" />
                                        </form> : <div> </div>
                                    }
                                </div>
                            </center>
                            {this.state.error && <div className="alert alert-danger text-center mt-3 ml-5 mr-5" role="alert">
                                {this.state.error}
                            </div>}
                        </div>
                        <div className="col-md-12 p-0">
                            <form onSubmit={(e) => this.editGroup(e)} className="p-5">
                                <div className="form-group">
                                    <input type="text" ref="name" className="form-control form-control-sm" placeholder="Nome do grupo" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-sm" ref="description" placeholder="Descrição do grupo" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-dark btn-sm w-100" value="Salvar alterações" />
                                </div>
                            </form>

                            <form className="p-5" onSubmit={(e) => this.removeGroup(e)}>
                                <input type="submit" className="btn btn-light btn-sm w-100" value="Excluir grupo" />
                            </form>
                        </div>
                    </div>
                </div>

                <div className={this.state.active2 + ' w-100 colum colum-2 bg-danger position-absolute edit-group'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active2: '' })}>x</span>
                        </div>
                        <div className="col-md-12 p-0">
                            <div className="p-5">
                                <input type="email" className="form-control" value={this.state.value_input_member} placeholder="digite o e-mail do usuário" onChange={(e) => this.validMember(e)} ref="member"  />
                                <ul className="w-100 bg-dark ul-member p-0">
                                    {this.state.error_member === '' ?
                                        this.state.member.map((member, i) =>
                                            <li key={i} className="text-light ul-add-member">
                                                <div className="media p-2">
                                                    {member.image === '' ? <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/null.jpg'} className="mt-3 img-circle" width="50" height="50" alt="img-User" /> : <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesUser/' + member.image} className="mt-3 img-circle" width="50" height="50" alt="img-User" />}
                                                    <div className="media-body mt-2 ml-3">
                                                        <h5 className="mt-0">{member.name}</h5>
                                                        {member.email}
                                                    </div>

                                                    <button onClick={() => this.addMemberGroup()} className="btn btn-danger btn-sm mt-3">adicionar</button>
                                                </div>
                                            </li>
                                        )
                                        : <li className="text-light ul-add-member p-3">
                                            {this.state.error_member}
                                          </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditGroup