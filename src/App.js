import React, { Component } from 'react';
import Header from './components/Header';
import Composer from './components/Composer';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <Composer/>
            </div>
        );
    }
}

export default App;
