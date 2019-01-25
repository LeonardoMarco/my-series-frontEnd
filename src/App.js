import React, { Component } from 'react'
import Routers from './Routers'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import './dist/css/style.css'


class App extends Component {
  render() {
    return (
      <div className="container-fluid bg-dark vh-100">
        {/* <Select2

          data={[]}
          onOpen={() => { console.log('onOpen'); }}
          onClose={() => { console.log('onClose'); }}
          onSelect={() => { console.log('onSelect'); }}
          onChange={() => { console.log('onChange'); }}
          onUnselect={() => { console.log('onUnselect'); }}
          options={{
            placeholder: 'search by tags',
          }} /> */}
        <Routers />
      </div>
    );
  }
}

export default App;
