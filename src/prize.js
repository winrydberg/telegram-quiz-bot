

exports.getPrizes = (ctx) =>{
    const message = `Below is the prize breakdown for participating in <b>LIVE</b> quiz today:
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
    return ctx.replyWithHTML(message);
}