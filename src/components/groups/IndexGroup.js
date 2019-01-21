import React, {Component} from 'react'
import ConfigGroup from './ConfigGroup'


class IndexGroup extends Component{
    
    render(){
        return(
            <div className="bg-light text-dark d-absolute p-3">
                a <span>{this.props.idGroup}</span>
                
                <ConfigGroup idGroup={this.props.idGroup} imageGroup={this.props.imageGroup}/>
            </div>
            // <div>Nome: {this.props.teste}</div>
        )
    }
}

export default IndexGroup