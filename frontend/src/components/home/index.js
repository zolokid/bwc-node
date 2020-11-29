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
import YarisData from './yaris.json';

// import remoPomote from './pomotion_revo.gif';
import yarisPomote from './promotion_yaris.gif';

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
    var defaultTitle = 'Toyota Yaris - ซื้อ YARIS/ATIV ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท | Barawindsor';
    return (
        <>
        <Helmet>
            <title>{defaultTitle}</title>
        </Helmet>
            <main>
                {/* Banner */}
                <img src={yarisPomote} alt="." className={styles.banner} />

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
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-PBBL9S80RC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PBBL9S80RC');
</script> */}
export default HomeComponent;