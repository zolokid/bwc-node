import React from "react";
import Promotion from './promotion.svg';
import styles from './index.module.scss';

const PerformanceComponent = () => {
    return (
        <div className={styles.containerRow}>
            {/* <Promotion className={styles.imagePerformance}/> */}
            <img src={Promotion} alt="." className={styles.imagePerformance} />
        </div>
    )
};

export default PerformanceComponent;