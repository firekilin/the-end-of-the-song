const db = require ('./getDB');
const query = db.query;

//Line登入確認
exports.member = async(req, res) => {
  try {
    let check = await query ('select xMember_account from xmas_member where xMember_account =?', [req.body.account]);
    if (check[0] == null){
      await query (`INSERT INTO xmas_member (xMember_account) VALUES ('${req.body.account}') `);
      req.session.account = req.body.account;
    } else {
      req.session.account = req.body.account;
    }
    return true;
  } catch (e){
    return false;
  }
};
//常駐驗證
exports.member2 = async(req, res) => {
  try {
    let check = await query ('SELECT Member from MEMBER WHERE Member_account = ?', [req.session.account]);
    if (check[0] == null){
      return false;
    }
    return true;
  } catch (e){
    return false;
  }
};

//已加入活動列表
exports.activityList = async(req, res) => {

  try {
    let activityList = await query (`SELECT xmas_activity.xactivity_id,xactivity_name,xlist_showname FROM xmas_activity_list  left join xmas_activity using(xActivity_ID) 
            where xmas_activity_list.xmember_send= (select xMember_id from xmas_member where xmember_account='${req.body.account}');`);
    let returnList = [];
    for (let i = 0;i < activityList.length;i ++){
      returnList.push ({
        href: activityList[i].xactivity_id,
        activityName: activityList[i].xactivity_name,
        userName: activityList[i].xlist_showname 
      });
    }
    return returnList;
  } catch (e){
    return false;
  }
 
};

//建立活動
exports.createActivity = async (req, res) => {
  try {
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
  } catch (e){
    return false;
  }
  
};

//確認活動名稱
exports.checkActivityName = async(req, res) => {
  try {
    let check = await query (`SELECT xActivity_Name 
      FROM xmas_activity 
      where xActivity_ID='${req.body.addActivityID}';`);
    if (check[0]){
      return check[0].xActivity_Name ;
    } else {
      return false;
    }
  } catch (e){
    return false;
  }

};

