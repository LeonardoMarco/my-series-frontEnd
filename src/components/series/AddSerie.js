import React, { Component } from 'react'
import Api from '../Api'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css'

class AddSerie extends Component {
    state = {
        active: '',
        error: '',
        idSerie: '',
        series: []
    }

    constructor(props) {
        super(props)
        this.addSerieGroup = this.addSerieGroup.bind(this)
    }

    componentDidMount(){
        Api.Listserie()
            .then(res => {
                this.setState({series: res.data})
            })
    }

    addSerieGroup() {
        if (window.confirm('Tem certeza que deseja adicionar a série a esse grupo?') === true) {
            const serie = {
                serie: this.refs.tags.el[0].value,
                group: this.props.idGroup,
                score: this.refs.points.value
            }
            Api.addSerie(serie)
                .then(res => {
                    alert('A série foi adicionada com sucesso!')
                    document.location.reload(true)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
        }
    }
    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({ active: 'show animated-s fadeInRightBig-s' })} className="btn btn-danger btn-sm img-circle btn-add"><i className="fas fa-plus"></i></button>

                <div className={this.state.active + ' w-100 colum colum-2 bg-danger position-absolute add-serie'}>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right mr-3 close" onClick={() => this.setState({ active: '' })}>x</span>
                            <center>

                            </center>

                        </div>
                        <div className="col-md-12 p-0">
                            <div className="mx-auto p-5">
                                <Select2
                                    ref="tags"
                                    data={this.state.series}
                                    onOpen={() => { }}
                                    onClose={() => { }}
                                    onSelect={() => { }}
                                    onChange={() => { }}
                                    onUnselect={() => { }}
                                    options={{
                                        placeholder: 'Adicionar uma nova série',
                                    }} />

                                Sua nota de 0 a 5 do filme:
                                    <select ref="points">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <br />
                                <button onClick={() => this.addSerieGroup()}>Adicionar série</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddSerie