import React, { Component } from 'react'
import Routers from './Routers'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './dist/css/style.css'


class App extends Component {
  render() {
    return (
      <div className="container-fluid bg-dark vh-100">

        <Routers />
      </div>
    );
  }
}

export default App;
