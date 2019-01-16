import React, {Component} from 'react'


class IndexGroup extends Component{
    
    render(){
        return(
            <div className="bg-light text-dark d-absolute p-3">
                <img src="#" className="img-circle" alt="imagem-group"/> <span>Nome do grupo</span>
            </div>
            // <div>Nome: {this.props.teste}</div>
        )
    }
}

export default IndexGroup