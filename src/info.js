const { Markup} = require('telegraf');
exports.quizInfo = (ctx) => {

    const commands =[
        {
            "command": "PLAY",
            "description": "Start a live Play"
        },
        {
            "command": "INFO",
            "description": "To view this menu"
        },
        {
            "command": "POINT",
            "description": "To check daily acummulated points"
        },
        {
            "command": "HISTORY",
            "description": "To check your play history."
        },
        {
            "command": "PRIZE",
            "description": "To check prizes available to be won today. Every day and its prize."
        },
        {
            "command": "TRY",
            "description": "To play in trial mode. This allows you to have a feel of our the quiz work. NB: Points are not awarded in trial mode."
        }
    ]
    var info = `<b>Quiz Information Guide</b> \n\n`;

    commands.forEach(com => {
        info+=`<b>${com.command}</b> - ${com.description} \n\n`
    });
    ctx.replyWithHTML(info)
}