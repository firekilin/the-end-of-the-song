const db = require ('./getDB');
const query = db.query;


//修改報價資料主資料
exports.editQuotationMain = async (req, res) => {
  let check = await query (`UPDATE QUOTATION
    SET Quotation_code = '${req.body.code}',
    Quotation_phone = '${req.body.call}',
    Quotation_fax = '${req.body.fax}',
    Quotation_email = '${req.body.email}',
    Quotation_date = ${formatDate (req.body.date)},
    Quotation_enddate = ${formatDate (req.body.enddate)},
    Quotation_memo = '${req.body.memo}',
    Quotation_client = '${req.body.client}' 
    WHERE (Quotation_id = '${req.body.id}');
`);
  if (check){
    //操作紀錄
    await query (
      `INSERT INTO SYSTEM_LOG (Member_account, SL_action, SL_page) VALUES ('${req.session.account}','修改報價單內容-${req.body.selectQuotation}','/quotation/${req.body.projectId}');`
    );
    return true;
  } else {
    return false;
  }
};


module.exports = exports;