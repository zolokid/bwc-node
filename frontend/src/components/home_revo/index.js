import React from "react";
// import { withRouter } from 'react-router';
// import { ReactComponent as Banner } from './banner.svg';
import RegisterComponent from "../register";
import PromotionComponent from "../promotion";
import CalculaterComponent from "../calculater";
import CheckInformationComponent from "../check_information";
import PerformanceComponent from "../preformance";
import FooterComponant from "../footer";
import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import styles from './index.module.scss';

// Data of Toyota Yaris
import RevoData from './revo.json';
import remoPomote from './promotion_revo.gif';
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
    var defaultTitle = 'Toyota Hilux Revo - ซื้อ Revo ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท | Barawindsor';
    return (
        <>
        <Helmet>
            <title>{defaultTitle}</title>
        </Helmet>
            <main>
                {/* Banner */}
                <img src={remoPomote} alt="." className={styles.banner} />

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
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-PBBL9S80RC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PBBL9S80RC');
</script> */}
export default HomeRevoComponent;