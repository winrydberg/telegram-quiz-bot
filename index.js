const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { Telegraf, Markup} = require('telegraf');
const { mainMenu } = require('./src/main');
const { paymentProcessor } = require('./src/paystack');
const { replyAction } = require('./src/reply');




const PORT = process.env.PORT||3000;
const token = process.env.BOT_TOKEN

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

// console.log(token);

const bot = new Telegraf(token)



// bot.on('quiz_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

bot.action(/.+/, replyAction);

bot.command('/inv', (ctx) => {
    bot.telegram.sendInvoice(ctx.update.message.id,'');
})

bot.on('text', mainMenu);

const secretPath = `/telegraf/${bot.secretPathComponent()}`

// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook(`https://459a-154-160-9-163.eu.ngrok.io${secretPath}`)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
    console.log(req);
    bot.telegram.sendMessage('5338576281','Hello Auto message by Server for Notification');
    res.json({
        'status': 'error',
        'message': 'You are lost'
    });
});



// Set the bot API endpoint
app.use(bot.webhookCallback(secretPath))

app.post('/pay-callback',paymentProcessor)

app.listen(PORT, (error)=> {
    if(error){
       console.log(error)
    }
    console.log(`App listening on port ${PORT}`);
})