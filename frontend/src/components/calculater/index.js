import React, { useState, useEffect} from "react";
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import { withFormik, Form, Field, useFormikContext } from 'formik';

import yaris2020 from './yaris-2020.png';
import yarisAtiv2020 from './ativ-2020.png';
import revo2020 from './revo-2020.png';
import revoSmart2020 from './revoSmart-2020.png';
import revoDouble2020 from './revoDouble-2020.png';

import dataToyotaYaris from '../home/yaris.json';
import dataToyotaRevo from '../home_revo/revo.json';
import { ReactComponent as IconArrow } from './icon-arrow.svg';

function currencyFormat(num) {
    num = parseFloat(num);
    return (num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
}

const CalculaterComponent = (props) => {
    const imageCars = [yaris2020, yarisAtiv2020, yarisAtiv2020]
    const { values, setFieldValue } = useFormikContext();
    const [ masterData, setMasterData ] = useState(props.dataContent.yaris);

    useEffect(() => {
        var pathname = window.location.pathname;
        var dataToyota = {};
        
        if (pathname === "/toyota-revo") {
            dataToyota = dataToyotaRevo;
            if (values.series === dataToyota.model[0]) {
                setFieldValue("model", dataToyota.yaris.subModel[0]);
                setFieldValue("color", dataToyota.yaris.colorName[0]);
            }
            else if (values.series === dataToyota.model[1]) {
                setFieldValue("model", dataToyota.yarisAtiv.subModel[0]);
                setFieldValue("color", dataToyota.yarisAtiv.colorName[0]);
            }
            else {
                setFieldValue("model", dataToyota.doubleCab.subModel[0]);
                setFieldValue("color", dataToyota.doubleCab.colorName[0]);
            }
        }
        else {
            dataToyota = dataToyotaYaris;
            if (values.series === dataToyota.model[0]) {
                setFieldValue("model", dataToyota.yaris.subModel[0]);
                setFieldValue("color", dataToyota.yaris.colorName[0]);
            }
            else {
                setFieldValue("model", dataToyota.yarisAtiv.subModel[0]);
                setFieldValue("color", dataToyota.yarisAtiv.colorName[0]);
            }
        }
        
    }, [values.series])

    // Compute Price
    useEffect(() => {
        const setPriceCar = () => {
            var pathname = window.location.pathname;
            var dataToyota = {};
            if (pathname === "/toyota-revo") {
                dataToyota = dataToyotaRevo;
                if (values.series === dataToyota.model[0] && values.model !== "0" && values.color !== "0") {
                    setMasterData(props.dataContent.yaris);
                    let _price = 549000.00;
                    if (values.model === dataToyota.yaris.subModel[0]) { 
                        _price = dataToyota.yaris.price[0]
                        window.data_customer.model_no = dataToyota.yaris.modelNo[0];
                    }
                    else if (values.model === dataToyota.yaris.subModel[1]) { 
                        _price = dataToyota.yaris.price[1] 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[1];
                    }
                    else if (values.model === dataToyota.yaris.subModel[2]) { 
                        _price = dataToyota.yaris.price[2] 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[2];
                    }
                    else if (values.model === dataToyota.yaris.subModel[3]) { 
                        _price = dataToyota.yaris.price[3]
                        window.data_customer.model_no = dataToyota.yaris.modelNo[3];
                    }
                    else if (values.model === dataToyota.yaris.subModel[4]) { 
                        _price = dataToyota.yaris.price[4] 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[4];
                    }
                    else if (values.model === dataToyota.yaris.subModel[5]) { 
                        _price = dataToyota.yaris.price[5]
                        window.data_customer.model_no = dataToyota.yaris.modelNo[5];
                    }
                    else { 
                        _price = dataToyota.yaris.price[6];
                        window.data_customer.model_no = dataToyota.yaris.modelNo[6];
                    }
                    if (values.color === "Super White") { _price = _price - 7000; }
                    let _installments = setInstallments(_price)
                    setMonth(_price, _installments)
                    setFieldValue("price", _price + " บาท", false);
                    window.data_customer.finance_model = values.series;
                    window.data_customer.finance_submodel = values.model;
                    window.data_customer.finance_price = _price;
                    window.data_customer.finance_down_amount = _installments;
                }
                else if (values.series === dataToyota.model[1] && values.model !== "0" && values.color !== "0") {
                    setMasterData(props.dataContent.yarisAtiv);
                    let _price = 539000.00;
                    if (values.model === dataToyota.yarisAtiv.subModel[0]) { 
                        _price = dataToyota.yarisAtiv.price[0] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[0];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[1]) { 
                        _price = dataToyota.yarisAtiv.price[1] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[1];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[2]) { 
                        _price = dataToyota.yarisAtiv.price[2] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[2];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[3]) { 
                        _price = dataToyota.yarisAtiv.price[3] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[3];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[4]) { 
                        _price = dataToyota.yarisAtiv.price[4] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[4];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[5]) {
                        _price = dataToyota.yarisAtiv.price[5]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[5];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[6]) { 
                        _price = dataToyota.yarisAtiv.price[6]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[6];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[7]) { 
                        _price = dataToyota.yarisAtiv.price[7]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[7];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[8]) { 
                        _price = dataToyota.yarisAtiv.price[8]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[8];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[9]) { 
                        _price = dataToyota.yarisAtiv.price[9]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[9];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[10]) { 
                        _price = dataToyota.yarisAtiv.price[10]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[10];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[11]) { 
                        _price = dataToyota.yarisAtiv.price[11]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[11];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[12]) { 
                        _price = dataToyota.yarisAtiv.price[12]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[12];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[13]) { 
                        _price = dataToyota.yarisAtiv.price[13]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[13];
                    }
                    else if (values.model === dataToyota.yarisAtiv.subModel[14]) { 
                        _price = dataToyota.yarisAtiv.price[14]
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[14];
                    }
                    else { 
                        _price = dataToyota.yarisAtiv.price[15] 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[15];
                    }

                    // Color
                    if (values.color === "Emotional Red II") { _price = _price + 10000; }
                    else if (values.color === "Super White II") { _price = _price - 7000; }
                    else if (values.color === "White Pearl Crystal") { _price = _price + 10000; }
                    let _installments = setInstallments(_price)
                    setMonth(_price, _installments)
                    setFieldValue("price", _price + " บาท", false);
                    
                    window.data_customer.finance_model = values.series;
                    window.data_customer.finance_submodel = values.model;
                    window.data_customer.finance_price = _price;
                    window.data_customer.finance_down_amount = _installments;
                }
                else if (values.series === dataToyota.model[2] && values.model !== "0" && values.color !== "0") {
                    setMasterData(props.dataContent.doubleCab);
                    let _price = 539000.00;

                    if (values.model === dataToyota.doubleCab.subModel[0]) { 
                        _price = dataToyota.doubleCab.price[0] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[0];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[1]) { 
                        _price = dataToyota.doubleCab.price[1] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[1];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[2]) { 
                        _price = dataToyota.doubleCab.price[2] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[2];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[3]) { 
                        _price = dataToyota.doubleCab.price[3] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[3];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[4]) { 
                        _price = dataToyota.doubleCab.price[4] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[4];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[5]) { 
                        _price = dataToyota.doubleCab.price[5]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[5];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[6]) { 
                        _price = dataToyota.doubleCab.price[6]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[6];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[7]) { 
                        _price = dataToyota.doubleCab.price[7]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[7];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[8]) { 
                        _price = dataToyota.doubleCab.price[8]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[8];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[9]) { 
                        _price = dataToyota.doubleCab.price[9]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[9];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[10]) { 
                        _price = dataToyota.doubleCab.price[10]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[10];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[11]) { 
                        _price = dataToyota.doubleCab.price[11]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[11];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[12]) { 
                        _price = dataToyota.doubleCab.price[12]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[12];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[13]) { 
                        _price = dataToyota.doubleCab.price[13]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[13];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[14]) { 
                        _price = dataToyota.doubleCab.price[14]
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[14];
                    }
                    else if (values.model === dataToyota.doubleCab.subModel[15]) { 
                        _price = dataToyota.doubleCab.price[15] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[15];
                    }
                    else { 
                        _price = dataToyota.doubleCab.price[16] 
                        window.data_customer.model_no = dataToyota.doubleCab.modelNo[16];
                    }

                    // Color
                    if (values.color === "Emotional Red II") { _price = _price + 10000; }
                    else if (values.color === "Super White II") { _price = _price - 7000; }
                    else if (values.color === "White Pearl Crystal") { _price = _price + 10000; }

                    let _installments = setInstallments(_price)
                    setMonth(_price, _installments)
                    setFieldValue("price", _price + " บาท", false);
                    window.data_customer.finance_model = values.series;
                    window.data_customer.finance_submodel = values.model;
                    window.data_customer.finance_price = _price;
                    window.data_customer.finance_down_amount = _installments;
                }
                else {
                    setFieldValue("installments", "- บาท", false);
                    setFieldValue("installments_per_month", "- บาท/เดือน", false);
                    setFieldValue("price", "- บาท", false);
                }
            }
            else {
                dataToyota = dataToyotaYaris;
                if (values.series === dataToyota.model[0] && values.model !== "0" && values.color !== "0") {
                    let _price = 549000.00;
                    setMasterData(props.dataContent.yaris);
                    if (values.model === "Entry") { 
                        _price = 549000.00 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[0];
                    }
                    else if (values.model === "Sport") { 
                        _price = 609000.00 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[1];
                    }
                    else if (values.model === "Sport Premium") { 
                        _price = 679000.00 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[2];
                    }
                    else { 
                        _price = 684000.00 
                        window.data_customer.model_no = dataToyota.yaris.modelNo[3];
                    } // Sport Premium (Black Roof)
                    let _installments = setInstallments(_price)
                    setMonth(_price, _installments)
                    setFieldValue("price", _price + " บาท", false);
                    window.data_customer.finance_model = values.series;
                    window.data_customer.finance_submodel = values.model;
                    window.data_customer.finance_price = _price;
                    window.data_customer.finance_down_amount = _installments;
                }
                else if (values.series === dataToyota.model[1] && values.model !== "0" && values.color !== "0") {
                    let _price = 539000.00;
                    setMasterData(props.dataContent.yarisAtiv);
                    if (values.model === "Entry") { 
                        _price = 539000.00 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[0];
                    }
                    else if (values.model === "Sport") { 
                        _price = 599000.00 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[1];
                    }
                    else { 
                        _price = 674000.00 
                        window.data_customer.model_no = dataToyota.yarisAtiv.modelNo[2];
                    }// Sport Premium
                    let _installments = setInstallments(_price)
                    setMonth(_price, _installments)
                    setFieldValue("price", _price + " บาท", false);
                    window.data_customer.finance_model = values.series;
                    window.data_customer.finance_submodel = values.model;
                    window.data_customer.finance_price = _price;
                    window.data_customer.finance_down_amount = _installments;
                }
                else {
                    setFieldValue("installments", "- บาท", false);
                    setFieldValue("installments_per_month", "- บาท/เดือน", false);
                    setFieldValue("price", "- บาท", false);
                }
            }
            console.log(values.series);
        }

        const setInstallments = (_price) => {
            let _installments = 0
            if (values.installments_percent === "10%") {
                _installments = _price * 0.1
                setFieldValue("installments", _installments + " บาท", false);
            }
            else if (values.installments_percent === "15%") {
                _installments = _price * 0.15
                setFieldValue("installments", _installments + " บาท", false);
            }
            else if (values.installments_percent === "20%") {
                _installments = _price * 0.2
                setFieldValue("installments", _installments + " บาท", false);
            }
            else if (values.installments_percent === "25%") {
                _installments = _price * 0.25
                setFieldValue("installments", _installments + " บาท", false);
            }
            else if (values.installments_percent === "30%") {
                _installments = _price * 0.3
                setFieldValue("installments", _installments + " บาท", false);
                return _installments;
            }
            else {
                _installments = _price
                setFieldValue("installments", 0 + " บาท", false);
            }
            return _installments;
        }

        const setMonth = (_price, _installments) => {
            let _balance_price = _price - _installments;
            let _installments_per_month = 0;
            if (values.month === "48 เดือน") {
                _installments_per_month = _balance_price/48;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "60 เดือน") {
                _installments_per_month = _installments/60;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "72 เดือน") {
                _installments_per_month = _installments/72;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "84 เดือน") {
                _installments_per_month = _installments/84;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            window.data_customer.finance_per_month = _installments_per_month;
            return _installments_per_month;
        }
        
        setPriceCar();

        window.data_customer.finance_down_percent = values.installments_percent
        window.data_customer.finance_period = values.month;
    }, [values.series, values.installments_percent, values.month, values.model, values.color])
    
    return (
        <div className={`${styles.containerCol}`}>
            <h2 style={{padding: "20px 20px"}}>คำนวณเงินผ่อน </h2>
            <div className={styles.boxCalculater}>
                <Form className={`${styles.containerRow}`}>
                    {/* Col #1 */}
                    <div className={styles.containerRowDiv} style={{flexGrow: 1}}>
                        <div className={styles.containerColWidth}>
                            <div className={`${styles.widthFormInput}`}>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">รุ่นรถ</label>
                                    <SelectBox name="series" values={values} options={
                                        props.dataContent.model.map((_modelCar, index) => {
                                            return ( { image: imageCars[index], name: _modelCar } )
                                        })
                                    } />
                                </div>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">โมเดล</label>
                                    <SelectBoxNoImg name="model" values={values} options={
                                        masterData.subModel.map((_modelCar) => {
                                            return ( { name: _modelCar } )
                                        })
                                    } />
                                </div>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">สี</label>
                                    <SelectBoxNoImg name="color" values={values} options={
                                        masterData.colorName.map((_colorCar) => {
                                            return ( { name: _colorCar } )
                                        })
                                    } />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col #3 IMG CAR #1 Mobile App */}
                    <div className={`${styles.containerRowDiv} ${styles.divPreviewCarMobile}`} style={{flexGrow: 8}}>
                        <div className={styles.containerColWidth}>
                            <div className={`${styles.containerRowCenter}`}>
                                {/*<img src={values.series} alt="." className={styles.previewCar} />*/}
                                {(() => {
                                    switch (values.series) {
                                        case "Yaris 2020": return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                        case "Yaris Ativ 2020": return <img src={yarisAtiv2020} alt="." className={styles.previewCar} />;
                                        case "Revo Standard Cab 2020": return <img src={revo2020} alt="." className={styles.previewCar} />;
                                        case "Revo Smart Cab 2020": return <img src={revoSmart2020} alt="." className={styles.previewCar} />;
                                        case "Revo Double Cab 2020": return <img src={revoDouble2020} alt="." className={styles.previewCar} />;
                                        default: return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Col #2 */}
                    <div className={styles.containerRowDiv2} style={{flexGrow: 1}}>
                        <div className={styles.containerColWidth}>
                            <div className={`${styles.widthFormInputCol2} ${styles.textPrice}` }>
                                <h1 htmlFor="stickerConfiguration" className={styles.key}>ราคา</h1>
                                <label htmlFor="stickerConfiguration" className={styles.value} style={{padding: "0 0 0 20px"}}>{currencyFormat(values.price)}</label>
                            </div>
                            <div className={`${styles.widthFormInputCol2} ${styles.textPrice}`} style={{padding: "0"}}>
                                <h1 htmlFor="stickerConfiguration" className={styles.key}>ดาวน์</h1>
                                <label htmlFor="stickerConfiguration" className={styles.value} style={{padding: "0 0 0 20px"}}>{currencyFormat(values.installments)}</label>
                            </div>
                            <div className={`${styles.widthFormInputColDownMonth}`}>
                                <div className={styles.dropdownSelectPercent}>
                                    <SelectBoxNoImg name="installments_percent" values={values} options={[
                                            { name: "0%" },
                                            { name: "10%" },
                                            { name: "15%" },
                                            { name: "20%" },
                                            { name: "25%" },
                                            { name: "30%" }
                                        ]
                                    } />
                                </div>
                            </div>
                            <div className={`${styles.widthFormInputColDownMonthPercent}`}>
                                <div className={styles.containerRowNoWrap} >
                                    <div className={`${styles.widthFormInputColDownMonthTitel} ${styles.textPrice}`} style={{padding: "0 0 20px 0", margin: "0px"}}>
                                        <h1 htmlFor="stickerConfiguration" className={styles.key} style={{padding:"15px 10px 0 0", width:"120px"}}>จำนวนเดือน</h1>
                                    </div>
                                    <div className={styles.dropdownSelect}>
                                        <SelectBoxNoImg name="month" values={values} options={[
                                                { name: "48 เดือน" },
                                                { name: "60 เดือน" },
                                                { name: "72 เดือน" },
                                                { name: "84 เดือน" },
                                            ]
                                        } />
                                    </div>
                                </div>
                                <div className={styles.containerRowNoWrap}>
                                    <div className={`${styles.widthFormInputColDownMonth} ${styles.textPrice}`} style={{padding: "0 0 20px 0", margin: "0px"}}>
                                        <h1 htmlFor="stickerConfiguration" className={styles.keyTotal} style={{padding:"15px 10px 0 0", width:"140px"}}>ราคาผ่อนเพียง</h1>
                                    </div>
                                    <div className={styles.boxHighlight}>
                                        <h4>{isNaN(parseFloat(values.installments_per_month).toFixed(2)) ? "-":currencyFormat(values.installments_per_month)} บาท/เดือน</h4>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col #3 IMG CAR #2*/}
                    <div className={`${styles.containerRowDiv3} ${styles.divPreviewCarDestop}`} style={{flexGrow: 8}}>
                        <div className={styles.containerColWidth}>
                            <div className={`${styles.containerRowCenter}`}>
                                {/*img src={yarisAtiv2020} alt="." className={styles.previewCar} />*/}
                                {(() => {
                                    switch (values.series) {
                                        case "Yaris 2020": return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                        case "Yaris Ativ 2020": return <img src={yarisAtiv2020} alt="." className={styles.previewCar} />;
                                        case "Revo Standard Cab 2020": return <img src={revo2020} alt="." className={styles.previewCar} />;
                                        case "Revo Smart Cab 2020": return <img src={revoSmart2020} alt="." className={styles.previewCar} />;
                                        case "Revo Double Cab 2020": return <img src={revoDouble2020} alt="." className={styles.previewCar} />;
                                        default: return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                    }
                                })()}
                                
                            </div>
                            <div className={styles.groupContact}>
                                <div className={`${styles.containerRowRight}`}>
                                    <div className={styles.boxHighlightRed} style={{padding: "10px"}}>โทร 02-095-3222</div>
                                </div>
                                <div className={`${styles.containerRowRight}`}>
                                    <a href={"#Register"} className={styles.boxHighlightRed}>ลงทะเบียน</a>
                                    <div className={styles.boxHighlightKeyOr}>หรือ</div>
                                    <div className={styles.boxHighlightGreen}><a href={"https://line.me/R/ti/p/%40125irrov"}>ติดต่อผ่าน Line@</a></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col #3 IMG CAR #2*/}
                    {/* <div className={`${styles.containerRowDiv} ${styles.divPreviewCarMobile}`} style={{flexGrow: 8}}>
                        <div className={styles.containerColWidth}>
                            <div className={`${styles.containerRowCenter}`}>
                                <img src={yaris2020} alt="." className={styles.previewCar} />
                            </div>
                        </div>
                    </div> */}

                    {/* Col #3 Contact */}
                    <div className={`${styles.containerRowContact} ${styles.divPreviewCarMobile}`}>
                        <div className={styles.boxHighlightRed} style={{padding: "10px"}}>
                            โทร 02-095-3222
                        </div>
                        <div className={`${styles.containerRowRight}`}>
                            <a href={"#Register"} className={styles.boxHighlightRed}>ลงทะเบียน</a>
                            <div className={styles.boxHighlightKeyOr}>หรือ</div>
                            <div className={styles.boxHighlightGreen}>Add line@</div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
};

const SelectBox = ({ values, name, options }) => {
    const { setFieldValue } = useFormikContext();
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabIndex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={styles.selectBoxValue} key={`${lastIndex}`} >
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.name}` ? true : false}/>
                            <p className={styles.selectBoxInputText}>
                                {/*<img src={yaris2020} alt="." />*/}
                                {(() => {
                                    switch (list.name) {
                                        case "Yaris 2020": return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                        case "Yaris Ativ 2020": return <img src={yarisAtiv2020} alt="." className={styles.previewCar} />;
                                        case "Revo Standard Cab 2020": return <img src={revo2020} alt="." className={styles.previewCar} />;
                                        case "Revo Smart Cab 2020": return <img src={revoSmart2020} alt="." className={styles.previewCar} />;
                                        case "Revo Double Cab 2020": return <img src={revoDouble2020} alt="." className={styles.previewCar} />;
                                        default: return <img src={yaris2020} alt="." className={styles.previewCar} />;
                                    }
                                })()}
                                {list.name.substr(0, list.name.length-4)}
                            </p>
                            <IconArrow className={styles.arrow} />
                        </div>
                    )
                })}
                {/* <div className={styles.selectBoxValue} key={0}>
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 10px"} }>กรุณาเลือก</p>
                    <IconArrow />
                </div> */}
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li onClick={() => setFieldValue("showImageUrl", list.image, false)} key={`${lastIndex}`}>
                            <label className={styles.selectBoxOption} htmlFor={`${name}-${lastIndex}`}>
                                {/*<img src={list.image} alt="." width="60px" style={{ marginRight: "10px" }} />*/}
                                {(() => {
                                    switch (list.name) {
                                        case "Yaris 2020": return <img src={yaris2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                        case "Yaris Ativ 2020": return <img src={yarisAtiv2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                        case "Revo Standard Cab 2020": return <img src={revo2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                        case "Revo Smart Cab 2020": return <img src={revoSmart2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                        case "Revo Double Cab 2020": return <img src={revoDouble2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                        default: return <img src={yaris2020} alt="." width="60px" style={{ marginRight: "10px" }} />;
                                    }
                                })()}
                                {list.name.substr(0, list.name.length-4)}
                            </label>
                        </li>
                    )
                })}
                {/* <li key={0}>
                    <label className={styles.selectBoxOption} htmlFor={`${name}-0`}>กรุณาเลือก</label>
                </li> */}
                
            </ul>
        </div>
    )
};

const SelectBoxNoImg = ({ values, name, options }) => {
    const { setFieldValue } = useFormikContext();
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabIndex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={`${styles.selectBoxValue}`} key={`${lastIndex}`} >
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.name}` ? true : false} />
                            <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 0px"} }>
                                {list.name}
                            </p>
                            <IconArrow className={styles.arrow} />
                        </div>
                    )
                })}
                {/* <div className={`${styles.selectBoxValue} `} key={0} >
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 10px"}}>กรุณาเลือก</p>
                    <IconArrow />
                </div> */}
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li onClick={() => setFieldValue("showImageUrl", list.image, false)} key={`${lastIndex}`} >
                            <label className={styles.selectBoxOption} htmlFor={`${name}-${lastIndex}`}>
                                {list.name}
                            </label>
                        </li>
                    )
                })}
                {/* <li key={0}>
                    <label className={styles.selectBoxOption} htmlFor={`${name}-0`}>กรุณาเลือก</label>
                </li> */}
                
            </ul>
        </div>
    )
};

var pathname = window.location.pathname;
var dataToyota = {};
if (pathname === "/toyota-revo") {
    dataToyota = dataToyotaRevo;
}
else {
    dataToyota = dataToyotaYaris;
}

export const EnhancedCalculaterComponent = withFormik({
    mapPropsToValues: () => ({
        series: dataToyota.model[0], //"Yaris 2020",
        model: dataToyota.yaris.subModel[0],
        color: dataToyota.yaris.colorName[0],
        price: dataToyota.yaris.price[0],
        installments: 0,
        installments_percent: "30%",
        month: "84 เดือน",
        installments_per_month: "-"
    }),
    validate: values => {
        const errors = {};
        
        if (values.series === "") {
            errors.series = "i18.required";
        }


        return errors;
    },
    handleSubmit: (values, { props }) => {
        // alert("Donut")
        alert(JSON.stringify(values, null, 2));
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 0);
    },
    displayName: 'RegisterComponentForm',
})(withRouter(CalculaterComponent));

export default withRouter(EnhancedCalculaterComponent);