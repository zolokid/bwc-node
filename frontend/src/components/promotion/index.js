import React from "react";
// import { ReactComponent as Promotion } from './pomotion.svg';
import styles from './index.module.scss';
// import remoPomote from './pomotion_revo.gif';
// import yarisPomote from './pomotion_yaris.gif';

const PromotionComponent = (props) => {
    // const Pomoter = [yarisPomote, remoPomote];
    var pathname = window.location.pathname;
    var _title = "";
    var _desp = "";
    var _desp2 = "";
    var _titleRed1 = "";
    var _titleRed1_desp = "";
    var _titleRed2 = "";
    var _titleRed2_desp1 = "";
    var _titleRed2_desp2 = "";
    var _titleRed2_desp3 = "";
    var _titleRed2_desp4 = "";
    var _titleRed2_desp5 = "";
    if (pathname === "/toyota-revo") {
        _title = "ซื้อ REVO ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท ";
        _desp = "ผ่อนเริ่มต้นเพียง 8,659 บาท พร้อมฟรี ประกันภัยชั้น 1 จองรถวันนี้ขับฟรีปีนี้ผ่อนปีหน้า";
        _desp2 = ""
    }
    else {
        _title = "ซื้อ YARIS ATIV ทุกรุ่นวันนี้ ออกรถง่ายเพียง 800 บาท";
        _desp = "ผ่อนเริ่มต้นเพียง 7,XXX บาท พร้อมฟรี ประกันภัยชั้น 1 จองรถวันนี้ขับฟรีปีนี้ผ่อนปีหน้า";
        _desp2 = "พร้อมรับดอกเบี้ย และส่วนลดพิเศษ ของแถมจัดเต็ม";
    }
    _titleRed1 = "ใช้เงินออกรถเพียง 800ได้จริง ต้องที่ โตโยต้าพาราวินเซอร์ เท่านั้น";
    _titleRed1_desp = "*เงื่อนไขและรุ่นรถเป็นไปตามที่บริษัทกำหนด";

    _titleRed2 = "เอกสิทธิ์เพิ่มเติมเฉพาะเจ้าของรถยนต์โตโยต้า";
    _titleRed2_desp1 = "เมื่อซื้อ หรือเปลี่ยนรถโตโยต้าคันใหม่";
    _titleRed2_desp2 = "• รับส่วนลดดอกเบี้ยพิเศษสูงสุด 0.80% มูลค่ากว่า 28,000 บาท";
    _titleRed2_desp3 = "• เพิ่มมูลค่ารถโตโยต้าคันเก่า 10,000 บาททันที";
    _titleRed2_desp4 = "เมื่อนำรถโตโยต้ามาแลกเปลี่ยน";
    _titleRed2_desp5 = "วันนี้ - 31 ธันวาคม 2563";

    return (
        <div className={styles.sectionPromotion}>
            <h2 style={ { fontWeight: "900", padding: "20px"} }>ข้อมูลโปรโมชั่น</h2>
            <div className={styles.contentPromotion}>
                <h4>{_title}</h4>
                <p>{_desp}</p>
                <p>{_desp2}</p>
                <br />
                <p className="error">{_titleRed1}</p>
                <p>{_titleRed1_desp}</p>
                <br />
                <p className="error">{_titleRed2}</p>
                <p>{_titleRed2_desp1}</p>
                <p>{_titleRed2_desp2}</p>
                <p>{_titleRed2_desp3}</p>
                <p>{_titleRed2_desp4}</p>
                <p>{_titleRed2_desp5}</p>
            </div>
        </div>
    )
};

export default PromotionComponent;