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
  let level = await member.login2 (req, res);
  if (level.pass){
    res.redirect ('index');
  } else {
    res.render ('login');
  }

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

//登出
router.get ('/logout', async(req, res) => {
  let check = await member.logout (req, res);
  if (check){
    res.redirect ('login');
  } else {
    res.redirect ('index');
  }
});

module.exports = router;