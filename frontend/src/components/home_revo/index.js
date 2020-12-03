import React from "react";
// import { withRouter } from 'react-router';
// import { ReactComponent as Banner } from './banner.svg';
import RegisterComponent from "../register";
import PromotionComponent from "../promotion";
import CalculaterComponent from "../calculater";
import CheckInformationComponent from "../check_information";
import PerformanceComponent from "../preformance";
import FooterComponant from "../footer";
// import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import styles from './index.module.scss';

// Data of Toyota Yaris
import RevoData from './revo.json';
import revoPromote from './promotion_revo.gif';
import revoPromoteMobile from './promotion_revo_mobile.gif';
// import yarisPomote from './pomotion_yaris.gif';

//const ga = 'G-PBBL9S80RC';
//ReactGA.initialize(ga);
// Disable file protocol checking (so that GA will work on Android devices)
//ReactGA.ga('set', 'checkProtocolTask', null);
//ReactGA.pageview('/toyota-revo');

//global variable
window.data_customer = {
    name: "",
    mobile_no: "",
    zipcode: "",
    model: "",
    model_no: "",
    finance_model: "",
    finance_submodel: "",
    finance_price: "",
    finance_down_percent: "",
    finance_down_amount: "",
    finance_period: "",
    finance_per_month: "",
    is_company: 1
};

const HomeRevoComponent = () => {
    var defaultTitle = 'ซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor';
    return (
        <>
            <Helmet>
                <title>{defaultTitle}</title>
                <meta name="title" content="ซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
                <meta name="description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content=""/>
                <meta property="og:title" content="ซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
                <meta property="og:description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>
                <meta property="og:image" content="https://www.toyotabara.com/home/wp-content/uploads/2020/12/promotion_revo_social.gif"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content=""/>
                <meta property="twitter:title" content="ซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
                <meta property="twitter:description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ Toyota Hilux Revo ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>
                <meta property="twitter:image" content="https://www.toyotabara.com/home/wp-content/uploads/2020/12/promotion_revo_social.gif"></meta>
            </Helmet>
            <main>
                {/* Banner */}
                <img src={revoPromote} alt="." className={styles.banner} />
                <img src={revoPromoteMobile} alt="." className={styles.bannerMobile} />

                {/* RegisterComponent */}
                <div className={styles.goldText} id="Register">
                    <RegisterComponent dataContent={RevoData} />
                </div>
                <section className={styles.registerSection} id="Register"> 
                    <RegisterComponent dataContent={RevoData} />
                </section>

                {/* Promotion */}
                <section className={styles.section1}>
                    <PromotionComponent />
                </section>
                
                {/* Calculate installment */}
                <section className={styles.section2} id="Calculate">
                    <CalculaterComponent dataContent={RevoData}/>
                </section>

                {/* Check Infomation of Car */}
                <section className={styles.section3}>
                    <CheckInformationComponent dataContent={RevoData}/>
                </section>

                {/* Performance */}
                <section className={styles.section4}>
                    <PerformanceComponent dataContent={RevoData}/>
                </section>
                
                {/* Check Infomation of Car */}
                <section>
                    <FooterComponant />
                </section>
            </main>
        </>
    )
};

export default HomeRevoComponent;