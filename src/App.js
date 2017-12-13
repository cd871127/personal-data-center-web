import React, {Component} from 'react';
import './App.css';

import LoginForm from './user/LoginForm';
import RegistryForm from './user/RegistryForm';
import FileForm from './file/FileForm';

class App extends Component {
    render() {
        return (
            <div>
                <LoginForm/>
                <RegistryForm/>
                <FileForm/>
            </div>
        );
    }
}

export default App;
