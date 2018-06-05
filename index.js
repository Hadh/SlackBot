const SlackBot = require('slackbots');
const axios = require ('axios');

const bot = new SlackBot({
    token: 'xoxb-375512395345-375514352737-mbD1OXtspyuQVtJV2YT4TymV',
    name: 'YomamaBot'
});

// start 

bot.on('start',()=> {
    var params = {
        icon_emoji: ':fire:'
    };

    bot.postMessageToChannel('general', 'Ready to get burned with @YomamaBot?', params);
});

//message
bot.on('message',(data)=>{
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
});


// handle incoming message
function handleMessage(data){
    if(data.includes(' yomama')){
        yoMama();
    }
    else if(data.includes('help')){
        help();
    }
};

//Tell a yoMama joke
function yoMama(){
    axios.get('http://api.yomomma.info/')
        .then((res)=>{
            const joke = res.data.joke;
            var params = {
                icon_emoji: ':laughing:'
            };
            bot.postMessageToChannel('general', `Yo Mama:${joke}`, params);
        });
}

function help(){
    var params = {
        icon_emoji: ':question:'
    };
    bot.postMessageToChannel('general','Type @yYomamaBot yomama to recieve a random yomama joke :D ',params);
}
// error 
bot.on('error',(err)=> {
    console.log(err);
})