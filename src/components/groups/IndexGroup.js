import React, { Component } from 'react'
import ConfigGroup from './ConfigGroup'


class IndexGroup extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="bg-light text-dark d-absolute p-3 index-group-band">
                    {this.props.imageGroup === '' ? <img width="25" height="25" className="float-left mr-2 img-circle" src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/null.jpeg'} alt="img-group-index" /> : <img width="25" height="25" className="float-left mr-2 img-circle" src={process.env.REACT_APP_API_URL + 'public/uploads/imagesGroup/' + this.props.imageGroup} alt="img-group-index" />}
                    <span className="float-left">{this.props.nameGroup}</span>
                    <ConfigGroup idGroup={this.props.idGroup} imageGroup={this.props.imageGroup} />
                </div>
            </React.Fragment>
        )
    }
}

export default IndexGroup