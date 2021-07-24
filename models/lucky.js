const db = require ('./getDB');
const query = db.query;


//取得商品列表
exports.productList = async (req, res) => {
  let pass = req.body.member == 1 ? true : false;
  let productItem = await query (`SELECT product.product_id,product_name,product_star,PK_status FROM
  product 
  left join (
   SELECT product_id,PK_status 
     FROM end_song.product_check 
     where member_id='2'
 ) as checking 
 on product.product_id=checking.product_id 
 order by product_star desc;`);
  let productList = [];
  for (let i = 0;i < productItem.length;i ++){
    
    productList.push (
      { 
        productId: productItem[i].product_id,
        productName: productItem[i].product_name,
        productStar: productItem[i].product_star, 
        productStatus: productItem[i].PK_status,
        pass: pass,
      }
    );
  }
  return productList;
};

//取得名單列表
exports.getList = async (req, res) => {
  let productId = req.body.productId;
  let getList = [];
  let yesItem = await query (`SELECT member_name 
    FROM product_check 
    left join member 
    using(member_id) 
    where product_id='${productId}' and PK_status='0';`);
  let yesList = [];
  for (let j = 0;j < yesItem.length;j ++){
    yesList.push ({ name: yesItem[j].member_name });
  }
  let noItem = await query (`SELECT member_name 
    FROM product_check 
    left join member 
    using(member_id) 
    where product_id='${productId}' and PK_status='1';`);
  let noList = [];
  for (let j = 0;j < noItem.length;j ++){
    noList.push ({ name: noItem[j].member_name });
  }
   
  return { yesList: yesList, noList: noList };
};


//登記報名
exports.checkin = async (req, res) => {
  let productId = req.body.productId;
  let memberId = req.body.memberId;
  let check = await query (`SELECT PK_id,product_id,member_id FROM end_song.product_check where product_id='${productId}' and member_id='${memberId}';`);

  if (check[0]){
    let check2 = await query (`DELETE FROM product_check WHERE (PK_id = '${check[0].PK_id}');`);
    if (check2){
      return '已取消報名';
    } else {
      return '錯誤';
    }
  } else {
    let check2 = await query (`INSERT INTO product_check (product_id, member_id) VALUES ('${productId }', '${memberId}');`);
    if (check2){
      return '已完成報名';
    } else {
      return '錯誤';
    }
  }

};

//新增獎品
exports.addProduct = async(req, res) => {
  if (req.body.password == '5270' && req.body.productName != ''){
    let check = await query (`INSERT INTO product (product_name) VALUES ('${req.body.productName}');`);
    if (check){
      return '成功新增';
    }
  } else {
    return '無權限或未輸入名稱';
  }

};

//設定目前獎品
exports.setstar = async(req, res) => {
  if (req.body.password == '5270' && req.body.productId != ''){
    let check = await query (`UPDATE product SET product_star = if(product_star=0,1,0)WHERE (product_id = '${req.body.productId}');`);
    if (check){
      return '成功修改';
    }
  } else {
    return '無權限或未知錯誤';
  }
};

//刪除獎品
exports.delproduct = async(req, res) => {
  if (req.body.password == '5270' && req.body.productId != ''){
    let check = await query (`DELETE FROM product WHERE (product_id = '${req.body.productId}');`);
    if (check){
      return '成功修改';
    }
  } else {
    return '無權限或未知錯誤';
  }
};

//開始抽獎
exports.starting = async(req, res) => {
  let productItem = req.body.productId;
  if (productItem != undefined){
    for (let i = (productItem.length - 1);i >= 0 ;i --){
      let memberList = await query (`SELECT PK_id,member_id FROM product_check where product_id='${productItem[i]}' and PK_status='1';`);
      if (memberList[0]){
        let getit = Math.floor (Math.random () * memberList.length);
        await query (`INSERT INTO ans_show (product_id, member_id) VALUES ('${productItem[i]}', '${memberList[getit].member_id}'); `);
        await query (`UPDATE product_check SET PK_status = '0' WHERE (PK_id = '${memberList[getit].PK_id}');  `);
      } else {
        let check = await query (`SELECT PK_id FROM product_check where product_id='${productItem[i]}' and PK_status=0;`);
        if (check[0]){
          for (let j = 0;j < check.length;j ++){
            await query (`UPDATE product_check SET PK_status = '1' WHERE (PK_id = '${check[j].PK_id}');`);
          }
          i --;
        } else {
          await query (`INSERT INTO ans_show (product_id, member_id) VALUES ('${productItem[i]}', '5'); `);
        }
      }
    }
  } else {
    return '失敗';
  }
  
  return '完成抽獎 請至公告頁面';
};

//公告中獎
exports.showing = async(req, res) => {
  let showList = [];
  let showItem = await query (`SELECT show_id,member_name,product_name,date FROM ans_show left join member using(member_id) left join product using(product_id) order by show_id desc ;`);
  for (let i = 0;i < showItem.length;i ++){
    showList.push ({
      memberName: showItem[i].member_name,
      productName: showItem[i].product_name,
      date: showItem[i].date 
    });
  }
  return showList;
};

module.exports = exports;