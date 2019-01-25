import React, { Component } from 'react';
import Api from './Api'
// import { Link } from 'react-router-dom'
import Profile from './profile/Profile'
import IndexGroup from './groups/IndexGroup'
import NewGroup from './groups/NewGroup'
import AddSerie from './series/AddSerie'


//http://localhost:3000/public/uploads/imagesGroup/1547142376419-mano.png

class Group extends Component {
    state = {
        groups: [],
        idGroup: '',
        imageGroup: '',
        nameGroup: '',
        favoriteGroup: ''
    }

    constructor(props) {
        super(props)
        this.indexGroup = this.indexGroup.bind(this)
    }

    componentDidMount() {
        Api.groups()
            .then(res => {
                this.setState({ groups: res.data })
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }

    favorite(i, idGroup) {
        var favorite = document.getElementById('favorite' + i)

        const id = {
            id: idGroup
        }

        Api.favoriteGroup(id)
            .then(res => {

                if (favorite.classList.contains('active') === false) {
                    favorite.classList.add('active')
                } else {
                    favorite.classList.remove("active")
                }

            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }

    indexGroup(id, image, name, star) {
        this.setState({ idGroup: id, imageGroup: image, nameGroup: name, favoriteGroup: star })
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
                                    <Profile />

                                    <NewGroup />
                                </div>
                                <div className="groups">
                                    {this.state.groups.map((groups, i) =>
                                        <button key={i} className="button-group" onClick={() => this.indexGroup(groups.id, groups.image, groups.name, groups.star)}>
                                            <div className="media text-light p-3">
                                                {groups.image === '' ? <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/null.jpeg'} className="mr-3 img-circle" width="50" height="50" alt="img-group" /> : <img src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/' + groups.image} className="mr-3 img-circle" width="50" height="50" alt="img-group" />}
                                                <div className="media-body">
                                                    <h6 className="mt-0">{groups.name}<span>{groups.star === 1 ? <i onClick={() => this.favorite(i, groups.id)} id={'favorite' + i} className="fas fa-star favorite-group p-1 active float-right"></i> : <i onClick={() => this.favorite(i, groups.id)} id={'favorite' + i} className="fas fa-star favorite-group p-1 float-right"></i>}</span></h6>
                                                    {groups.numberMember} membros
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8 p-0 text-light">
                                {this.state.idGroup === '' ?
                                    <div>
                                        <center>
                                            <img src="./dist/images/oculos.png" width="300" className="img-fluid mt-5" alt="logo" />
                                            <h4>Compartilhe as séries com seus amigos <br /> agora mesmo</h4>
                                            <p>Crie o seu grupo e adicione os seus amigos para compartilharem comentários das séries que vocês adicionarem</p>
                                        </center>
                                    </div> : 
                                    <div>
                                        <IndexGroup favoriteGroup={this.state.favoriteGroup} nameGroup={this.state.nameGroup} idGroup={this.state.idGroup} imageGroup={this.state.imageGroup} />
                                        <AddSerie />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;