import React, { useState, useEffect} from "react";
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import { withFormik, Form, Field, useFormikContext } from 'formik';

import yaris2020 from './yaris2020.svg';
import yarisAtiv2020 from './YarisAtiv2020.svg';
import yaris2020_img from './yaris2020.png';

import { ReactComponent as IconArrow } from './icon-arrow.svg';

const CalculaterComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    const [ modelCar, setModelCar ] = useState(["Entry", "Sport", "Sport Premium", "Sport Premium (Black Roof)"]);
    const [ colorCar, setColorCar ] = useState([
                        "Attitude Black Mica",
                        "Citrus Mica Metallic / Black Roof",
                        "Cyan Metallic / Black Roof",
                        "Gray Metallic",
                        "Platinum White Pearl",
                        "Platinum White Pearl / Black Roof",
                        "Red Mica Metallic / Black Roof",
                        "Silver Metallic"
                    ]);

    useEffect(() => {
        const setPriceCar = () => {
            if (values.series === "Yaris" && values.model !== "0" && values.color !== "0") {
                let _price = 549000.00;
                if (values.model === "Entry") {
                    _price = 549000.00
                }
                else if (values.model === "Sport") {
                    _price = 609000.00
                }
                else if (values.model === "Sport Premium") {
                    _price = 679000.00
                }
                else {
                    // Sport Premium (Black Roof)
                    _price = 684000.00
                }
                let _installments = setInstallments(_price)
                setMonth(_price, _installments)
                setFieldValue("price", _price + " บาท", false);
            }
            else if (values.series === "Yaris Ativ" && values.model !== "0" && values.color !== "0") {
                let _price = 539000.00;
                if (values.model === "Entry") {
                    _price = 539000.00
                }
                else if (values.model === "Sport") {
                    _price = 599000.00
                }
                else {
                    // Sport Premium
                    _price = 674000.00
                }
                let _installments = setInstallments(_price)
                setMonth(_price, _installments)
                setFieldValue("price", _price + " บาท", false);
            }
            else {
                setFieldValue("installments", "- บาท", false);
                setFieldValue("installments_per_month", "- บาท/เดือน", false);
                setFieldValue("price", "- บาท", false);
            }
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
            return _installments;
        }

        const setMonth = (_price, _installments) => {
            let _balance_price = _price - _installments;
            let _installments_per_month = 0;
            if (values.month === "24 เดือน") {
                _installments_per_month = _balance_price/24;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "36 เดือน") {
                _installments_per_month = _installments/36;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "48 เดือน") {
                _installments_per_month = _installments/48;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            else if (values.month === "60 เดือน") {
                _installments_per_month = _installments/60;
                setFieldValue("installments_per_month", _installments_per_month + " บาท", false);
            }
            return _installments_per_month;
        }
        setPriceCar();

        if(values.series === "Yaris") {
            // Yaris
            setModelCar(["Entry", "Sport", "Sport Premium", "Sport Premium (Black Roof)"]);
            setColorCar([
                "Attitude Black Mica",
                "Citrus Mica Metallic / Black Roof",
                "Cyan Metallic / Black Roof",
                "Gray Metallic",
                "Platinum White Pearl",
                "Platinum White Pearl / Black Roof",
                "Red Mica Metallic / Black Roof",
                "Silver Metallic"
            ]);
        }
        else {
            // Yaris Ativ
            setModelCar(["Entry", "Sport", "Sport Premium"])
            setColorCar(["Attitude Black Mica", "Dark Blue Mica Metallic", "Gray Metallic", "Red Mica Metallic", "Silver Metallic", "Platinu Super White"]);
        }
    }, [values.series, values.installments_percent, values.month, values.model, values.color])
    
    return (
        <div className={`${styles.containerCol}`}>
            <h2>คำนวณเงินผ่อน </h2>
            <div className={styles.boxCalculater}>
                <Form className={`${styles.containerRow}`}>
                    {/* Col #1 */}
                    <div className={styles.containerRowDiv} style={{flexGrow: 1}}>
                        <div className={styles.containerCol}>
                            <div className={`${styles.widthFormInput}`}>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">รุ่นรถ</label>
                                    <SelectBox name="series" values={values} options={[
                                            { image: yaris2020, name: "Yaris" },
                                            { image: yarisAtiv2020, name: "Yaris Ativ" }
                                        ]
                                    } />
                                </div>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">โมเดล</label>
                                    <SelectBoxNoImg name="model" values={values} options={
                                        modelCar.map((_modelCar) => {
                                            return (
                                                {
                                                    name: _modelCar
                                                }
                                            )
                                        })
                                    } />
                                </div>
                                <div className={styles.dropdownSelect}>
                                    <label htmlFor="stickerConfiguration">สี</label>
                                    colorCar
                                    <SelectBoxNoImg name="color" values={values} options={
                                        colorCar.map((_colorCar) => {
                                            return (
                                                {
                                                    name: _colorCar
                                                }
                                            )
                                        })
                                    } />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col #2 */}
                    <div className={styles.containerRowDiv} style={{flexGrow: 1}}>
                        <div className={styles.containerCol}>
                            <div className={styles.textPrice}>
                                <label htmlFor="stickerConfiguration">ราคา</label>
                                <label htmlFor="stickerConfiguration" style={{padding: "0 0 0 20px"}}>{values.price}</label>
                            </div>
                            <div>
                                <label htmlFor="stickerConfiguration">ดาวน์</label>
                                <label htmlFor="stickerConfiguration" style={{padding: "0 0 0 20px"}}>{values.installments}</label>
                            </div>
                            <div className={`${styles.widthFormInput}`}>
                                <div className={styles.dropdownSelectPercent}>
                                    <SelectBoxNoImg name="installments_percent" values={values} options={[
                                            { name: "10%" },
                                            { name: "15%" },
                                            { name: "20%" },
                                            { name: "30%" }
                                        ]
                                    } />
                                </div>
                                <div className={styles.containerRowNoWrap}>
                                    <label htmlFor="stickerConfiguration" style={{margin: "30px 0 0 0", width:"100px"}}>จำนวนเดือน</label>
                                    <div className={styles.dropdownSelect}>
                                        <SelectBoxNoImg name="month" values={values} options={[
                                                { name: "24 เดือน" },
                                                { name: "36 เดือน" },
                                                { name: "48 เดือน" },
                                                { name: "60 เดือน" },
                                            ]
                                        } />
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <div className={styles.containerRow}>
                                    <label htmlFor="stickerConfiguration" className={styles.boxHighlightKey}>ราคาผ่อนเพียง</label>
                                    <div className={styles.boxHighlight}>{isNaN(parseFloat(values.installments_per_month).toFixed(2)) ? "- บาท":parseFloat(values.installments_per_month).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col #3 */}
                    <div className={styles.containerRowDiv} style={{flexGrow: 8}}>
                        <div className={styles.containerCol}>
                            <div className={`${styles.containerRowCenter}`}>
                                <img src={yaris2020_img} alt="." className={styles.previewCar} />
                            </div>
                            <div className={styles.groupContact}>
                                <div className={`${styles.containerRowRight}`}>
                                    <div className={styles.boxHighlightRed} style={{padding: "10px"}}>โทร 02-095-3222</div>
                                </div>
                                <div className={`${styles.containerRowRight}`}>
                                    <a href={"#Register"} className={styles.boxHighlightRed}>ลงทะเบียน</a>
                                    <div className={styles.boxHighlightKeyOr}>หรือ</div>
                                    <div className={styles.boxHighlightGreen}>Add line@</div>
                                </div>
                            </div>
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
                        <div className={styles.selectBoxValue} key={`${lastIndex}`}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.name}` ? true : false} />
                            <p className={styles.selectBoxInputText}>
                                <img src={yaris2020_img} alt="." />
                                {list.name}
                            </p>
                        </div>
                    )
                })}
                <div className={styles.selectBoxValue} key={0}>
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 10px"} }>กรุณาเลือก</p>
                    <IconArrow />
                </div>
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li onClick={() => setFieldValue("showImageUrl", list.image, false)} key={`${lastIndex}`}>
                            <label className={styles.selectBoxOption} htmlFor={`${name}-${lastIndex}`}>
                                <img src={list.image} alt="." width="60px" style={{ marginRight: "10px" }} />
                                {list.name}
                            </label>
                        </li>
                    )
                })}
                <li key={0}>
                    <label className={styles.selectBoxOption} htmlFor={`${name}-0`}>กรุณาเลือก</label>
                </li>
                
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
                        <div className={styles.selectBoxValue} key={`${lastIndex}`}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.name}` ? true : false} />
                            <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 10px"} }>
                                {list.name}
                            </p>
                        </div>
                    )
                })}
                <div className={styles.selectBoxValue} key={0}>
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText} style={ {margin: "0 0 0 10px"} }>กรุณาเลือก</p>
                    <IconArrow />
                </div>
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li onClick={() => setFieldValue("showImageUrl", list.image, false)} key={`${lastIndex}`}>
                            <label className={styles.selectBoxOption} htmlFor={`${name}-${lastIndex}`}>
                                {list.name}
                            </label>
                        </li>
                    )
                })}
                <li key={0}>
                    <label className={styles.selectBoxOption} htmlFor={`${name}-0`}>กรุณาเลือก</label>
                </li>
                
            </ul>
        </div>
    )
};

export const EnhancedCalculaterComponent = withFormik({
    mapPropsToValues: () => ({
        series: "0",
        model: "0",
        color: "0",
        price: "0",
        installments: 0,
        installments_percent: "10%",
        month: "24 เดือน",
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