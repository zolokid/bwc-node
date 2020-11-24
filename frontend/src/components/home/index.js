import React from "react";
// import { withRouter } from 'react-router';
import { ReactComponent as Banner } from './banner.svg';
import RegisterComponent from "../register";
import PromotionComponent from "../promotion";
import CalculaterComponent from "../calculater";
import CheckInformationComponent from "../check_information";

import styles from './index.module.scss';

const HomeComponent = () => {
    return (
        <>
            <main>
                {/* Banner */}
                <Banner className={styles.banner} />

                {/* RegisterComponent */}
                <div className={styles.goldText} id="Register">
                    <RegisterComponent />
                </div>
                <section className={styles.registerSection} id="Register"> 
                    <RegisterComponent />
                </section>

                {/* Promotion */}
                <section className={styles.section1}>
                    <PromotionComponent />
                </section>
                
                {/* Calculate installment */}
                <section className={styles.section2} id="Calculate">
                    <CalculaterComponent />
                </section>

                {/* Check Infomation of Car */}
                <section className={styles.section3}>
                    <CheckInformationComponent />
                </section>
                
            </main>
        </>
    )
};

export default HomeComponent;