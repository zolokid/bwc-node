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
import YarisData from './yaris.json';

// import remoPomote from './pomotion_revo.gif';
import yarisPromote from './promotion_yaris.gif';
import yarisPromoteMobile from './promotion_yaris_mobile.gif';

//const ga = 'G-PBBL9S80RC';
//ReactGA.initialize(ga);
// Disable file protocol checking (so that GA will work on Android devices)
//ReactGA.ga('set', 'checkProtocolTask', null);
//ReactGA.pageview('/toyota-yaris');

//global variable
window.data_customer = {
    name: "",
    mobile_no: "",
    zipcode: "",
    model: "",
    model_no: "",
    finance_model: "",
    finance_submodel: "",
    finance_price: 0,
    finance_down_percent: 0,
    finance_down_amount: 0,
    finance_period: 0,
    finance_per_month: 0,
    is_company: 0
};

const HomeComponent = () => {
    var defaultTitle = 'ซื้อ Toyota Yaris/Ativ ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor';
    return (
        <>
        <Helmet>
            <title>{defaultTitle}</title>
            <meta name="title" content="ซื้อ Toyota Yaris/Ativ ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
            <meta name="description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ TOYOTA YARIS/ATIV ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content=""/>
            <meta property="og:title" content="ซื้อ Toyota Yaris/Ativ ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
            <meta property="og:description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ TOYOTA YARIS/ATIV ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>
            <meta property="og:image" content="https://www.toyotabara.com/home/wp-content/uploads/2020/12/promotion_yaris_social.gif"/>

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content=""/>
            <meta property="twitter:title" content="ซื้อ Toyota Yaris/Ativ ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ที่ Barawindsor"/>
            <meta property="twitter:description" content="ออกรถง่ายเพียง 800 บาท เพียงซื้อ TOYOTA YARIS/ATIV ทุกรุ่นวันนี้ ที่ Toyota Barawindsor ทุกสาขา"/>
            <meta property="twitter:image" content="https://www.toyotabara.com/home/wp-content/uploads/2020/12/promotion_yaris_social.gifแก"></meta>
        </Helmet>
            <main>
                {/* Banner */}
                <img src={yarisPromote} alt="." className={styles.banner} />
                <img src={yarisPromoteMobile} alt="." className={styles.bannerMobile} />

                {/* RegisterComponent */}
                <div className={styles.goldText} id="Register">
                    <RegisterComponent dataContent={YarisData} />
                </div>
                <section className={styles.registerSection} id="Register"> 
                    <RegisterComponent dataContent={YarisData} />
                </section>

                {/* Promotion */}
                <section className={styles.section1}>
                    <PromotionComponent />
                </section>
                
                {/* Calculate installment */}
                <section className={styles.section2} id="Calculate">
                    <CalculaterComponent dataContent={YarisData}/>
                </section>

                {/* Check Infomation of Car */}
                <section className={styles.section3}>
                    <CheckInformationComponent dataContent={YarisData}/>
                </section>

                {/* Performance */}
                <section className={styles.section4}>
                    <PerformanceComponent dataContent={YarisData}/>
                </section>

                {/* Footer */}
                <section>
                    <FooterComponant />
                </section>
                
            </main>
        </>
    )
};

export default HomeComponent;