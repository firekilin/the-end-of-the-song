const router = require ('express').Router ();

//首頁
router.get ('/index', async(req, res) => {
  res.render ('index');
});

//管理
router.get ('/manage', async(req, res) => {
  res.render ('manage');
});

//公告
router.get ('/show', async(req, res) => {
  res.render ('show');
});

module.exports = router;