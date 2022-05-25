
const { Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;

const { createUser } = require('./createUser');
const { quizInfo } = require('./info');
const { playLive } = require('./play');
const { getPoint } = require('./point');
const { getPrizes } = require('./prize');
const { getFreeQuestion } = require('./getFreeQuestion');


exports.mainMenu = async(ctx) => {
    console.log(ctx.update);
    switch(ctx.update.message.text.toLowerCase()){
        case 'start':
        case '/start':
        case 'hi':
            let res = createUser(ctx);
            const quizmaster = 'Araba'
            var username = ctx.update.message.from.first_name;
            ctx.reply(`Hello!!! ${username},\n\nWelcome to <b>Cedy Quiz</b> 🇬🇭. My name is ${quizmaster}, Your quizmistress for today. \n\nPlease select an action to proceed.`, {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                  Markup.button.callback('Play Live', 'Play'),
                  Markup.button.callback('Try For Free', 'Try'),
                  Markup.button.callback('Check Point', 'Point')
                ])
              })
            // ctx.reply();
            break;
        case 'play':
            playLive(ctx);
            break;
        case 'prize':
        case 'price':
        case 'prizes':
            getPrizes(ctx);
            break;
        case 'point':
            //get users live point
            // ctx.reply(`Point test`);
            getPoint(ctx, true);
            break;
        case 'info':
            quizInfo(ctx);
              break;
        case 'try':
               
                let user = await models.User.findOne({
                    where: {
                        userid: ctx.update.message.from.id
                    }
                });
                if(user!=null){
                   await user.update({
                        mode: 'trial'
                    })
                }
            
                getFreeQuestion(ctx);
              break;
        default:
            ctx.replyWithHTML(`Invalid command. Please send <b>start</b> to begin`)
    }
}