'use strict';

var index = this.index ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品
  index.loading = () => {
    $.post ('/api/productList', { member: $ ('#memberId').val () }, (data, status) => {
      $ ('#indexList')[0].innerHTML = '';
      if (data[0].pass){
        $ ('#addproduct')[0].hidden = false;
      }

      for (let i = 0;i < data.length;i ++){
        if (data[i].pass){
        
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row">${data[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.setstar(${data[i].productId})'>☆</button></th>
          <td>${data[i].productName} 
          <button onclick='index.delproduct(${data[i].productId})'>刪除商品</button>
          </td>
          <td>
            <div id='yesList${data[i].productId}' class='yesList'>
           <button onclick='index.getList(${data[i].productId})'>檢視名單</button>
            </div>
          </td>
          <td> 
            <div id='noList${data[i].productId}' class='noList'>
            <button onclick='index.getList(${data[i].productId})'>檢視名單</button>
            </div>
        </td>
        </tr>`;
        } else {
        
          $ ('#indexList')[0].innerHTML += `<tr>
          <th scope="row">${data[i].productStar == 0 ? '未上架' : '上架中'}<button onclick='index.checkin(${data[i].productId})'>${data[i].productStatus == null ? '報名' : data[i].productStatus == '1' ? '已報名(本輪)' : '已報名(下一輪)' }</button></th>
          <td>${data[i].productName}
          </td>
          <td>
          <div id='yesList${data[i].productId}' class='yesList'>
         <button onclick='index.getList(${data[i].productId})'>檢視名單</button>
          </div>
        </td>
        <td> 
          <div id='noList${data[i].productId}' class='noList'>
          <button onclick='index.getList(${data[i].productId})'>檢視名單</button>
          </div>
      </td>
        </tr>`;
        }
      }
     
     
    });
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
      alert (data);
      index.getList (productId);
    } );
  };

  //新增獎品
  index.addproduct = () => {
    $.post ('/api/addProduct', { password: $ ('#password').val (), productName: $ ('#productName').val () }, (data, status) => {
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



