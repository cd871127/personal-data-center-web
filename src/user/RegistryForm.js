import React from 'react';
import BasicComponent from "../component/BasicComponent";
import httpRequest from '../common/util/HttpRequest';
import {JSEncrypt} from 'jsencrypt';
import BasicInput from '../common/component/BasicInput';


class RegistryForm extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = { // define this.state in constructor
            userName: "",
            passWord: "",
            nickName: "",
            userType: "1",
            telPhone: "",
            eMail: "",
            idCard: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        let param = {
            method: 'GET',
            mode: 'cors'
        };
        let userInfo = this.state;
        httpRequest('http://localhost:18888/security/rsaPublicKey', param, function (data) {


            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(data.publicKey);
            console.log(userInfo.passWord);
            userInfo.passWord = encrypt.encrypt(userInfo.passWord);


            let param = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    "keyId": data.keyId
                },
                body: JSON.stringify(userInfo)
            };

            httpRequest("http://localhost:18888/users/registry", param, function (data, token) {
                console.log(data);
                console.log(token);
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
                <BasicInput name="userName" type="text" handleChange={this.handleChange} value={value.userName}/><br/>
                <BasicInput name="passWord" type="password" handleChange={this.handleChange}
                            value={value.passWord}/><br/>
                <BasicInput name="nickName" type="text" handleChange={this.handleChange} value={value.nickName}/><br/>
                <BasicInput name="telPhone" type="text" handleChange={this.handleChange} value={value.telPhone}/><br/>
                <BasicInput name="eMail" type="text" handleChange={this.handleChange} value={value.eMail}/><br/>
                <BasicInput name="idCard" type="text" handleChange={this.handleChange} value={value.idCard}/><br/>
                <BasicInput type="button" handleClick={this.handleClick} value="注册"/><br/>
            </div>
        );
    }

}

export default RegistryForm;