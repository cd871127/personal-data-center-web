let httpRequest = function (url, param, callback,ref) {
    fetch(url, param).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else
            throw new Error(response.statusText);
    }).then(function (data) {
        // console.log(data);
        if (data.code === '000') {
            if (callback !== undefined)
                callback(data,ref);
        }
        else
            alert(data.msg);
    }).catch(function (err) {
        console.log(err);
        alert(err);
    });
};


export default httpRequest;
