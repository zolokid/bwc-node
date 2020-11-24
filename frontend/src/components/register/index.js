import React from "react";
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import { withFormik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import axios from "axios";

import yaris2020 from './yaris2020.svg';
import yarisAtiv2020 from './YarisAtiv2020.svg';

const RegisterComponent = () => {
    const { values } = useFormikContext();

    return (
        <Form style={{width: "100%"}}>
        <h2 style={{margin:"10px"}}>ลงทะเบียนรับสิทธ์พิเศษ </h2>
            <div className={styles.boxReister}>
                <div className={styles.containerRow}>
                    <div className={`${styles.formControl} ${styles.widthFormInput}`}>
                        <p>ชื่อ-นามสกุล</p>
                        <p className={styles.mustField}>*</p> 
                        <ErrorMessage name="name_surname" render={msg => <span className="error">{msg}</span>} />
                        <Field name="name_surname" type="text" placeholder="" />
                    </div>
                    
                    
                    <div className={`${styles.formControl} ${styles.widthFormInput}`}>
                        <p>เบอร์โทรศัพท์*</p>
                        <p className={styles.mustField}>*</p> 
                        <ErrorMessage name="phone" render={msg => <span className="error">{msg}</span>} />
                        <Field name="phone" type="number" placeholder="" />
                    </div>
                    
                    <div className={`${styles.formControl} ${styles.widthFormInput}`}>
                        <p>รหัสไปรษณีย์</p>
                        <p className={styles.mustField}>*</p> 
                        <ErrorMessage name="zip" render={msg => <span className="error">{msg}</span>} />
                        <Field name="zip" type="number" placeholder="" />
                    </div>
                    

                </div>
                <p>รุ่นรถที่สนใจ*</p>
                <SelectCar name="select_car" id="select_car" values={values} options={[
                    { value: "Yaris 2020", name: "Yaris 2020", logoBank: yaris2020 },
                    { value: "Yaris Ativ 2020", name: "Yaris Ativ 2020", logoBank: yarisAtiv2020 },
                ]} />

                <div className={styles.containerRowEnd}>
                    <a href="#Calculate" className={styles.buttonCalInstallment} style={{margin: "0 10px", fontSize:"12px"}}><b>คำนวณเงินผ่อน</b></a>
                    <button type="submit" className={styles.buttonRegister} style={{margin: "0 10px", fontSize:"12px"}}><b>ลงทะเบียน</b></button>
                </div>
            </div>
        </Form>
    )
};

const SelectCar = ({ values, name, options }) => {
    return (
        <div className={styles.containerCol}>
            {options.map((list, index) => {
                return (
                    <div className={`${styles.boxRadiusSmall} ${styles.selectBoxInput}`} key={`${name}-${index + 1}`}>
                        <Field name={name} type="radio" value={list.value} id={`${name}-${index + 1}`}
                            checked={`${values[name]}` === `${list.value}` ? true : false} />
                    </div>
                )
            })}

            <ul className={`${styles.containerRow}`}>
                {options.map((list, index) => {
                    return (
                        <li className={`${styles.optionShipping} ${styles.boxRadiusSmall} ${`${values.select_car}` === `${list.value}` ? styles.active : styles.deactive}`}  key={`${name}-${index + 1}`}>
                            <label className={styles.selectBoxOption} htmlFor={`${name}-${index + 1}`}>
                                <div className={styles.containerRow}>
                                    <div className={styles.containerColCar}>
                                        <img src={list.logoBank} alt="Product" className={styles.logoBank} />
                                    </div>
                                </div>
                                <div className={`${styles.containerRow} ${styles.center}`}>
                                    <div className={styles.boxNameCar}>
                                        {list.name}
                                    </div>
                                </div>
                                <div className={`${styles.containerRow} ${styles.center}`}>
                                    <h4 className={`${styles.selectCar} ${`${values.select_car}` === `${list.value}` ? styles.activeHere : styles.deactiveHere}`} >
                                        คุณเลือกอันนี้
                                    </h4>
                                </div>
                                
                            </label>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
};

const postRegister = (values) => {
    let dataPost = {
        "name": values.name_surname,
        "mobile_no": values.phone,
        "zipcode": values.zip,
        "model": values.select_car,
        "model_no": "Yaris MC 2020",
        "finance_model": "-",
        "finance_submodel": "-",
        "finance_price": 0,
        "finance_down_percent": 0,
        "finance_down_amount": 0,
        "finance_period": 12,
        "finance_per_month": 0
    }

    axios.post(`localhost:5000/api/register`, dataPost)
        .then(res => {
            console.log("Complete")
            alert("Complete")
        }).catch(function (err) {
            console.log("err", err)
            alert("err", err)
        })
}

export const EnhancedRegisterComponent = withFormik({
    mapPropsToValues: () => ({
        name_surname: '',
        phone: '',
        zip: '',
        select_car: 'Yaris 2020'
    }),
    validate: values => {
        const errors = {};

        if (values.name_surname === "") {
            errors.name_surname = "required";
        }

        if (values.phone === "") {
            errors.phone = "required";
        }

        if (values.zip === "") {
            errors.zip = "required";
        }

        return errors;
    },
    handleSubmit: (values, { props }) => {
        // alert("Donut")
        // alert(JSON.stringify(values, null, 2));
        postRegister(values);
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 0);
    },
    displayName: 'RegisterComponentForm',
})(withRouter(RegisterComponent));

export default withRouter(EnhancedRegisterComponent);