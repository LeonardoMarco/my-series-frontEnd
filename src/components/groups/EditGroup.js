import React, { Component } from 'react'
import Api from '../Api'


class EditGroup extends Component {
    state = {
        active: '',
        membros: 'salve',
        file: 'http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030', 
        error: ''
    }

    constructor(props) {
        super(props)
        this.editGroup = this.editGroup.bind(this)
        this.editImage = this.editImage.bind(this)
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
                // const genres = res.data;
                // this.setState({ genres });
                alert('Grupo editado com sucesso')
                document.location.reload(true)
            })
            .catch(error => {
                // console.log(error.response.data.error)
                console.log(error.response.data.error)
            })
    }

    render() {
        return (
            <React.Fragment>
                <button className="btn btn-danger btn-sm float-right"
                    onClick={() => this.setState({ active: 'show animated-s fadeInRightBig-s' })} data-toggle="modal" data-target="#exampleModal" >
                    Editar grupo
                    </button>
                <div className={this.state.active + ' w-100 colum colum-2 bg-danger position-absolute'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>
                                <img src={this.state.file} width="200" className="img-fluid img-circle mt-3 img-newGroup" alt="logo" />
                                <div className="form-group">
                                    <label htmlFor="alterar-arquivo" className="mt-3 label-file btn btn-dark btn-sm ">Selecionar uma imagem &#187;</label>
                                    <input id="alterar-arquivo" className="input-file d-none" type='file' accept="image/png, image/jpeg" ref="image" onChange={this.editImage} />
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
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditGroup