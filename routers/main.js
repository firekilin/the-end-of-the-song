const router = require ('express').Router ();
const member = require ('../models/member');

//首頁
router.get ('/index', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('index', { memberId: level.memberId, password: level.password });
  } else {
    res.redirect ('login');
  }
});

//登入
router.get ('/login', async(req, res) => {
  res.render ('login');
});

//管理
router.get ('/manage', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('manage', { memberId: level.memberId, password: level.password });
  } else {
    res.redirect ('login');
  }
});

//公告
router.get ('/show', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('show', { memberId: level.memberId, password: level.password });
  } else {
    res.redirect ('login');
  }
});

module.exports = router;