import {JSEncrypt} from 'jsencrypt';

function encode(data, key) {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(key);
    return encrypt.encrypt(data);
}

function request(url, param, callback) {
    fetch(url, param).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else
            throw new Error(response.statusText);
    }).then(function (res) {
        callback(res);
    }).catch(function (err) {
        console.log(err);
        alert("请求失败");
    });
}

function login() {
    request("http://localhost:18888/security/rsaPublicKey", {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (data) {
        let publicKey = data.publicKey;
        let keyId = data.keyId;

        let res = encode("哦啦啦,呀哈哈", publicKey);
        request("http://localhost:18888/users/1234", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                res: res,
                keyId: keyId
            },
            // body: JSON.stringify({
            //     res: res,
            //     keyId: keyId
            // })
        }, function (data) {
            console.log(data);

        });

    });
}

export default login();


