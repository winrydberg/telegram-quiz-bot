const { Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;


function composePaymentMessage(){
    const message = `Select Quix Category To Participate In:
-----------------------------------
<b>Standard</b> - GHC 2/day
        1st Position: GHC 50
        2nd Position: GHC 20

<b>Intermediate</b>  - GHC 5/day
        1st Position: GHC 70
        2nd Position: GHC 50

<b>Advanced</b>  - GHC 10/day
        1st Position: GHC 100
        2nd Position: GHC 80
        3rd Position: GHC 60
                        `;
return message;
}


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

exports.playLive = async(ctx) => {
    var userid = ctx.update.message.from.id;
    let user = await models.User.findOne({
        where: {
          userid: userid,
        },
    });

    //new user sends play to bot
    if(user==null){
        let payid = await generateRandomPaymentId(9999, 1000);
        await models.User.create({
            firstname: ctx.update.message.from.first_name,
            userid: userid,
            point:0,
            chatid: userid,
            lastqid: 1,
            intlastqid: 1,
            advlastqid: 1,
            lastpaydate:null,
            mode: 'live',
            category:null,
            paymentaccount: null,
            trialpoint: 0,
            paymentid: payid
        })
       let message = composePaymentMessage();
       return ctx.reply(`${message}`, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Standard', 'standard')],
          [Markup.button.callback('Intermediate', 'intermediate')],
          [Markup.button.callback('Advanced', 'advanced')]
        ])
      })
    }else{

        //returning user
        // console.log(new Date(user.lastpaydate).toLocaleDateString());
        if(user.lastpaydate!=null && (new Date(user.lastpaydate).toLocaleDateString() >= new Date().toLocaleDateString())){ //user has paid for the day so allow play

            await user.update({
                mode: 'live'
            })
            //get last question user answered base on category
            let nextquestion = null;
            if(user.category == 'standard'){
                nextquestion = await models.Question.findOne({
                    where: {
                        id: user.lastqid
                    }
                });
            }else if(user.category == 'intermediate'){
                nextquestion = await models.IntermediateQuestion.findOne({
                    where: {
                        id: user.intlastqid
                    }
                });
            }else if(user.category == 'advanced'){
                nextquestion = await models.AdvancedQuestion.findOne({
                    where: {
                        id: user.advlastqid
                    }
                });
            }

            if(nextquestion != null){

                const modeText ='<b>Mode:</b> Live \n\n'
                var thequestion =`${modeText}<b>⛔Question: </b>\n${nextquestion.question}`;
    
                await user.update({
                    lastqid: nextquestion.id
                })
                return ctx.reply(`${thequestion}`, {
                    parse_mode: 'HTML',
                    ...Markup.inlineKeyboard([
                    [Markup.button.callback(`A ➡️ ${nextquestion.ansa}`, 'a')],
                    [Markup.button.callback(`B ➡️ ${nextquestion.ansb}`, 'b')],
                    [Markup.button.callback(`C ➡️ ${nextquestion.ansc}`, 'c')],
                    [Markup.button.callback(`D ➡️ ${nextquestion.ansd}`, 'd')]
                    ])
                })
            }else{
            return ctx.reply(`Unable to get Questions`);
            }
        }else{
            
            if(user.lastpaydate!=null){ //player has not paid today
                ctx.replyWithHTML(`You have run out play. Select from the following category to participate in live mode and earn extra cash.`)
            }
           
            let message = composePaymentMessage()
            return ctx.reply(`${message}`, {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                  [Markup.button.callback('Standard', 'standard')],
                  [Markup.button.callback('Intermediate', 'intermediate')],
                  [Markup.button.callback('Advanced', 'advanced')]
                ])
            })
        }
    }
}