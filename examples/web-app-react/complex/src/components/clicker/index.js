import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';
import sharedStyles from './../shared.css';

export default class Clicker extends Component {
    static propTypes = {
        clicker: PropTypes.number.isRequired,
        click: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={ styles.clicker }>
                <h1>Clicker!</h1>
                <div>
                    { this.props.clicker }
                    <button className={ sharedStyles.button } onClick={ this.props.click }>Click me!</button>
                </div>
            </div>
        );
    }
}
