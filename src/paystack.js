
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;
const { Telegraf, Markup} = require('telegraf');





exports.paymentProcessor = async(req, res, next) => {

  const token = process.env.BOT_TOKEN
  if (token === undefined) {
        throw new Error('BOT_TOKEN must be provided!')
  }

  const bot = new Telegraf(token);

  console.log(req.body.data.metadata.custom_fields);
  let eventstate = req.body.event;

  if(eventstate =='charge.success' && req.body.data.status == 'success'){
      let userPayentId = req.body.data.metadata.custom_fields[0].value;
     //1. update state.mode to live
     let user = await models.User.findOne({
         where: {
             paymentid: userPayentId
         }
     }) 
     await user.update({
         mode: 'live',
         lastpaydate: new Date()
     })
     //2. send message to user on successful payment
     bot.telegram.sendMessage(user.userid,`Payment was successful. Your account is now in LIVE mode. Answer as many questions as you can to win the ultimate prize.`);

     //3. send first question to user
     let question = await models.Question.findOne({
         where: {
             id: user.lastqid
         }
     })
     if(question){

        const modeText =`
<b>Mode:</b> Live 
<b>Category: </b> ${user.category}
Answer <b>MORE</b> questions to win the ultimate prize\n\n`;
        var firstquestion =`${modeText}<b>⛔Question: </b>\n${question.question}`;

        bot.telegram.sendMessage(user.userid,`${firstquestion}`, {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
            [Markup.button.callback(`A ➡️ ${question.ansa}`, 'a')],
            [Markup.button.callback(`B ➡️ ${question.ansb}`, 'b')],
            [Markup.button.callback(`C ➡️ ${question.ansc}`, 'c')],
            [Markup.button.callback(`D ➡️ ${question.ansd}`, 'd')]
            ])
        })
     }
     
  }else{
      //use bot to sent message to user of failure in payment.
  }

  return res.json({
      'status': 'OK',
      'message': 'response received'
  })
}