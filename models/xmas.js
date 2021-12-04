const db = require ('./getDB');
const query = db.query;



//Line登入確認
exports.member = async(req, res) => {
  
  let check = await query ('select xMember_account from xmas_member where xMember_account =?', [req.body.account]);
  if (check[0] == null){
    await query (`INSERT INTO xmas_member (xMember_account) VALUES ('${req.body.account}') `);
    req.session.account = req.body.account;
  } else {
    req.session.account = req.body.account;
  }
  return true;
  
};
//常駐驗證
exports.member2 = async(req, res) => {
  
  let check = await query ('SELECT Member from MEMBER WHERE Member_account = ?', [req.session.account]);
  if (check[0] == null){
    return false;
  }
  return true;
};

//已加入活動列表
exports.activityList = async(req, res) => {
  let activityList = await query ('SELECT xactivity_name,xlist_showname FROM xmas_activity_list left join xmas_activity using(xActivity_ID);');
  let returnList = [];
  for (let i = 0;i < activityList.length;i ++){
    returnList.push ({ activityName: activityList[i].xactivity_name,
      userName: activityList[i].xlist_showname });
  }
  return returnList;
};

//建立活動
exports.createActivity = async (req, res) => {

  let check = await query (`INSERT INTO xmas_activity 
    (xActivity_name, xActivity_password, xActivity_type,xActivity_status, xActivity_limitS, xActivity_limitE, xMember_ID) 
    VALUES ('${req.body.activityName}', '${req.body.activityPassword}', '${req.body.activityType}','0', '${req.body.activityLimitS}', '${req.body.activityLimitE}', 
    (SELECT xMember_id FROM end_song.xmas_member where xMember_account='${req.body.account}')
    );`);
  let check2 = await query (`INSERT INTO xmas_activity_list (xList_showname, xMember_send, xActivity_ID) 
    VALUES ('${req.body.userName}', (SELECT xMember_id FROM end_song.xmas_member where xMember_account='${req.body.account}'), '${check.insertId}');`);

  if (check && check2){
    return true;
  } else {
    return false;
  }

};



   
 



module.exports = exports;