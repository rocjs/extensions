import React, { Component } from 'react';

import styles from './style.scss';

const Decorate = (target) => {
    return target;
}

@Decorate
export default class Hello extends Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    render() {
        return <div className={styles.hest}>Hello { this.props.name }</div>;
    }
}
