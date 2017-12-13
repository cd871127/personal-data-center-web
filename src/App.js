import React, {Component} from 'react';
import './App.css';

import LoginForm from './user/LoginForm';
import RegistryForm from './user/RegistryForm';

class App extends Component {
    render() {
        return (
            <div>
            <LoginForm/>
            <RegistryForm/>
            </div>
        );
    }
}

export default App;
