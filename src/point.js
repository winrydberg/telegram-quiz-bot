const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;
exports.getPoint = async(ctx, commandEnteredByUser) => {

    if(commandEnteredByUser==true){
        var userid = ctx.update.message.from.id;
    }else{
        var userid = ctx.update.callback_query.from.id;
    }
    
    let user = await models.User.findOne({
        where: {
            userid: userid
        }
    })
    
    let todaypoints = await models.Point.findAll({
        where: {
            userid: userid,
            // createdAt: new Date().toDateString()
        },
        //order: [ [ 'createdAt', 'DESC' ]]
    })
   if(todaypoints.length > 0){
        let pointmessage = 'Total <b>LIVE</b> Point(s) <b>TODAY</b>\n';
        for(var i=0; i<todaypoints.length; i++){
            if(todaypoints[i].category =='standard'){
                pointmessage += `\n Standard Points: <b>${todaypoints[i].value}</b>`
            }else if(todaypoints[i].category =='intermediate'){
                pointmessage += `\n Intermediate Points: <b>${todaypoints[i].value}</b>` 
            }else if(todaypoints[i].category =='advanced'){
                pointmessage += `\n Advanced Points: <b>${todaypoints[i].value}</b>` 
            }
            
        }

        pointmessage += `\n\n
-------------------------------------------\n
Total <b>TRIAL</b> Point(s): <b> ${user!=null?user.trialpoint:0}</b>
        `;
        return ctx.replyWithHTML(pointmessage);
   }else{
    return ctx.replyWithHTML(`
    Total <b>LIVE</b> Point(s) <b>TODAY</b>: <b> 0</b>

Total <b>TRIAL</b> Point(s): <b> ${user!=null?user.trialpoint:0}</b>
    
    `);
   }
    

    
    
}