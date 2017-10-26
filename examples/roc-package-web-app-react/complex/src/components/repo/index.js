import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

import RepoLoader from './loader';
import RepoError from './error';
import RepoData from './data';
import RepoUpdateButton from './button';

export default class Repo extends Component {
    static propTypes = {
        payload: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        loading: PropTypes.bool,
        endpoint: PropTypes.string,
        reposForceFetch: PropTypes.func,
        updateUser: PropTypes.func,
        repoUser: PropTypes.string,
        error: PropTypes.bool
    };

    render() {
        let buttonText, data;

        if (this.props.error) {
            buttonText = 'Oops! Try again.';
            data = <RepoError error={ this.props.payload.message } />
        } else if (this.props.loading) {
            buttonText = 'Try again.';
            data = <RepoLoader endpoint={ this.props.meta.endpoint } />
        } else if (!this.props.payload && !this.props.loading) {
            buttonText = 'No data provided. Try again.';
        } else {
            buttonText = 'Reload repos data.';
            data = <RepoData { ...this.props.payload } />
        }

        return (
            <div className={ styles.repos }>
                <span>
                    <label htmlFor="locationInput">Github user:</label>
                    <input
                        ref="locationInput"
                        type="text"
                        value={ this.props.repoUser }
                        onChange={ (e) => {
                                this.props.updateUser(e.target.value)
                            }
                        }
                    />
                </span>
                <RepoUpdateButton
                    text= { buttonText }
                    onClick={ this.props.reposForceFetch }
                />
                { data }
            </div>
        );
    }
}
