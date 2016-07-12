import React, { Component } from 'react';

import styles from './style.scss';

const Decorate = (target) => {
    return target;
}

@Decorate
export default class Hello extends Component {

    render() {
        return <div className={styles.hest}>Hello World</div>;
    }
}
