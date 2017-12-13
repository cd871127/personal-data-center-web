import React, {Component} from 'react';
import BasicInput from '../common/component/BasicInput';
import httpRequest from '../common/util/HttpRequest';

class FileForm extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    // handleChange(event){
    //     event.persist();
    //     this.setState({value:event.target.value});
    // }

    handleClick() {
        let data = new FormData();
        let input = document.querySelector('input[type="file"]');
        data.append("file", input.files);
        let param = {
            method: 'POST',
            mode: 'cors',

            body: data
        };

        httpRequest("http://localhost:18888/file/cdistc", param, function (data) {
            alert(111);
        });

    }

    render() {
        return (
            <div>
                <input type="file" multiple="multiple"/>
                <BasicInput type="button" handleClick={this.handleClick} value="上传"/><br/>
            </div>
        )
    }
}

export default FileForm;
