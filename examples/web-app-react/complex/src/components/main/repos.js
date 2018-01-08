import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Repo from '../repo';
import Apollo from '../graphql';
import RepoUpdateButton from '../repo/button';

import styles from  '../shared.css';

export default class Repos extends Component {
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
        let buttonText;

        if (this.props.error) {
            buttonText = 'Oops! Try again.';
        } else if (this.props.loading) {
            buttonText = 'Try again.';
        } else if (!this.props.payload && !this.props.loading) {
            buttonText = 'No data provided. Try again.';
        } else {
            buttonText = 'Reload repos data.';
        }

        return (
            <div>
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

                <Tabs className={styles["react-tabs"]}>
                    <TabList>
                        <Tab>Redux/Fetch</Tab>
                        <Tab>GraphQL/Apollo</Tab>
                    </TabList>

                    <TabPanel>
                        <Repo { ...this.props }/>
                    </TabPanel>
                    <TabPanel>
                        <Apollo />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
