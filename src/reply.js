const { Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;
const { getFreeQuestion } = require("./getFreeQuestion");
const { standardpayment, intermediatepayment, advancedpayment } = require('./payment');
const { getPoint } = require('./point');
const { getPrizes } = require('./prize');
const { markAnswer } = require('./markanswer');
const { markIntermediateAnswer } = require('./markintermediateanswer');
const { markAdvancedAnswer } = require('./markadvancedanswer');

exports.replyAction = async(ctx) => {
    // console.log(ctx.update);
    var userid = ctx.update.callback_query.from.id;
 

    var action = ctx.update.callback_query.data;

    switch(action.toLowerCase()){
        case 'point':
            getPoint(ctx, false);
            break;
        case 'play':
             ctx.answerCbQuery(`Play`);
            break;
        case 'prize':
            getPrizes(ctx);
               break;
        case 'try':
            //update user mode to trial
            let user = await models.User.findOne({
                where: {
                    userid: userid
                }
            });
            if(user!=null){
               await user.update({
                    mode: 'trial'
                })
            }
            getFreeQuestion(ctx);
            break;
        case 'standard':
            standardpayment(ctx);
            break;
        case 'intermediate':
            intermediatepayment(ctx);
            break;
        case 'advanced':
            advancedpayment(ctx);
            break;
        case 'a':
        case 'b':
        case 'c':
        case 'd':
            let anuser = await models.User.findOne({
                where: {
                    userid: userid
                }
            });
            if(anuser.category =='standard'){
                 markAnswer(ctx);
            }else if(anuser.category =='intermediate'){
                markIntermediateAnswer(ctx);
            }else if(anuser.category =='advanced'){
                markAdvancedAnswer(ctx);
            }else{
                markAnswer(ctx);
            }
            break;
        // case 'b':
        //     // ctx.answerCbQuery(`replying`);
        //     // ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ❌`);
        //     markAnswer(ctx);
        //     break;
        // case 'c':
        //     // ctx.answerCbQuery(`replying`);
        //     // ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ❌`);
        //     markAnswer(ctx);
        //     break;
        // case 'd':
        //     // ctx.answerCbQuery(`replying`);
        //     // ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ❌`);
        //     markAnswer(ctx);
        //     break;
        default:
            return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
    }

    
}