import React, {useState, useEffect} from "react";
import { ReactComponent as Promotion } from './promotion.svg';
import styles from './index.module.scss';

import yaris2020 from './yaris2020.svg';
import yarisAtiv2020 from './YarisAtiv2020.svg';

const CalculaterComponent = () => {
    const [series, setSeries] = useState("yaris2020");
    const [ model, setModel ] = useState("Entry");
    const [ modelCar, setModelCar ] = useState(["Entry", "Sport", "Sport Premium", "Sport Premium (Black Roof)"]);
    const [ price, setPrice ] = useState(["549,000.00", "609,000.00", "679,000.00", "684,000.00"]);

    useEffect(() => {
        if(series === "yaris2020") {
            // Yaris
            setModelCar(["Entry", "Sport", "Sport Premium", "Sport Premium (Black Roof)"]);
            setPrice(["549,000.00", "609,000.00", "679,000.00", "684,000.00"]);
        }
        else {
            // Yaris Ativ
            setModelCar(["Entry", "Sport", "Sport Premium"])
            setPrice(["539,000.00", "599,000.00", "674,000.00"]);
        }
    }, [series])


    return (
        <div className={styles.sectionPromotion}>
            <h2 style={{margin:"20px 0"}}>ดูข้อมูลรถ</h2>
            <div className={styles.containerCol}>
                <h3 style={{margin:"20px 0"}}>รุ่นรถที่สนใจ</h3>
                <div className={styles.containerRow}>
                    <div className={`${styles.btnShippingOption} ${series==="yaris2020" && styles.active }`} onClick={() => setSeries("yaris2020")}>
                        <div className={styles.containerRowNoWrap}>
                            <img src={yaris2020} alt="." className={styles.previewCar} />
                            <div className={styles.containerColNoWrap}>
                                <h3 style={{fontSize:"18px"}}>Yaris 2020</h3>
                                <p>เริ่มต้น 539,000 บาท</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.btnShippingOption} ${series==="yarisAtiv2020" && styles.active }`} onClick={() => setSeries("yarisAtiv2020")} >
                        <div className={styles.containerRowNoWrap}>
                            <img src={yarisAtiv2020} alt="." className={styles.previewCar} />
                            <div className={styles.containerColNoWrap}>
                                <h3 style={{fontSize:"18px"}}>Yaris Ativ 2020</h3>
                                <p>เริ่มต้น 549,000 บาท</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 style={{margin:"20px 0"}}>โมเดล</h3>
                <div className={styles.containerRow}>
                    <img src={yaris2020} alt="." className={styles.previewCar} />
                    {modelCar.map((_modelCar, index) => {
                        return (
                            <div key={index} className={`${styles.btnShippingOption} ${model===_modelCar ? styles.active:styles.deactive }`} onClick={() => setModel(_modelCar)}>
                                <div className={styles.containerRow}>
                                    <div className={`${styles.containerCol} ${styles.modelCar}`}>
                                        <h1>{_modelCar}</h1>
                                        <div className={styles.containerRow}>
                                            <p style={{fontSize: "14px"}}>{price[index]} / </p>
                                            <qd style={{fontSize: "14px"}}>&nbsp;เริ่มต้น 10,106 ต่อเดือน</qd>
                                        </div>
                                        <div href="#Calculate" type="button" className={styles.buttonForCal}>คำนวณเงินผ่อน</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                <Promotion className={styles.promotion}/>
            </div>
        </div>
    )
};

export default CalculaterComponent;