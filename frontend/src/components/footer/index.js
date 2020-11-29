import React from "react";
import styles from './index.module.scss';

const FooterComponant = (props) => {

    return (
        <footer>
            <div className={styles.bgFooter}>
                <div className={styles.groupUl}>
                    <ul>
                        <li><b>สาขา ศรินครินทร์</b></li>
                        <li>โทรศัพท์ : 02 095 2837 – 2839</li>

                        <li className={styles.newLine}><b>CALLCENTER</b></li>
                        <li>02-095-3222</li>
                        <li>FAX:</li>
                        <li>02 095 3164</li>
                    </ul>
                </div>
                <div className={styles.groupUl}>
                    <ul>
                        <li><b>สาขา พระราม 4</b></li>
                        <li>โทรศัพท์ : 02 095 3162 – 3164</li>
                        <li className={styles.newLine}><b>EMAIL</b></li>
                        <li>info@barawindsor.com</li>
                    </ul>
                </div>
                <div className={styles.groupUl}>
                    <ul>
                        <li><b>สาขา ลาดกระบัง</b></li>
                        <li>โทรศัพท์ : 02 095 2850</li>
                        <li className={styles.newLine}><b>HOURS</b></li>
                        <li>เวลาทำการ Call Center</li>
                        <li>จ.-ศ. 08.00-17.30 น.</li>
                        <li>ส. 08.30-17.30 น.</li>
                        <li>หยุดวันอาทิตย์ และวันหยุดนักขัตฤกษ์</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
};

export default FooterComponant;