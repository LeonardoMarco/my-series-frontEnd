import React, { Component } from 'react'
import Api from '../Api'

class DefailtSerie extends Component {
    state = {
        active: '',
        series: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    }


    constructor(props) {
        super(props)
        this.removeSerie = this.removeSerie.bind(this)
    }

    removeSerie(serie) {
        const removeSerie = {
            group_id: this.props.group,
            serie_id: serie
        }


        Api.removeSerie(removeSerie)
            .then(res => {
                alert('A série foi deletada com sucesso')
                document.location.reload(true)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }



    render() {
        const serie = this.props.serie
        return (
            <React.Fragment>
                <div className="col-md-3 p-0 border-serie">
                    <img className="img-fluid w-100 position-absolute" width="100" src={process.env.REACT_APP_API_URL + 'public/uploads/imagesSerie/default.jpeg'} alt="imagemSerie" />
                    <div className="position-absolute text-light hover-serie">
                        <div className="mt-4">
                            <span>{serie.name}</span>
                            <br /> <button onClick={() => this.setState({ active: 'show animated-s fadeInRightBig-s' })} className="btn btn-light btn-sm">Ver detalhes</button>
                            <div className="mt-3" >
                                {this.state.series.map((series, i) =>
                                    series.id <= serie.score ? <span key={i} className="fa fa-star active"></span> :
                                        <span className="fa fa-star" key={i}></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={this.state.active + ' w-100 colum colum-2 bg-danger position-absolute add-serie'}>
                    <div className="row">
                        <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                        <div className="col-md-12 mt-2">
                            <center>
                                <h4>{serie.name}</h4>
                                <iframe width="560" height="315" title="trailer" src="https://www.youtube-nocookie.com/embed/PB-0wJRoQrg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> <br />
                                {this.state.series.map((series, i) =>
                                    series.id <= serie.score ? <span key={i} className="fa fa-star light active"></span> :
                                        <span className="fa fa-star light" key={i}></span>
                                )}
                            </center>

                            <h6 className="ml-2 mt-3">Sinopse: <span className="text-dark">{serie.description} </span></h6><br />
                            <center><button className="btn btn-light btn-sm" onClick={() => this.removeSerie(serie.id)}>Remover série</button></center>
                        </div>
                    </div>
                </div>
            </React.Fragment >

        )
    }
}

export default DefailtSerie