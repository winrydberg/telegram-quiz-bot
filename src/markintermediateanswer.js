const { Markup} = require('telegraf');
const { getFreeQuestion } = require("./getFreeQuestion");
const { standardpayment, intermediatepayment, advancedpayment } = require('./payment');
const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;


function composeQuestion(tquestion){
    
}

exports.markIntermediateAnswer = async(ctx) => {
    var userid = ctx.update.callback_query.from.id;
    let user = await models.User.findOne({
        where: {
          userid: userid,
        },
    });

    if(user.mode == 'live'){
        // ctx.replyWithHTML(`Your Ans: <b>${action.toUpperCase()}</b> ✅`);
        //get las
        let intlastqid = user.intlastqid;
        let question = await models.IntermediateQuestion.findOne({
            where: {
                id: intlastqid
            }
        });
        if(question != null){
            console.log(ctx.update.callback_query)
            //======MARK PRVIOUS QUESTION ANSWEE
            var response = ctx.update.callback_query.data;
            if(response.toLowerCase() == question.cans.toLowerCase()){
                //increment user mark/point
                let point = await models.Point.findOne({
                    where: {
                        [Op.and]: [{ userid: userid }, { datecreated: new Date().toDateString() }, {category: user.category}],
                    }
                })
                if(point){
                    await point.update({
                        value: point.value+question.capoint
                    })
                }else{
                    await models.Point.create({
                        userid: userid,
                        datecreated: new Date().toDateString(),
                        value: question.capoint,
                        category: user.category
                    });
                }
                await ctx.replyWithHTML(`Your Ans: <b>${response.toUpperCase()}</b> ✅`);
            }else{
                await ctx.replyWithHTML(`Your Ans: <b>${response.toUpperCase()}</b> ❌`);
            }

            //-=======GET NEXT QUESTION FOR SUBSCRIBER
            let nextquestion = await models.IntermediateQuestion.findOne({
                limit: 1,
                where: {
                    id: {
                        [Op.gt]: user.intlastqid
                    }
                },
                order: [ [ 'createdAt', 'ASC' ]]
            })

            //=====RETURN NEXT QUESTION RESPONSE
            if(nextquestion != null && nextquestion instanceof models.IntermediateQuestion){
                
                if(nextquestion.type == 1){
                    const modeText =`
<b>Mode:</b> Live 
<b>Category: </b> Intermediate
Answer <b>MORE</b> questions to win the ultimate prize\n\n`
                    var thequestion =`${modeText}<b>⛔Question: </b>\n${nextquestion.question}`;
        
                    await user.update({
                        intlastqid: nextquestion.id
                    })
                    setTimeout(function(){
                    return ctx.reply(`${thequestion}`, {
                        parse_mode: 'HTML',
                        ...Markup.inlineKeyboard([
                        [Markup.button.callback(`A ➡️ ${nextquestion.ansa}`, 'a')],
                        [Markup.button.callback(`B ➡️ ${nextquestion.ansb}`, 'b')],
                        [Markup.button.callback(`C ➡️ ${nextquestion.ansc}`, 'c')],
                        [Markup.button.callback(`D ➡️ ${nextquestion.ansd}`, 'd')]
                        ])
                    })
                },2000)
                }else{
                    await user.update({
                        intlastqid: nextquestion.id
                    })
                    setTimeout(function(){
                    return ctx.replyWithPhoto(
                        `${nextquestion.url}`,
                        { caption: `${nextquestion.question}`, parse_mode: 'Markdown', 
                        ...Markup.inlineKeyboard([
                            [Markup.button.callback(`A ➡️ ${nextquestion.ansa}`, 'a')],
                            [Markup.button.callback(`B ➡️ ${nextquestion.ansb}`, 'b')],
                            [Markup.button.callback(`C ➡️ ${nextquestion.ansc}`, 'c')],
                            [Markup.button.callback(`D ➡️ ${nextquestion.ansd}`, 'd')]
                            ])
                        }
                      )
                    },2000);
                }
            }else{
                const count = await models.IntermediateQuestion.count({
                    where: {
                        id: {
                            [Op.gt]: user.intlastqid
                        }
                    }
                });
    
                if(count<=0){
                    await user.update({
                        intlastqid: 1
                    })
                    let message = `You have reached end of live play. 
    
    ➡️Send <b>play</b> to start again. Accummulate as many point you can to win the ultimate prize 
    
    ➡️Send <b>Point</b> to check your <b>Live</b> points
    .`
                    return ctx.replyWithHTML(message);
                }else{
                   
                        await user.update({
                            intlastqid: 1
                        })
                    let message = `Oops something went wrong.
                    Send <b>start</b> to resume play. Send <b>Point</b> to check your <b>trial</b> points accummulated.`
                    return ctx.replyWithHTML(message);
                }
            }

        }
    }else if(user.mode == 'trial'){
        getFreeQuestion(ctx);
    }else{
        return ctx.replyWithHTML(`Oops something went wrong. Please try again`);
    }
}