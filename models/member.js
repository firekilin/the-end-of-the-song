const db = require ('./getDB');
const query = db.query;


//登入名字
exports.login = async (req, res) => {
  let check = await query (`select member_name from member where member_name='${req.body.name}'`);
  if (check[0]){
    res.cookie ('name', req.body.name);
  } else {
    if (req.body.name != ''){
      await query (`INSERT INTO member (member_name) VALUES('${req.body.name}');`);
      return '已完成註冊 請重新輸入';
    } else {
      return '請輸入名字';
    }
  }

  return true;
};

//確認名字
exports.login2 = async (req, res) => {
  let cookieName = req.cookies.name;
  if (cookieName != undefined){
    let check = await query (`select MW_id,member_id,member_name,level from member where member_name='${cookieName}'`);
    if (check[0]){
      let password = 0;
      if (check[0].level == 1){
        password = '5270';
      }
      return {
        MWId: check[0].MW_id,
        memberId: check[0].member_id,
        password: password,
        pass: true 
      };
    } else {
      res.clearCookie ('name');
      return { pass: false };
    }
  } else {
    return { pass: false };
  } 
  
  
};

//確認管理員
exports.login3 = async (req, res) => {
  let cookieName = req.cookies.name;
  if (cookieName != undefined){
    let check = await query (`select MW_id,member_id,member_name,level from member where member_name='${cookieName}'`);
    if (check[0]){
      let password = 0;
      if (check[0].level == 1){
        password = '5270';
        return {
          MWId: check[0].MW_id,
          memberId: check[0].member_id,
          password: password,
          pass: true 
        };
      }
      return { pass: false };
    } else {
      res.clearCookie ('name');
      return { pass: false };
    }
  } else {
    return { pass: false };
  } 
  
  
};

//登出
exports.logout = async(req, res) => {
  res.clearCookie ('name');
  return true;
};

//列出會員清單
exports.memberList = async(req, res) => {
  let memberBox = [];
  let memberItem = await query (`SELECT member_id,member_name,member_status FROM end_song.member where MW_id='${req.body.MWId}'`);
  for (let i = 0;i < memberItem.length;i ++){
    memberBox.push ({ 
      memberId: memberItem[i].member_id,
      memberName: memberItem[i].member_name,
      memberStatus: memberItem[i].member_status 
    });
  }
  return memberBox;
};

//修改抽獎權
exports.memberStatus = async(req, res) => {
  let check = await query (`UPDATE member SET member_status =  if(member_status=0,1,0) WHERE (member_id = '${req.body.memberId}');`);
  if (check){
    return '成功修改';
  } else {
    return '失敗';
  }
};

//清除報名紀錄
exports.memberClear = async(req, res) => {
  try {
    await query (`SET SQL_SAFE_UPDATES=0;`);
    let check = await query (`DELETE FROM product_check WHERE (PK_id in (select * from (select PK_id from product_check where member_id='${req.body.memberId}')as c) );`);
    await query (`SET SQL_SAFE_UPDATES=1;`);
    if (check){
      return `成功取消${check.affectedRows}筆報名`;
    } else {
      return `錯誤或無報名`;
    }
  
  } catch (e){
    return '失敗';
  }
};

module.exports = exports;
