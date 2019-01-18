import React, {Component} from 'react'
import EditGroup from './EditGroup'


class IndexGroup extends Component{
    
    render(){
        return(
            <div className="bg-light text-dark d-absolute p-3">
                a <span>{this.props.idGroup}</span>

                <EditGroup idGroup={this.props.idGroup}/>
            </div>
            // <div>Nome: {this.props.teste}</div>
        )
    }
}

export default IndexGroup