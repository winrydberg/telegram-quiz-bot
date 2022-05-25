const { Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const user = require('../models/user');
const Op = Sequelize.Op;


exports.standardpayment = async(ctx) => {
    let user = await models.User.findOne({
        where:{
            userid: ctx.update.callback_query.from.id
        }
    })
    await user.update({
        category: 'standard'
    });
    await models.Transaction.create({
        amount: 10,
        userid: ctx.update.callback_query.from.id,
        acessgranted: false,
        category: 'standard',
        paymentid:  user!=null?user.paymentid: '00'
    });
    let message = `
Visit the below url to complete payment.\n
<b>NB: </b>Please use the code: <b> ${user.paymentid} </b> on the payment page
<b>Cost: GHC 2</b>
https://paystack.com/pay/cedyquiz-level-one-test
    `
    return ctx.replyWithHTML(message)
}



exports.intermediatepayment = async(ctx) => {
    let user = await models.User.findOne({
        where:{
            userid: ctx.update.callback_query.from.id
        }
    })
    await user.update({
        category: 'intermediate'
    });
    await models.Transaction.create({
        amount: 10,
        userid: ctx.update.callback_query.from.id,
        acessgranted: false,
        category: 'intermediate',
        paymentid:  user!=null?user.paymentid: '00'
    });
    let message = `
Visit the below url to complete payment.\n
<b>NB: </b>Please use the code: <b> ${user.paymentid} </b> on the payment page
<b>Cost: GHC 5</b>
https://paystack.com/pay/cedyquiz-level-two
    `
    return ctx.replyWithHTML(message)
}



exports.advancedpayment = async(ctx) => {
    let user = await models.User.findOne({
        where:{
            userid: ctx.update.callback_query.from.id
        }
    })
    await user.update({
        category: 'advanced'
    });
    await models.Transaction.create({
        amount: 10,
        userid: ctx.update.callback_query.from.id,
        acessgranted: false,
        category: 'advanced',
        paymentid:  user!=null?user.paymentid: '00'
    });
    let message = `
Visit the below url to complete payment.\n
<b>NB: </b>Please use the code: <b> ${user.paymentid} </b> on the payment page
<b>Cost: GHC 10</b> 
https://paystack.com/pay/cedyquiz-level-advanced
    `
    return ctx.replyWithHTML(message)
}