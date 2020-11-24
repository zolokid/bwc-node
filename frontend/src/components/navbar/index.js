import React from "react";
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import { ReactComponent as Logo } from './logo.svg';

const NavBarComponent = ({ history, itemCount }) => {
    return (
        <header>
            <div className={styles.navBar}>
                <Logo/>
            </div>            
        </header>
    )
};

export default withRouter(NavBarComponent);