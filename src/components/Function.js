import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Api from './Api'
import Add from './Add'


class Funcoes extends Component {
    state = {
        parametro: '',
        filmes: [],
        series: []
    }

    componentDidMount() {
        const parametro = this.props.match.params.token;
        this.setState({ parametro });
        var obj_filmes = []
        var obj_series = []

        Api.filmes()
            .then(res => {
                Object.keys(res.data).map(function (objectKey) {
                    if (res.data[objectKey].identy === parametro) {
                        obj_filmes.push(res.data[objectKey])
                    }
                    return true
                });
                const filmes = obj_filmes;
                this.setState({ filmes });
            })

        Api.series()
            .then(resp => {
                Object.keys(resp.data).map(function (objectKey) {
                    if (resp.data[objectKey].identy === parametro) {
                        obj_series.push(resp.data[objectKey])
                    }
                    return true
                });

                const series = obj_series;
                this.setState({ series });
            })

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <center><img src="http://localhost:3000/dist/images/logo.png" className="img-fluid mt-2" alt="logo" /></center>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="title-backlog"><h3 className="text-light">Séries: {this.state.parametro}</h3> <br /></div>
                    {this.state.series.map(series =>
                        <div className="product-backlog">
                            {series.name}
                        </div>
                    )}
                </div>
                <div className="row mt-4 p-3">
                    <div className="title-backlog"><h3 className="text-light">Filmes: {this.state.parametro}</h3> <br /></div>
                    {this.state.filmes.map(filmes =>
                        <div className="product-backlog">
                            {filmes.name}
                        </div>
                    )}
                </div>
                <Add />
                <center><div className="mt-5"><Link to="/group">Voltar</Link></div></center>
            </div>
        )
    }
}

export default Funcoes;