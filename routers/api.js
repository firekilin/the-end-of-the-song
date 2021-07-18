const router = require ('express').Router ();
const member = require ('../models/member');
const inventory = require ('../models/lucky');

const bodyParser = require ('body-parser'); //設定取得req.body
router.use ( bodyParser.json () ); //req.body支援json格式
router.use ( bodyParser.urlencoded ( { extended: true } ) ); //解析內容 


//取得member name 拿來用 dropdownlist
router.post ('/getPmData', async(req, res) => {
  res.send (await project.getPmData (req, res));
});


module.exports = router ;