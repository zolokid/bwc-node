const db = require('../db');
const express = require('express');
const axios = require('axios');
var Ajv = require('ajv');
const registerRouter = express.Router(mergeParams=true);


const https = require('https');


// ENDPOINTS
//    POST /register <---> register

// POST /register
registerRouter.post('/', (req, res, next) => {
    // REQUIRED: 
    //   name, mobile_no, zipcode, model, model_no
    //   finance_model, finance_submodel, finance_price, finance_down_percent, finance_down_amount, finance_period, finance_per_month
    var registerInfo = req.body;

    // Verification
    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    var schema = { // JSON Schema according to IETF standard https://json-schema.org/
        title: "Customer",
        description: "A customer that wants to register at Barawindsor",
        type: "object" ,// Has to be JSON Object
        properties: {
            name: {
                description: "Name of the customer. ie. อาทิตย์ วิทยา",
                type: "string"
            },
            mobile_no: {
                description: "Customer's Mobile Number ie. 081123456 Can't be +66 and Starts with 0",
                type: "string",
                pattern: "^0\\d+"
            },
            zipcode: {
                description: "Customer's zipcode with only 5 length",
                type: "string",
                maxLength: 5,
                minLength: 5
            },
            model: {
                description: "Customer's chosen model",
                type: "string",
            },
            model_no: {
                description: "Customer's chosen model number",
                type: "string",
            },
            finance_model: {
                description: "Customer's chosen finance_model",
                type: "string",
            },
            finance_submodel: {
                description: "Customer's chosen finance_submodel",
                type: "string",
            },
            finance_price: {
                description: "Customer's chosen finance_price",
                type: "number",
                minimum: 0
            },
            finance_down_percent: {
                description: "Customer's chosen finance_down_percent",
                type: "integer",
                minimum: 0,
                maximum: 100
            },
            finance_down_amount: {
                description: "Customer's chosen finance_down_percent",
                type: "number",
                minimum: 0
            },
            finance_period: {
                description: "Customer's chosen finance_period",
                type: "integer",
                minimum: 0
            },
            finance_per_month: {
                description: "Customer's chosen finance_per_month",
                type: "number",
                minimum: 0
            },
            is_company: {
                description: "This is customer a company",
                type: "integer",
                minimum: 0,
                maximum: 1
            }
        },
        required: ["name", "mobile_no", "zipcode", "model", "model_no", 
        "finance_model", "finance_submodel", "finance_price", "finance_down_percent", 
        "finance_down_amount", "finance_period", "finance_per_month", "is_company"]
    }
    var validate = ajv.compile(schema);
    var valid = validate(registerInfo);
    if (!valid) {
        res.status(500).json({success: false, error: validate.errors});
        throw Error(JSON.stringify(validate.errors));
    };

    // 1. Insert the customer into the customer table.
    db.query(`INSERT INTO customer (${Object.keys(registerInfo).join()}) 
                        VALUES ?`, [[Object.values(registerInfo)]], function (err, insertedResult) {
        if (err) {
            res.status(500).json({success: false, error: err});
            throw(err);
            // return;
        }

        // Get Customer ID after inserted into the customer Table
        var customerID = insertedResult.insertId;
        // 2. Find the Sales that would Service that customer through the stored procedure.
        db.query(`CALL PutSales(${customerID})`, function (err, putSalesResult) {

            if (err) {
                res.status(500).json({success: false, error: err});
                throw(err);
                // return;
            }

            var salesResponsible = putSalesResult[0][0];
            // console.log(salesResponsible);
            // RowDataPacket {
            //     sale_id: 24,
            //     name: 'นางบารา วินเซอร์26',
            //     email: 'prawit@barawindsor.com',
            //     sequence_no: 7,
            //     branch_id: 2,
            //     branch_name: 'สาขา ลาดกระบัง',
            //     branch_code: 'UCL',
            //     branch_manager: 'นายอาทิตย์ บารา',
            //     branch_line_channel: 'rsyhuYjkA9AepA4X10K3TM9LymjlMAjFLueQNJUtGBG'
            //   }

            // 3. Put to Barawindsor API
            const agent = new https.Agent({  
                rejectUnauthorized: false // Disable SSL verification
               });
            var barawindsorAPI = axios.post(
                'https://ws.barawindsor.com/api/prospect/createprospect',
                {
                    custName: registerInfo.name,
                    custNickname : "-",
                    custMobile : registerInfo.mobile_no,
                    saleBranch: salesResponsible.branch_code,
                    saleEmail: salesResponsible.email,
                    model_no: registerInfo.model_no,
                    financeModel: registerInfo.finance_model,
                    financeSubModel: registerInfo.finance_submodel,
                    financePrice: registerInfo.finance_price,
                    financeDownPercent: registerInfo.finance_down_percent,
                    financeDownAmount: registerInfo.finance_down_amount,
                    financePeriod: registerInfo.finance_period,
                    financePerMonth: registerInfo.finance_per_month
                }, 
                {
                    headers: {
                        Authorization: 'Basic ' + 'bnByQHByb3NwZWN0Om5wckBwcm9zcGVjdA==',
                        'content-type': 'application/json'
                    },
                    httpsAgent: agent
                }
            )
            // 4. Put to Line Notification API
            var lineNotificationText = `มีการลงทะเบียนใหม่\n\n` +
                `เรียนคุณ ${salesResponsible.name}\n`+
                `อีเมล์: ${salesResponsible.email}\n` +
                `สาขาเลขที่: ${salesResponsible.branch_code}\n` +
                `สาขา: ${salesResponsible.branch_name}\n`+
                `\n` +
                `ชื่อลูกค้า: ${registerInfo.name}\n` +
                `เบอร์โทร: ${registerInfo.mobile_no}\n` +
                `รหัสไปรษณีย์: ${registerInfo.zipcode}\n` +
                `สนใจรุ่น ${registerInfo.model_no}\n` +
                `financeModel: ${registerInfo.finance_model}\n` +
                `financeSubModel: ${registerInfo.finance_submodel}\n`+
                `ราคา ${registerInfo.finance_price}฿\n`+
                `ดาวน์ ${registerInfo.finance_down_percent}% ${registerInfo.finance_down_amount}฿\n`+ 
                `ผ่อน ${registerInfo.finance_period} เดือน  ${registerInfo.finance_per_month}฿ ต่อเดือน`;

            var lineNotificationAPI = axios.post(
                `https://notify-api.line.me/api/notify?message=${encodeURIComponent(lineNotificationText)}`,
                null, 
                {
                    headers: {
                        Authorization: 'Bearer ' + salesResponsible.branch_line_channel,
                    }
                }
            )

            // Catch Global first, may add error handling below
            // Adding error handling https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            Promise.allSettled([
                barawindsorAPI, 
                lineNotificationAPI
            ]).then(values => {
                // BarawindsorAPI values[0]
                // [
                //     {
                //         "status": true,
                //         "message": "Success",
                //         "data_key": "dzNqOWhkZk1taVRwTlZWZG1nT2dTdz09"
                //     }
                // ]
                // Line Notification values[1]
                // {
                //     "status": 200,
                //     "message": "ok"
                // }
                if (values[1].value && values[1].value.status === 200){
                    db.query(`INSERT INTO notification (name, recipient, status) 
                    VALUES ("${registerInfo.name}", "${salesResponsible.name}", "success")`, function (err, insertedNotificationResult){
                        if (err) throw(err);
                    });
                }else{
                    console.error("Line Error");
                    db.query(`INSERT INTO notification (name, recipient, status) 
                    VALUES ("${registerInfo.name}", "${salesResponsible.name}", "fail")`, function (err, insertedNotificationResult){
                        if (err) {
                            res.status(500).json({success: false, error: err});
                            throw(err);
                        }
                    });
                }
                // If Barawindsor Error, Output on 
                if (values[0].status == 'rejected') {
                    console.error("Barawindsor Error");
                    res.status(500).json({success: false, error: values[0].reason});
                    throw(values[0].reason);
                }

                res.json({
                    sale_id: salesResponsible.sale_id, 
                    sale_name: salesResponsible.name,
                    sale_email: salesResponsible.email,
                    sale_sequence_no: salesResponsible.sequence_no,
                    branch_id: salesResponsible.branch_id,
                    branch_name: salesResponsible.branch_name,
                    branch_manager: salesResponsible.branch_manager,
                    branch_line_channel: salesResponsible.branch_line_channel,
                    ...registerInfo
                });
                return;
            })
        });
    });

});


module.exports = registerRouter;