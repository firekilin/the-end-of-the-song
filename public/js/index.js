'use strict';

var index = this.index ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品
  index.loading = () => {
    $.post ('./api/productList', { member: $ ('#memberId').val (), MW: $ ('#MWId').val () }, (data, status) => {
      $ ('#indexList')[0].innerHTML = '';
      if (data.pass){
        $ ('#addproduct')[0].hidden = false;
      }

      for (let i = 0;i < data.productList.length;i ++){
        let dateEnd = new Date (data.productList[i].productEnd == null ? '' : data.productList[i].productEnd);
        if (data.pass){
         
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row" ${data.productList[i].productStar == 0 ? '' : 'style="color: red;"'} >${data.productList[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.setstar(${data.productList[i].productId})'>☆</button></th>
          <td>${data.productList[i].productName} 
          <button onclick='index.delproduct(${data.productList[i].productId})'>刪除商品</button>
          </td>
          <td>
            <div id='yesList${data.productList[i].productId}' class='yesLists'>
           <button onclick='index.getList(${data.productList[i].productId},${data.pass})'>檢視名單</button>
            </div>
          </td>
          <td> 
            <div id='noList${data.productList[i].productId}' class='noLists'>
            <button onclick='index.getList(${data.productList[i].productId},${data.pass})'>檢視名單</button>
            </div>
        </td>
        <td>
          <button onclick='index.reSet(${data.productList[i].productId})'>清除抽獎名單</button>
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
  
  index.allreload = (productId, pass) => {
    $.post ('./api/productList', { member: $ ('#memberId').val (), MW: $ ('#MWId').val () }, (data, status) => {
      $ ('#indexList')[0].innerHTML = '';
      if (data.pass){
        $ ('#addproduct')[0].hidden = false;
      }

      for (let i = 0;i < data.productList.length;i ++){
        let dateEnd = new Date (data.productList[i].productEnd == null ? '' : data.productList[i].productEnd);
        if (data.pass){
         
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row" ${data.productList[i].productStar == 0 ? '' : 'style="color: red;"'} >${data.productList[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.setstar(${data.productList[i].productId})'>☆</button></th>
          <td>${data.productList[i].productName} 
          <button onclick='index.delproduct(${data.productList[i].productId})'>刪除商品</button>
          </td>
          <td>
            <div id='yesList${data.productList[i].productId}' class='yesLists'>
           <button onclick='index.getList(${data.productList[i].productId},${data.pass})'>檢視名單</button>
            </div>
          </td>
          <td> 
            <div id='noList${data.productList[i].productId}' class='noLists'>
            <button onclick='index.getList(${data.productList[i].productId},${data.pass})'>檢視名單</button>
            </div>
        </td>
        <td>
          <button onclick='index.reSet(${data.productList[i].productId})'>清除抽獎名單</button>
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
          <div id='yesList${data.productList[i].productId}' class='yesLists'>
         <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
          </div>
        </td>
        <td> 
          <div id='noList${data.productList[i].productId}' class='noLists'>
          <button onclick='index.getList(${data.productList[i].productId})'>檢視名單</button>
          </div>
      </td>
        </tr>`;
        }
      }
     
      $.post ('./api/getList', { productId: productId }, (data, status) => {
        let yesList = '';
        let noList = '';
        if (pass){
          yesList += `<select id='yesSelect${productId}'></select><button onclick="index.checkin2('0','${productId}')">新增</button><button onclick="index.checkin3('0','${productId}')">全加</button>`;
          noList += `<select id='noSelect${productId}'></select><button onclick="index.checkin2('1','${productId}')">新增</button><button onclick="index.checkin3('1','${productId}')">全加</button>`;
          index.getcheckin (productId);
          for (let j = 0;j < data.yesList.length;j ++){
            yesList += `<p>${data.yesList[j].name} <button onclick="index.deleteMember('${data.yesList[j].PKId}','${productId}')">X</button></p>`;
          }
          for (let j = 0;j < data.noList.length;j ++){
            noList += `<p>${data.noList[j].name} <button onclick="index.deleteMember('${data.noList[j].PKId}','${productId}')">X</button></p>`;
          }
        } else {
          for (let j = 0;j < data.yesList.length;j ++){
            yesList += `<p>${data.yesList[j].name}</p>`;
          }
          for (let j = 0;j < data.noList.length;j ++){
            noList += `<p>${data.noList[j].name} </p>`;
          }
        }
        $ (`#yesList${productId}`).attr ('class', 'yesList');
        $ (`#noList${productId}`).attr ('class', 'noList');
        $ (`#yesList${productId}`)[0].innerHTML = yesList;
        $ (`#noList${productId}`)[0].innerHTML = noList;
      });
    
    });
  };

  //reset
  index.reSet = (productId) => {
    $.post ('./api/reSet', { productId: productId }, (data, statue) => {
      alert (data);
      index.allreload (productId, true);
    });
  };

  //取得未報名清單
  index.getcheckin = (productId) => {
    $.post ('./api/getcheckin', { productId: productId }, (data, status) => {
      for (let i = 0;i < data.length;i ++){
        $ (`#yesSelect${productId}`).append (new Option (data[i].memberName, data[i].memberId, false));
        $ (`#noSelect${productId}`).append (new Option (data[i].memberName, data[i].memberId, false));
      }
    });
  };

  //名單
  index.getList = (productId, pass) => {

    $.post ('./api/getList', { productId: productId }, (data, status) => {
      let yesList = '';
      let noList = '';
      if (pass){
        yesList += `<select id='yesSelect${productId}'></select><button onclick="index.checkin2('0','${productId}')">新增</button><button onclick="index.checkin3('0','${productId}')">全加</button>`;
        noList += `<select id='noSelect${productId}'></select><button onclick="index.checkin2('1','${productId}')">新增</button><button onclick="index.checkin3('1','${productId}')">全加</button>`;
        index.getcheckin (productId);

        for (let j = 0;j < data.yesList.length;j ++){
          yesList += `<p>${data.yesList[j].name} <button onclick="index.deleteMember('${data.yesList[j].PKId}','${productId}')">X</button></p>`;
        }
        for (let j = 0;j < data.noList.length;j ++){
          noList += `<p>${data.noList[j].name} <button onclick="index.deleteMember('${data.noList[j].PKId}','${productId}')">X</button></p>`;
        }
      } else {
        for (let j = 0;j < data.yesList.length;j ++){
          yesList += `<p>${data.yesList[j].name}</p>`;
        }
        for (let j = 0;j < data.noList.length;j ++){
          noList += `<p>${data.noList[j].name} </p>`;
        }
      }
      $ (`#yesList${productId}`).attr ('class', 'yesList');
      $ (`#noList${productId}`).attr ('class', 'noList');
      $ (`#yesList${productId}`)[0].innerHTML = yesList;
      $ (`#noList${productId}`)[0].innerHTML = noList;
    });

   
  };

 
  //報名
  index.checkin = (productId) => {
    $.post ('./api/checkin', { productId: productId, memberId: $ ('#memberId').val () }, (data, status) => {
      if (data == '失敗'){
        alert (data);
      }
      index.allreload (productId);
    } );
  };
  

  //管理員報名
  index.checkin2 = (check, productId) => {
    if (check == 0){
      $.post ('./api/checkin2', {
        productId: productId,
        memberId: $ (`#yesSelect${productId}`).val (),
        statusCheck: 0 
      }, (data, status) => {
        if (data == '失敗'){
          alert (data);
        }
        index.allreload (productId, true);
      } );
    } else {
      $.post ('./api/checkin2', {
        productId: productId,
        memberId: $ (`#noSelect${productId}`).val (),
        statusCheck: 1 
      }, (data, status) => {
        if (data == '失敗'){
          alert (data);
        }
        index.allreload (productId, true);
      } );
    }
    
  };

  //新增所有玩家進名單
  index.checkin3 = (check, productId) => {
    if (check == 0){
      $.post ('./api/checkin3', { productId: productId,
        statusCheck: 0 }, (data, status) => {
        if (data == '失敗'){
          alert (data);
        }
        index.allreload (productId, true);
      } );
    } else {
      $.post ('./api/checkin3', { productId: productId,
        statusCheck: 1 }, (data, status) => {
        if (data == '失敗'){
          alert (data);
        }
        index.allreload (productId, true);
      } );
    }
  };

  //管理員刪除報名
  index.deleteMember = (PKId, productId) => {
    $.post ('./api/deleteMember', { PKId: PKId }, (data, status) => {
      if (data == '失敗'){
        alert (data);
      }
      index.allreload (productId, true);
    });
  };
 
  //新增獎品
  index.addproduct = () => {
    $.post ('./api/addProduct', {
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
    $.post ('./api/setstar', { password: $ ('#password').val (), productId: productId }, (data, status) => {
      alert (data);
      index.loading ();
    });
  };

  //刪除商品
  index.delproduct = (productId) => {
    $.post ('./api/delproduct', { password: $ ('#password').val (), productId: productId }, (data, status) => {
      alert (data);
      index.loading ();
    });
  };
  index.loading ();
});



