import React, {Component} from 'react';

class BasicComponent extends Component {
    constructor(props) {
        super(props);
    }

    id() {
        if (typeof(this.props.id) === 'undefined')
            return '';
        else
            return this.props.id;
    }

    className() {
        if (typeof(this.props.className) === 'undefined')
            return '';
        else
            return this.props.className;
    }

    type() {
        if (typeof(this.props.type) === 'undefined')
            return '';
        else
            return this.props.type;
    }

    value() {
        if (typeof(this.props.value) === 'undefined')
            return '';
        else
            return this.props.value;
    }
}

export default BasicComponent;