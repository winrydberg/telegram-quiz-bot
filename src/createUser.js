const { Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;


async function generateRandomPaymentId  (max, min) {
    let payid = Math.floor(Math.random() * max) + min;
    let userCount = await models.User.count({
        where: {
            paymentid: payid
        }
    });
    
    if(userCount > 0){
        generateRandomPaymentId(max, min);
    }else{
        return payid;
    }
}

exports.createUser = async(ctx) =>{
    var userid = ctx.update.message.from.id;
    let user = await models.User.findOne({
        where: {
          userid: userid,
        },
    });

    if(user==null){
        let payid = await generateRandomPaymentId(9999,1000);
        await models.User.create({
            firstname: ctx.update.message.from.first_name,
            userid: userid,
            point:0,
            chatid: userid,
            lastqid: 1,
            intlastqid: 1,
            advlastqid: 1,
            lastpaydate:null,
            mode: 'trial',
            category:null,
            paymentaccount: null,
            trialpoint: 0,
            paymentid: payid
        })
        return 'OK';
    }else{
        return 'EXIST';
    }
}