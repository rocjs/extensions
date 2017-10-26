import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sharedStyles from '../shared.css';

export default class RepoUpdateButton extends Component {
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        return (
            <button
                className={ sharedStyles.button }
                onClick={ this.props.onClick }>
                { this.props.text }
            </button>
        );
    }
}
