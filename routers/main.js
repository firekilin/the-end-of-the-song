const router = require ('express').Router ();
const member = require ('../models/member');

//首頁
router.get ('/', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('index', {
      MWId: level.MWId,
      memberId: level.memberId,
      password: level.password 
    });
  } else {
    res.redirect ('login');
  }
});

//首頁
router.get ('/index', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('index', {
      MWId: level.MWId,
      memberId: level.memberId,
      password: level.password 
    });
  } else {
    res.redirect ('login');
  }
});

//登入
router.get ('/login', async(req, res) => {
  if (req.headers['host'] == 'kilincat.servegame.com'){
    res.redirect ('https://btss.hopto.org/index');
  }
  let level = await member.login2 (req, res);
  if (level.pass){
    res.redirect ('index');
  } else {
    res.render ('login');
  }

});

//管理
router.get ('/manage', async(req, res) => {
  let level = await member.login3 (req, res);
  if (level.pass){
    res.render ('manage', {
      MWId: level.MWId,
      memberId: level.memberId,
      password: level.password 
    });
  } else {
    res.redirect ('index');
  }
});

//公告
router.get ('/show', async(req, res) => {
  let level = await member.login2 (req, res);
  if (level.pass){
    res.render ('show', {
      MWId: level.MWId,
      memberId: level.memberId,
      password: level.password 
    });
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

//會員管理系統
router.get ('/manageMember', async(req, res) => {
  let level = await member.login3 (req, res);
  if (level.pass){
    res.render ('member', {
      MWId: level.MWId,
      memberId: level.memberId,
      password: level.password 
    });
  } else {
    res.redirect ('index');
  }
});

router.get ('/registerWorld', async(req, res) => {
  res.render ('registerWorld');
});


router.get ('/line', async(req, res) => {
  res.redirect ('https://line.me/ti/g2/ObuERMtHQM1bGYCY_UZnLdx5-QtxOhW-480JHw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default');
});
router.get ('/discord', async(req, res) => {
  res.redirect ('https://discord.gg/q4r9SaQg');
});
module.exports = router;