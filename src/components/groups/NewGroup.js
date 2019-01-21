import React, { Component } from 'react'
import Api from '../Api'

class NewGroup extends Component {

    state = {
        active: '',
        membros: 'salve',
        file: 'http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030', sendFile: '',
        error: ''
    }

    constructor(props) {
        super(props)
        this.newGroup = this.newGroup.bind(this)
        this.addImage = this.addImage.bind(this)
    }

    addImage(event) {
        if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
            this.setState({
                file: URL.createObjectURL(event.target.files[0]), sendFile: event.target.files[0]
            })
        } else if (event.target.files[0].type !== 'image/png' || event.target.files[0].type !== 'image/jpeg') {
            this.setState({ error: 'Selecione apenas imagens' })
        }
    }

    newGroup(e) {
        e.preventDefault()

        var newGroup = new FormData();

        newGroup.append("image", this.state.sendFile);
        newGroup.append("name", this.refs.name.value);
        newGroup.append("description", this.refs.description.value);

        Api.newGroup(newGroup)
            .then(res => {
                // const genres = res.data;
                // this.setState({ genres });
                alert('Grupo criado com sucesso')
                document.location.reload(true)
            })
            .catch(error => {
                console.log(error.response.data.error)
                
            })
    }



    render() {
        return (
            <React.Fragment>
                <button className="btn btn-danger btn-sm float-right"
                    onClick={() => this.setState({ active: 'show animated-s fadeInLeftBig-s' })} data-toggle="modal" data-target="#exampleModal">Novo grupo</button>
                <div className={this.state.active + ' w-100 colum bg-danger position-absolute'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>
                                <img src={this.state.file} width="200" className="img-fluid img-circle mt-3 img-newGroup" alt="logo" />
                            </center>
                            {this.state.error && <div className="alert alert-danger text-center mt-3 ml-5 mr-5" role="alert">
                                {this.state.error}
                            </div>}
                        </div>
                        <div className="col-md-12 p-0">
                            <form onSubmit={(e) => this.newGroup(e)} className="p-5" encType='multipart/form-data'>
                                <div className="form-group">
                                    <label htmlFor="selecao-arquivo" className="label-file btn btn-dark btn-sm form-control">Selecionar uma imagem &#187;</label>
                                    <input id="selecao-arquivo" className="input-file d-none" type='file' accept="image/png, image/jpeg" ref="image" onChange={this.addImage} />
                                </div>

                                <div className="form-group">
                                    <input type="text" ref="name" className="form-control form-control-sm" placeholder="Nome do grupo" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-sm" ref="description" placeholder="Descrição do grupo" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-dark btn-sm w-100" value="Criar grupo" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NewGroup