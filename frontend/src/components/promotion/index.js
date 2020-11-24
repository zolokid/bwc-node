import React from "react";
import { ReactComponent as Promotion } from './pomotion.svg';
import styles from './index.module.scss';

const CalculaterComponent = () => {
    return (
        <div className={styles.sectionPromotion}>
            <h2>ดูข้อมูลรถ</h2>
            <Promotion className={styles.promotion}/>
        </div>
    )
};

export default CalculaterComponent;