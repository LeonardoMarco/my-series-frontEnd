import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="row text-light">
                <div className="bg-black w-100">
                    <img src="./dist/images/logo.png" className="img-fluid p-3" alt="logo" width="300"/>
                </div>
                <div className="col-md-12 text-center mt-5 pt-5">
                    <h2>Erro do site - página  não encontrada</h2>
                    <p>
                        Não foi possível encontrar esta página. Clique no botão abaixo para ir para a página inicial.
                    </p>
                    <Link to="/" className="btn btn-outline-light btn-sm mt-5">Página inicial</Link>
                </div>
            </div>
        )
    }
}

export default NotFound