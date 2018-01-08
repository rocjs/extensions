import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import RepoLoader from '../repo/loader';
import styles from '../shared.css';
import { FETCH_REPOS } from '../../reducers/repofetch';

export const GRAPHQL_API = 'https://www.graphqlhub.com/graphql';

const TestQuery = gql`
    query Repos($username: String!) {
        graphQLHub
        github {
            user(username: $username) {
                repos {
                    name
                    issues {
                        state
                    }
                }
            }
        }
    }
`;

export class Apollo extends Component {

    render() {
        const { data: { loading } } = this.props;
        if (loading) {
            return <RepoLoader endpoint={GRAPHQL_API}/>
        }

        const { data: { github: { user: { repos } } } } = this.props;
        const list = repos.map((repo, i) => (
            <div key={ i }>
                <ul className={ styles.list }>
                    <li>
                        <h2>{ repo.name }</h2>
                    </li>
                    <li>
                        Stargazers: n/a
                    </li>
                    <li>
                        Open issues: { repo.issues.filter(i => i.state === "open").length }
                    </li>
                </ul>
            </div>
        ));

        return (
            <div className={ styles.repos }>
                <h1>With GraphQL & Apollo</h1>
                <div className={ styles.data }>
                    { list }
                </div>
            </div>
        );
    }
};

export default compose(
    connect(state => ({ repositories: state[FETCH_REPOS] })),
    graphql(TestQuery,
        { options: ({ repositories: { meta: { requestedUser }} }) =>
            ({ variables: { username: requestedUser || 'rocjs' }}) }
    )
)(Apollo);
