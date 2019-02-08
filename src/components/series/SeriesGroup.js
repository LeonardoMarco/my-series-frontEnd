import React, { Component } from 'react'
import Api from '../Api'
import DetailSerie from './DetailSerie'

class SeriesGroup extends Component {
    state = {
        series: [],
    }

    componentDidMount() {
        const idGroup = {
            id: this.props.idGroup
        }
        Api.series(idGroup)
            .then(res => {
                this.setState({ series: res.data })
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        {this.state.series.map((series, i) =>
                            <DetailSerie key={i} serie={series} group={this.props.idGroup}/>
                        )}
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default SeriesGroup