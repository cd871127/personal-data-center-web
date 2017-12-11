import React from 'react';
import BasicComponent from "../component/BasicComponent";
import $ from 'jquery'
import {JSEncrypt} from 'jsencrypt';

class LoginForm extends BasicComponent {
    static handleClick() {
        let userName = 'test1';
        let password = 'cd123321';
        //
        $.get('http://localhost:18888/security/rsaPublicKey', function (data) {
            if (data.code === '000') {
                let keyId = data.data.keyId;
                let publicKey = data.data.publicKey;

                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(publicKey);
                password= encrypt.encrypt(password);
                console.log(password);

                $.get('http://localhost:18888/user/token/test1',{},function(data){
                    console.log(data);
                },"json");

            }
        }, "json");
    }

    render() {
        return (
            <div>
                账号:<input id='userName' type='text'/><br/>
                密码:<input id='password' type='password'/> <br/>
                <input type='button' onClick={LoginForm.handleClick}/>
            </div>
        );
    }
}

export default LoginForm;