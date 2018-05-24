import React, { Component } from 'react';
import Timezone from './timezone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
        <header className="App-header">
          <h1 className="App-title">Is There Time?</h1>
        </header>

        <Timezone />
      </div>
    );
  }
}

export default App;
