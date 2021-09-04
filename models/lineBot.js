const db = require ('./getDB');
const query = db.query;
const line = require ('@line/bot-sdk');
const config = require ('config');
const acctoken = config.get ('linebot.channelAccessToken');
const secret = config.get ('linebot.channeSecret');

// 建立對話人
const client = new line.Client ({ channelAccessToken: acctoken,
  channelSecret: secret });

// 控制處理
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve (null);
  }
  console.log (event.message);
  // create a echoing text message
  const echo = { type: 'text', text: '成功收到' };

  // use reply API
  return client.replyMessage (event.replyToken, echo);
}
