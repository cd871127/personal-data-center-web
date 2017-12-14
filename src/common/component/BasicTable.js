import React, {Component} from 'react';

class BasicTable extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        let headers = this.props.metadata.headers;
        let titles = this.props.metadata.titles;
        let key = 0;
        if (this.props.data.length > 0) {
            titles = titles.map(function (title) {
                return (
                    <th key={'th' + key++}>{title}</th>
                )
            });

            let content = this.props.data.map(function (line) {
                return (
                    <tr key={'tr' + key++}>
                        {headers.map(function (header) {
                            return <td key={'td' + key++}>{line[header]}</td>
                        })}
                    </tr>
                );
            });
            console.log(content);
            return (
                <table>
                    <thead>
                    <tr>
                        {titles}
                    </tr>
                    </thead>
                    {/*<tfoot>*/}
                    {/*<tr>*/}
                    {/*<td>Sum</td>*/}
                    {/*<td>$180</td>*/}
                    {/*</tr>*/}
                    {/*</tfoot>*/}
                    <tbody>
                    {content}
                    </tbody>
                </table>
            )
        } else
            return (
                <label>no data</label>
            )
    }
}


export default BasicTable;