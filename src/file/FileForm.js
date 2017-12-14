import React, {Component} from 'react';
import BasicInput from '../common/component/BasicInput';
import httpRequest from '../common/util/HttpRequest';
import BasicTable from '../common/component/BasicTable';

class FileForm extends Component {
    constructor(props) {
        super(props);

        this.state = { // define this.state in constructor
            tableMetaData: {
                headers: ['fileName', 'postfix','readableCreatedDate',  'readableFileSize'],
                titles: ['文件名','类型', '大小',  '上传时间']
            },
            data: "",

        };

        this.handleClick = this.handleClick.bind(this);
        this.queryUserFiles = this.queryUserFiles.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    // handleChange(event){
    //     event.persist();
    //     this.setState({value:event.target.value});
    // }

    handleClick() {
        let data = new FormData();
        let files = document.querySelector('input[type="file"]').files;
        for (let i = 0; i !== files.length; ++i)
            data.append("file" + i, files[i]);
        let param = {
            method: 'POST',
            mode: 'cors',
            body: data
        };
        httpRequest("http://localhost:18888/file/cdistc", param, function (data,ref) {
            alert(data.msg);
            ref.queryUserFiles();
        }, this);
    }

    queryUserFiles() {
        let param = {
            method: 'GET',
            mode: 'cors'
        };
        httpRequest("http://localhost:18888/file/cdistc", param, function (data, ref) {
            ref.setState({data: data.data});
        }, this);
    }

    componentWillMount() {
        this.queryUserFiles();
    }

    render() {
        return (
            <div>
                <input type="file" multiple="multiple"/>
                <BasicInput type="button" handleClick={this.handleClick} value="上传"/><br/>
                <BasicInput type="button" handleClick={this.queryUserFiles} value="查询"/><br/>
                <BasicTable data={this.state.data} metadata={this.state.tableMetaData} />
            </div>
        )
    }
}

export default FileForm;
