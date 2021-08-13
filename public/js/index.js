'use strict';

var index = this.index ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品
  index.loading = () => {
    $.post ('/api/productList', { member: $ ('#memberId').val (), MW: $ ('#MWId').val () }, (data, status) => {
      $ ('#indexList')[0].innerHTML = '';
      if (data.pass){
        $ ('#addproduct')[0].hidden = false;
      }

      for (let i = 0;i < data.productList.length;i ++){
        let dateEnd = new Date (data.productList[i].productEnd == null ? '' : data.productList[i].productEnd);
        if (data.pass){
         
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row" ${data.productList[i].productStar == 0 ? '' : 'style="color: red;"'} >${data.productList[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.setstar(${data.productList[i].productId})'>☆</button></th>
          <td><input type="datetime-local" id='productEnd${data.productList[i].productId}' value="${dateEnd.getTime ().toString () == 'NaN' ? '' : `${dateEnd.getFullYear ()}-${(dateEnd.getMonth () + 1) < 10 ? '0' + (dateEnd.getMonth () + 1) : (dateEnd.getMonth () + 1)}-${dateEnd.getDate () < 10 ? '0' + dateEnd.getDate () : dateEnd.getDate ()}T${dateEnd.getHours () < 10 ? '0' + dateEnd.getHours () : dateEnd.getHours ()}:${dateEnd.getMinutes () < 10 ? '0' + dateEnd.getMinutes () : dateEnd.getMinutes ()}`}">
          <button onclick='index.setEnd(${data.productList[i].productId})'>設定時間</button>
          <button onclick='index.cleanEnd(${data.productList[i].productId})'>清除</button>
          </td>
          <td>${data.productList[i].productName} 
          <button onclick='index.delproduct(${data.productList[i].productId})'>刪除商品</button>
          </td>
          <td>
            <div id='yesList${data.productList[i].productId}' class='yesList'>
           <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
            </div>
          </td>
          <td> 
            <div id='noList${data.productList[i].productId}' class='noList'>
            <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
            </div>
        </td>
        </tr>`;
        } else {
        
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row" ${data.productList[i].productStar == 0 ? '' : 'style="color: red;"'}>${data.productList[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.checkin(${data.productList[i].productId})'>${data.productList[i].productStatus == null ? '報名' : data.productList[i].productStatus == '1' ? '已報名(本輪)' : '已報名(下一輪)' }</button></th>
          <td>${dateEnd.getTime ().toString () == 'NaN' ? '' : `${dateEnd.getFullYear ()}-${(dateEnd.getMonth () + 1) < 10 ? '0' + (dateEnd.getMonth () + 1) : (dateEnd.getMonth () + 1)}-${dateEnd.getDate () < 10 ? '0' + dateEnd.getDate () : dateEnd.getDate ()} ${dateEnd.getHours () < 10 ? '0' + dateEnd.getHours () : dateEnd.getHours ()}:${dateEnd.getMinutes () < 10 ? '0' + dateEnd.getMinutes () : dateEnd.getMinutes ()}`} 
          </td>
          <td>${data.productList[i].productName}
          </td>

          <td>
          <div id='yesList${data.productList[i].productId}' class='yesList'>
         <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
          </div>
        </td>
        <td> 
          <div id='noList${data.productList[i].productId}' class='noList'>
          <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
          </div>
      </td>
        </tr>`;
        }
      }
     
     
    });
  };

  //設定抽獎時間
  index.setEnd = (productId) => {
    $.post ('/api/setEnd', { productId: productId, dateTime: $ (`#productEnd${productId}`).val () }, (data, statue) => {
      alert (data);
      index.loading ();
    });
  };
  //清除報名時間
  index.cleanStart = (productId) => {
    $ (`#productStart${productId}`).val ('');
    index.setStart (productId);
  };
  //清除抽獎時間
  index.cleanEnd = (productId) => {
    $ (`#productEnd${productId}`).val ('');
    index.setEnd (productId);
  };
  //名單
  index.getList = (productId) => {
    $.post ('/api/getList', { productId: productId }, (data, status) => {
      let yesList = '';
      let noList = '';
      for (let j = 0;j < data.yesList.length;j ++){
        yesList += `<p>${data.yesList[j].name}</p>`;
      }
      for (let j = 0;j < data.noList.length;j ++){
        noList += `<p>${data.noList[j].name}</p>`;
      }
      $ (`#yesList${productId}`)[0].innerHTML = yesList;
      $ (`#noList${productId}`)[0].innerHTML = noList;
    });
    
  };

  //報名
  index.checkin = (productId) => {
    $.post ('/api/checkin', { productId: productId, memberId: $ ('#memberId').val () }, (data, status) => {
      if (data == '失敗'){
        alert (data);
      }
      index.getList (productId);
      index.loading ();
    } );
  };

  //新增獎品
  index.addproduct = () => {
    $.post ('/api/addProduct', {
      password: $ ('#password').val (),
      MW: $ ('#MWId').val (),
      productName: $ ('#productName').val () 
    }, (data, status) => {
      alert (data);
      index.loading ();
    } );
  };

  //設定存在
  index.setstar = (productId) => {
    $.post ('/api/setstar', { password: $ ('#password').val (), productId: productId }, (data, status) => {
      alert (data);
      index.loading ();
    });
  };

  //刪除商品
  index.delproduct = (productId) => {
    $.post ('/api/delproduct', { password: $ ('#password').val (), productId: productId }, (data, status) => {
      alert (data);
      index.loading ();
    });

  };

  index.loading ();
});



