import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../shared.css';

import RepoLoader from './loader';
import RepoError from './error';
import RepoData from './data';

export default class Repo extends Component {
    static propTypes = {
        payload: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        loading: PropTypes.bool,
        endpoint: PropTypes.string,
        updateUser: PropTypes.func,
        repoUser: PropTypes.string,
        error: PropTypes.bool
    };

    render() {
        let data;

        if (this.props.error) {
            data = <RepoError error={ this.props.payload.message } />
        } else if (this.props.loading) {
            data = <RepoLoader endpoint={ this.props.meta.endpoint } />
        } else {
            data = <RepoData { ...this.props.payload } />
        }

        return (
            <div className={ styles.repos }>
                { data }
            </div>
        );
    }
}
