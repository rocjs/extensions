import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

export default class ErrorItem extends Component {
    static defaultProps = {
        key: 0,
        error: ''
    };

    static propTypes = {
        key: PropTypes.number.isRequired,
        error: PropTypes.string.isRequired
    };

    render() {
        return (
            <div key={ this.props.key } className={ styles.error }>
                <h2>Error</h2>
                <p>{ this.props.error }</p>
            </div>
        );
    }
}
