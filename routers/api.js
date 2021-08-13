const router = require ('express').Router ();
const member = require ('../models/member');
const lucky = require ('../models/lucky');

const bodyParser = require ('body-parser'); //設定取得req.body
router.use ( bodyParser.json () ); //req.body支援json格式
router.use ( bodyParser.urlencoded ( { extended: true } ) ); //解析內容 


//登入
router.post ('/logining', async(req, res) => {
  res.send (await member.login (req, res));
});

//獎品清單
router.post ('/productList', async(req, res) => {
  res.send (await lucky.productList (req, res));
});

//中獎名單
router.post ('/getList', async(req, res) => {
  res.send (await lucky.getList (req, res));
});

//參加抽獎
router.post ('/checkin', async(req, res) => {
  res.send (await lucky.checkin (req, res));
});

//新增獎品
router.post ('/addProduct', async(req, res) => {
  res.send (await lucky.addProduct (req, res));
});

//標記目前抽獎
router.post ('/setstar', async(req, res) => {
  res.send (await lucky.setstar (req, res));
});

//刪除獎品
router.post ('/delproduct', async(req, res) => {
  res.send (await lucky.delproduct (req, res));
});

//開始抽獎
router.post ('/starting', async(req, res) => {
  res.send (await lucky.starting (req, res));
});

//抽獎公告
router.post ('/showing', async(req, res) => {
  res.send (await lucky.showing (req, res));
});

//設定報名時間
router.post ('/setStart', async(req, res) => {
  res.send (await lucky.setStart (req, res));
});

//設定抽獎時間
router.post ('/setEnd', async(req, res) => {
  res.send (await lucky.setEnd (req, res));
});

//定時抽獎
router.post ('/setDateStart', async(req, res) => {
  res.send (await lucky.setSchedule (req, res));
});

//會員管理
router.post ('/memberList', async(req, res) => {
  res.send (await member.memberList (req, res));
});

//修改抽獎權
router.post ('/memberStatus', async(req, res) => {
  res.send (await member.memberStatus (req, res));
});

//清除報名
router.post ('/memberDel', async(req, res) => {
  res.send (await member.memberClear (req, res));
});

//王國列表
router.post ('/MWList', async(req, res) => {
  res.send (await member.MWList (req, res));
});

module.exports = router ;