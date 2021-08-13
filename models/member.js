const db = require ('./getDB');
const query = db.query;


//登入名字
exports.login = async (req, res) => {
  let check = await query (`select member_name,MW_id from member where member_name='${req.body.name}' and MW_id='${req.body.MW}'`);
  if (check[0]){
    res.cookie ('name', req.body.name);
    res.cookie ('MW', req.body.MW);
  } else {
    if (req.body.name != '' && req.body.MW != ''){
      let check2 = await query (`select MW_id from member_world where MW_id='${req.body.MW}' and MW_password='${req.body.password}'`);
      if (check2[0]){
        await query (`INSERT INTO member (member_name,MW_id) VALUES('${req.body.name}','${req.body.MW}');`);
        return '已完成註冊 請重新輸入';
      }
      return '尚未註冊，王國密碼錯誤';
    } else {
      return '請選擇王國、輸入名字';
    }
  }

  return true;
};

//確認名字
exports.login2 = async (req, res) => {
  let cookieName = req.cookies.name;
  let cookieMW = req.cookies.MW;
  if (cookieName != undefined && cookieMW != undefined){
    let check = await query (`select MW_id,member_id,member_name,level from member where member_name='${cookieName}' and MW_id='${cookieMW}'`);
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
      res.clearCookie ('MW');
      return { pass: false };
    }
  } else {
    return { pass: false };
  } 
  
  
};

//確認管理員
exports.login3 = async (req, res) => {
  let cookieName = req.cookies.name;
  let cookieMW = req.cookies.MW;
  if (cookieName != undefined){
    let check = await query (`select MW_id,member_id,member_name,level from member where member_name='${cookieName}' and MW_id='${cookieMW}'`);
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
      res.clearCookie ('MW');
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


//王國列表
exports.MWList = async(req, res) => {
  try {
    let MWlist = [];
    let check = await query (`select MW_id,MW_name from member_world`);
    for (let i = 0;i < check.length;i ++){
      MWlist.push ({ id: check[i].MW_id, name: check[i].MW_name });
    }
    return MWlist;
  } catch (e){
    return '失敗';
  }
};
module.exports = exports;
