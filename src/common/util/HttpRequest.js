let httpRequest = function (url, param, callback) {
    fetch(url, param).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else
            throw new Error(response.statusText);
    }).then(function (data) {
        if (data.code === '000') {
            if (callback !== null)
                callback(data.data, data.token);
        }
        else
            alert(data.msg);
    }).catch(function (err) {
        alert("请求失败");
    });
};


export default httpRequest;
