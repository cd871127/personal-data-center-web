import React from 'react';
import BasicComponent from "../component/BasicComponent";
import httpRequest from '../common/util/HttpRequest';
import {JSEncrypt} from 'jsencrypt';
import BasicInput from '../common/component/BasicInput';

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
        let passWord=this.state.passWord;
        let userName=this.state.userName;
        httpRequest('http://localhost:18888/security/rsaPublicKey', param, function (data) {

            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(data.publicKey);
            passWord = encrypt.encrypt(passWord);
            param.headers = {
                "passWord": passWord,
                "keyId": data.keyId
            };
            httpRequest("http://localhost:18888/users/token/" + userName, param, function (data, token) {
                let storage = window.localStorage;
                storage['token'] = token;
            });

        });

    }

    handleChange(event) {
        event.persist();
        let element = {};
        element[event.target.name] = event.target.value;
        this.setState(element);
    }

    render() {
        let value = this.state;
        return (
            <div>
                账号:<BasicInput name="userName" type="text" handleChange={this.handleChange} value={value.userName}/><br/>
                密码:<BasicInput name="passWord" type="password" handleChange={this.handleChange}
                            value={value.passWord}/><br/>
                <BasicInput type="button" handleClick={this.handleClick} value="登陆"/><br/>
            </div>
        );
    }
}

export default LoginForm;