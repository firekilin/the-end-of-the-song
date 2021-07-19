const db = require ('./getDB');
const query = db.query;


//登入名字
exports.login = async (req, res) => {
  let check = await query (`select member_name from member where member_name='${req.body.name}'`);
  if (check[0]){
    res.cookie ('name', req.body.name);
  } else {
    await query (`INSERT INTO member (member_name) VALUES('${req.body.name}');`);
    return '已完成註冊 請重新輸入';
  }

  return true;
};

//確認名字
exports.login2 = async (req, res) => {
  let cookieName = req.cookies.name;
  if (cookieName != undefined){
    let check = await query (`select member_id,member_name,level from member where member_name='${cookieName}'`);
    if (check){
      let password = 0;
      if (check[0].level == 1){
        password = '5270';
      }
      return {
        memberId: check[0].member_id,
        password: password,
        pass: true 
      };
    } else {
      return { pass: false };
    }
  } else {
    return { pass: false };
  } 
  
  
};

module.exports = exports;
