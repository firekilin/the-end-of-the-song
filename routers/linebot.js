const router = require ('express').Router ();
const config = require ('config');
const acctoken = config.get ('linebot.channelAccessToken');
const secret = config.get ('linebot.channeSecret');
const line = require ('@line/bot-sdk');


// 設定callback為api
router.post ('/callback', line.middleware ({ channelAccessToken: acctoken,
  channelSecret: secret, }), (req, res) => {
  const event = req.body.events[0];
  
  if (event.type === 'message') {
    const message = event.message;
  
    if (message.type === 'text' && message.text === 'hello') {
      client.replyMessage (event.replyToken, { type: 'text',
        text: 'hello world1', });
      client.replyMessage (event.replyToken, { type: 'text',
        text: 'hello world2', });
    }
  }
  Promise
    .all (req.body.events.map (handleEvent))
    .then ((result) => {return res.json (result);})
    .catch ((err) => {
      console.error (err);
      res.status (500).end ();
    });
});