import React, { Component } from 'react'
import Api from '../Api'

class AddSerie extends Component {
    state = {
        active: '',
        error: '',
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

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddSerie