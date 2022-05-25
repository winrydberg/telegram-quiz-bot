const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { Telegraf, Markup} = require('telegraf');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;

const token = process.env.BOT_TOKEN

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

// console.log(token);


const bot = new Telegraf(token)

exports.getFreeQuestion = async(ctx) => {

    if(ctx.update.callback_query==null){
         var userid = ctx.update.message.from.id;
         var action = ctx.update.message.text;
    }
    else if(ctx.update.message==null){
        var userid = ctx.update.callback_query.from.id;
        var action = ctx.update.callback_query.data;
    }


    // var action = ctx.update.callback_query.data;

    //======MARKE PRVIOUS QUESTION ANSWEE

    
    let tracker = await models.TrialTracker.findOne({
        where: {
          userid: userid,
        },
    });

    let question = null;

    if(tracker != null){
        // var response = ctx.update.callback_query.data;
        if(action.toLowerCase() !='try'){
            //get answered question using tracker last id
            let ansquestion = await models.Trial.findOne({
                where: {
                    id: tracker.lastqid-1
                }
            })
        
            if(ansquestion != null){
                if(action.toLowerCase() == ansquestion.cans.toLowerCase()){
                    //update trial point for user
                    // models.User.increment('trialpoint', { by: ansquestion.capoint, where: { userid: userid }});
                    let usr = await models.User.findOne({where: {userid: userid}});
                    usr.update({
                        trialpoint: usr.trialpoint+ansquestion.capoint
                    })
                    await ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ✅`);
                    
                }else{
                    await ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ❌`);
                    // setTimeout(function(){}, 3000)
                }
            }
        }
       
        //get next question for user to answer
        question = await models.Trial.findOne({
            limit: 1,
            where: {
                id: {
                    [Op.gte]: tracker.lastqid
                }
            },
            order: [ [ 'createdAt', 'ASC' ]]
        })
        await tracker.update({
            lastqid: question!=null?question.id+1:tracker.lastqid
        })
    }else{
        //get next question for user to answer
        question = await models.Trial.findOne({
            limit: 1,
            order: [ [ 'createdAt', 'ASC' ]]
        })
        
        await models.TrialTracker.create({
            userid: userid,
            lastqid: question!=null?question.id:0
        });
    }

    if(question != null && question instanceof models.Trial){
            if(question.type == 1){
                const modeText ='<b>Mode:</b> Free (Trial) \nSend <b>PLAY</b> to join <b style="color:green">LIVE</b> mode to earn cash\n\n'
                var thequestion =`${modeText}<b>⛔Question: </b>\n${question.question}`;

                setTimeout(function(){
                    return ctx.reply(`${thequestion}`, {
                        parse_mode: 'HTML',
                        ...Markup.inlineKeyboard([
                        [Markup.button.callback(`A ➡️ ${question.ansa}`, 'a')],
                        [Markup.button.callback(`B ➡️ ${question.ansb}`, 'b')],
                        [Markup.button.callback(`C ➡️ ${question.ansc}`, 'c')],
                        [Markup.button.callback(`D ➡️ ${question.ansd}`, 'd')]
                        ])
                    })
                }, 2000)
               
        }else{
            setTimeout(function(){
                return ctx.replyWithPhoto(
                    `${question.url}`,
                    { caption: `${question.question}`, parse_mode: 'Markdown', 
                    ...Markup.inlineKeyboard([
                        [Markup.button.callback(`A ➡️ ${question.ansa}`, 'a')],
                        [Markup.button.callback(`B ➡️ ${question.ansb}`, 'b')],
                        [Markup.button.callback(`C ➡️ ${question.ansc}`, 'c')],
                        [Markup.button.callback(`D ➡️ ${question.ansd}`, 'd')]
                        ])
                    }
                  )
            }, 2000)
            
        }
    }else{
           const count = await models.Trial.count({
                where: {
                    id: {
                        [Op.gt]: tracker!=null?tracker.lastqid:0
                    }
                }
            });

            if(count<=0){
                if(tracker!= null){
                    await tracker.update({
                        lastqid: 0
                    })
                }
                let message = `You have reached end of trial questions. 

➡️Send <b>start</b> to play again. 

➡️Send <b>Point</b> to check your <b>trial</b> points accummulated.`
                return ctx.replyWithHTML(message);
            }else{
                if(tracker!= null){
                    await tracker.update({
                        lastqid: 0
                    })
                }
                let message = `Oops something went wrong.
                Send <b>start</b> to resume play. Send <b>Point</b> to check your <b>trial</b> points accummulated.`
                return ctx.replyWithHTML(message);
            }
           
    }

    
}