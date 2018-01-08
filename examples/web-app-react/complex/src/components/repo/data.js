import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../shared.css';

export default class RepoData extends Component {
    static propTypes = {
        city: PropTypes.object,
        list: PropTypes.array
    };

    render() {
        const repos = [];

        Object.keys(this.props).forEach((repo, i) => {
            const repoData = this.props[repo];

            repos.push(
                <div key={ i }>
                    <ul className={ styles.list }>
                        <li>
                            <h2>{ repoData.name }</h2>
                        </li>
                        <li>
                            Stargazers: { repoData.stargazers_count }
                        </li>
                        <li>
                            Open issues: { repoData.open_issues_count }
                        </li>
                    </ul>
                </div>
            );
        });

        return (
            <div>
                <h1>Fetched repo data</h1>
                <div className={ styles.data }>
                    { repos }
                </div>
            </div>
        );
    }
}
