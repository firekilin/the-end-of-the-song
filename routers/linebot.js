const router = require ('express').Router ();
const config = require ('config');
const acctoken = config.get ('lineBot.channelAccessToken');
const secret = config.get ('lineBot.channelSecret');
const liffId = config.get ('lineBot.liffId');
const line = require ('@line/bot-sdk');
const linebot = require ('../models/lineBot');


// 設定callback為api
router.post ('/callback', line.middleware ({ channelAccessToken: acctoken,
  channelSecret: secret, }), async (req, res) => {

  Promise
    .all (req.body.events.map (handleEvent))
    .then ((result) => {return res.json (result);})
    .catch ((err) => {
      console.error (err);
      res.status (500).end ();
    });
});

// 控制處理
handleEvent = async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve (null);
  }
  console.log (event.message);
  // create a echoing text message
  const echo = { type: 'text', text: '成功收到' };
  
  // use reply API
  return client.replyMessage (event.replyToken, echo);
};


router.get ('/liff', async(req, res) => {
  res.render ('liff');
});

router.get ('/send-id', async(req, res) => {
  res.json ({ id: liffId });
});


module.exports = router;