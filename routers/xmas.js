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

//api liffId get
router.get ('/send-id', async(req, res) => {
  res.json ({ id: liffId });
});

//抽獎頁面
router.get ('/lobby/:id', async(req, res) => {
  res.render ('xmas/lobby', { activityID: req.params.id,limit:await xmas.limitget(req,res) }); //memberList , activityStatus , sendMemberinfo
});

//登入會員
router.post ('/member', async(req, res) => {
  res.send (await xmas.member (req, res));
});

//已加入活動列表
router.post ('/activityList', async(req, res) => {
  res.send (await xmas.activityList (req, res));

});

//確認活動名稱
router.post('/checkActivityName',async(req,res)=>{
  res.send(await xmas.checkActivityName(req,res));
});

//加入活動
router.post ('/addActivity', async(req, res) => {
  res.send (await xmas.addActivity (req, res));
});

//建立活動
router.post ('/createActivity', async(req, res) => {
  res.send (await xmas.createActivity (req, res));
});

//修改個人資訊
router.post ('/editMember', async(req, res) => {
  res.send (await xmas.editMember (req, res));
});

//取得個人資訊
router.post ('/memberInfo', async(req, res) => {
  res.send (await xmas.memberInfo (req, res));
});

//參加者列表
router.post ('/memberList', async(req, res) => {
  res.send (await xmas.memberList (req, res));
});

//參加者列表
router.post ('/checkActivity', async(req, res) => {
  res.send (await xmas.checkActivity (req, res));
});

//退出活動
router.post ('/outActivity', async(req, res) => {
  res.send (await xmas.outActivity (req, res));
});

//開始抽獎
router.post('/startLottery',async(req,res)=>{
  res.send(await xmas.startLottery(req,res));
})
module.exports = router;