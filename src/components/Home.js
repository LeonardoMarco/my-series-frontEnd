import React, { Component } from 'react';
import Api from './Api'
// import { Link } from 'react-router-dom'
import IndexGroup from './groups/IndexGroup'
import NewGroup from './groups/NewGroup'
//http://localhost:3000/public/uploads/imagesGroup/1547142376419-mano.png

class Group extends Component {
    state = {
        groups: [],
        nome: ''
    }

    constructor(props) {
        super(props)
        this.teste = this.teste.bind(this)
    }

    componentDidMount() {
        Api.groups()
            .then(res => {
                // const genres = res.data;
                // this.setState({ genres });
                // console.log(res.data)
                this.setState({groups:res.data})
                console.log(res.data)
            })
    }

    teste(teste){
        this.setState({nome: teste})
        // console.log(teste)
    }

    render() {
        return (
            <div>
                <div className="fit"></div>
                <div className="row">
                    <div className="w-100 fit">
                        <center><img src="./dist/images/logo.png" width="300" className="img-fluid" alt="logo" /></center>
                    </div>
                    <div className="container bg-home-groups z-index border-radius mt-groups">
                        <div className="row">
                            <div className="col-md-4 p-0 colum-groups">
                                <div className="w-100 p-2 bg-color">
                                    <img className="img-fluid img-circle" src="http://sistema.cbdaweb.org.br/cbdaweb/_uploads/fotosAtleta/avatar_generico.jpg?c=1543979030" width="30" alt="img-user"  />

                                    <NewGroup />
                                </div>
                                <div className="groups">
                                    {this.state.groups.map((groups, i) =>
                                        <button key={i} className="button-group" onClick={() => this.teste(groups.id)}>
                                            <div className="media text-light p-3">
                                                {groups.image === '' ? <img src={process.env.REACT_APP_API_URL+'public/uploads/imagesGroup/null.jpeg'} className="mr-3 img-circle" width="50" height="50" alt="img-group"  /> : <img src={process.env.REACT_APP_API_URL+'public/uploads/imagesGroup/'+groups.image} className="mr-3 img-circle" width="50" height="50" alt="img-group"  />}
                                                <div className="media-body">
                                                    <h6 className="mt-0">{groups.name}</h6>
                                                    {groups.numberMember} membros
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8 p-0 text-light">
                                <IndexGroup idGroup={this.state.nome} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;