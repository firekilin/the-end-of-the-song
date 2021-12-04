const router = require ('express').Router ();
const config = require ('config');
const acctoken = config.get ('lineBot.channelAccessToken');
const secret = config.get ('lineBot.channelSecret');
const liffId = config.get ('lineBot.liffId');
const line = require ('@line/bot-sdk');
const xmas = require ('../models/xmas');

const bodyParser = require ('body-parser'); //設定取得req.body
router.use ( bodyParser.json () ); //req.body支援json格式
router.use ( bodyParser.urlencoded ( { extended: true } ) ); //解析內容 

//登入Line頁面 (首頁)
router.get ('/', async(req, res) => {
  res.render ('xmas/xmas');
});

//api
router.get ('/send-id', async(req, res) => {
  res.json ({ id: liffId });
});

//登入會員
router.post ('/member', async(req, res) => {
  res.send (await xmas.member (req, res));
});

//已加入活動列表
router.post ('/activityList', async(req, res) => {
  res.send (await xmas.activityList (req, res));

});

//加入活動

//建立活動
router.post ('/createActivity', async(req, res) => {
  res.send (await xmas.createActivity (req, res));
});

//註冊資格

//抽獎頁面

//顯示頁面


module.exports = router;