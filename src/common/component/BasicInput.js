import React, {Component} from 'react';

class BasicInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input id={this.props.id} name={this.props.name} type={this.props.type} value={this.props.value}
                   onChange={this.props.handleChange} onClick={this.props.handleClick}/>
        )
    }
}


export default BasicInput;