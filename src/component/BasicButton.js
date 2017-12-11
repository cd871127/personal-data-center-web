import React from 'react';
import BasicComponent from './BasicComponent';

class BasicButton extends BasicComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input id={this.id()} type='button' className='btn tn-primary' value={this.value()}
                   onClick={LoginForm.handleClick ? LoginForm.handleClick : LoginForm.handleClick}/>
        );
    }
}

export default BasicButton;