import React from 'react';
import BasicComponent from "../component/BasicComponent";
import httpRequest from '../common/util/HttpRequest';
import {JSEncrypt} from 'jsencrypt';

class LoginForm extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = { // define this.state in constructor
            userName: "",
            passWord: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        let param = {
            method: 'GET',
            mode: 'cors'
        };

        httpRequest('http://localhost:18888/security/rsaPublicKey', param, function (data) {

            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(data.publicKey);
            let passWord = encrypt.encrypt(this.state.passWord);
            param.headers = {
                "passWord": passWord,
                "keyId": data.keyId
            };
            alert(this.state.userName);
            httpRequest("http://localhost:18888/users/token/" + this.state.userName, param, function (data, token) {
                console.log(data);
                console.log(token);
                let storage = window.localStorage;
                storage['token'] = token;
            });

        });

    }

    handleChange(event) {
        event.persist();
        if (event.target.type === 'text')
            this.setState({userName: event.target.value});
        else
            this.setState({passWord: event.target.value});
    }

    render() {
        return (
            <div>
                账号:<input type='text' onChange={this.handleChange}/><br/>
                密码:<input type='password' onChange={this.handleChange}/> <br/>
                <input type='button' onClick={this.handleClick}/>
            </div>
        );
    }
}

export default LoginForm;