//加入活動
exports.addActivity = async(req, res) => {
  try {
    let check0 = await query (`SELECT count(*) as checking from xmas_activity_list where xmember_send=(select xMember_id from xmas_member 
        where xmember_account='${req.body.account}')`);
    if (check0[0].checking == 0){
      let check = await query (`SELECT xActivity_id 
      FROM xmas_activity 
      where xActivity_ID='${req.body.addActivityID}'
      and xActivity_password='${req.body.addActivityPassword}';`);
      if (check[0]){
        let check2 = await query (`INSERT INTO xmas_activity_list (xList_showname, xMember_send, xActivity_ID) 
          VALUES ('${req.body.addActivityMember}',
          (select xMember_id from xmas_member 
            where xmember_account='${req.body.account}')
            , '${req.body.addActivityID}');
        `);

        if (check[0] && check2){
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (e){
    return false;
  }

};

//使用者設定
exports.editMember = async(req, res) => {
  try {
    let check = await query (`select xMember_id from xmas_member where xmember_account='${req.body.account}'`);
    if (check){
      let check2 = await query (`UPDATE xmas_member SET xMember_realname = '${req.body.realName}', xMember_phone = '${req.body.phone}', xMember_address = '${req.body.shop}' 
    WHERE (xMember_id = ${check[0].xMember_id} );`);
      if (check2){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e){
    return false;
  }
};
   
//使用者資訊
exports.memberInfo = async(req, res) => {
  try {
    let check = await query (`SELECT xMember_realname,xMember_phone,xMember_address FROM xmas_member where xMember_account= '${req.body.account}';`);
    if (check[0]){
      return {
        realName: check[0].xMember_realname, phone: check[0].xMember_phone, shop: check[0].xMember_address
      };
    } else {
      return false;
    }
  } catch (e){
    return false;
  }
};
 
//活動人員清單
exports.memberList = async(req, res) => {
  try {
    let check = await query (`SELECT count(*) as checking
    from xmas_activity_list 
    where xActivity_id='${req.body.activityID}' 
    and  xMember_send = (select xMember_id from xmas_member 
      where xmember_account='${req.body.account}') `);
    if (check[0].checking > 0){
      let check2 = await query (`SELECT xmal.xList_showname,xma.xmember_ID =xmal.xmember_send as leader
      FROM xmas_activity_list xmal 
      left join xmas_activity xma 
      using(xActivity_ID) 
      left join xmas_member xmm 
      using(xMember_ID)
      where xmal.xActivity_id='${req.body.activityID}' `);
      let returnList = [];
      for (let i = 0;i < check2.length;i ++){
        returnList.push ({ member: check2[i].xList_showname,
          leader: check2[i].leader, });
      }
      return returnList;
      
    } else {
      return false;
    }
    
  } catch (e){
    return false;
  }
};


//主辦者確認
exports.checkActivity = async(req, res) => {
  try {
    //確定是否主辦方
    let check = await query (`SELECT count(*) as leader
    from xmas_activity
      where xActivity_id='${req.body.activityID}' and xmember_id=(select xMember_id from xmas_member 
      where xmember_account='${req.body.account}') `);
    //確認活動狀態  
    let check2 = await query (`select xActivity_status from xmas_activity where xActivity_id='${req.body.activityID}'`);
    return { leader: (check[0].leader > 0), status: check2[0].xActivity_status > 0 };

  } catch (e){
    return false;
  }
};

//退出活動
exports.outActivity = async(req, res) => {
  try {
    //確定是否主辦方
    let check = await query (`SELECT count(*) as leader
    from xmas_activity
      where xActivity_id='${req.body.activityID}' and xmember_id=(select xMember_id from xmas_member 
      where xmember_account='${req.body.account}') `);
    if (check[0].leader > 0){
      await query (`SET SQL_SAFE_UPDATES=0;`);
      let check2 = await query (`DELETE FROM xmas_activity_list WHERE (xList_ID in (select * from (select xList_ID from xmas_activity_list where xActivity_id='${req.body.activityID}')as c) );`);
      let check3 = await query (`DELETE FROM xmas_activity where xActivity_id='${req.body.activityID}';`);
      await query (`SET SQL_SAFE_UPDATES=1;`);
      if (check2 && check3){
        return '成功刪除活動，剔除' + check2.affectedRows + '名成員\n(給你壓力)';
      } else {
        return '刪除失敗';
      }
    } else {
      let check2 = await query (`DELETE FROM xmas_activity_list  where xActivity_id='${req.body.activityID}' and xmember_send=(select xMember_id from xmas_member 
      where xmember_account='${req.body.account}');`);
      if (check2){
        return '成功退出';
      } else {
        '退出失敗';
      }

    }
  } catch (e){
    return '資料庫錯誤';
  }
};

//取得限制
exports.limitget = async(req, res) => {
  try {
    let check = await query (`select xActivity_limitS,xActivity_limitE from xmas_activity where xactivity_id='${req.params.id}'`);
    if (check[0]){
      return { limitS: check[0].xActivity_limitS, limitE: check[0].xActivity_limitE };
    } else {
      return false;
    }
  } catch (e){
    return false;
  }
};

//開始抽籤
exports.startLottery = async(req, res) => {
  try {
    let check = await query (`SELECT count(*) as leader
    from xmas_activity
      where xActivity_id='${req.body.activityID}' and xmember_id=(select xMember_id from xmas_member 
      where xmember_account='${req.body.account}') `);

    if (check[0].leader > 0){
      let check2 = await query (`SELECT xMember_send FROM end_song.xmas_activity_list where xactivity_id='${req.body.activityID}'`);
      if (check2[0]){
        let memberlist = [];
        memberlist.length = check2.length;
        for (let i = 0;i < check2.length;i ++){
          let setnewmember = 0;
          do {
            setnewmember = Math.floor (Math.random () * check2.length);
          } while (memberlist[setnewmember] != undefined);
          memberlist[setnewmember] = check2[i].xMember_send;
        }
        for (let i = 0;i < memberlist.length;i ++){
           
          await query (`UPDATE xmas_activity_list SET xMember_receiver = '${memberlist[(i + 1) == memberlist.length ? 0 : i + 1]}' WHERE (xMember_send = '${memberlist[i]}' and xActivity_ID = '${req.body.activityID}');`);
        }
        await query (`UPDATE xmas_activity SET xActivity_status = '1' WHERE (xActivity_id = '${req.body.activityID}');`);
        return true;
      } else {
        return false;
      }
      
    } else {
      return false;
    }
  } catch (e){
    console.log (e);
    return false;
  }
};
module.exports = exports;