'use strict';

var manage = this.manage ? () => {throw new Error ();} : {};

$ (() => {
  manage.select = () => {
    $.post ('/api/productList', { member: $ ('#memberId').val (), MW: $ ('#MWId').val () }, (data, status) => {
      for (let i = 0;i < data.productList.length;i ++){
        $ ('#productSelect').append (new Option (data.productList[i].productName, data.productList[i].productId, false));
      }
    });
  };

  manage.addproduct = () => {
    $ ('#sendtotal').append (`<p>${$ ('#productSelect :selected').text ()}</p><input hidden='true' class='product' value='${$ ('#productSelect').val ()}'>`);
  };

  manage.starting = () => {
    let productId = [];
    for (let i = 0;i < $ ('.product').length;i ++){
      productId.push ($ ('.product')[i].value);
    }
    $.post ('/api/starting', { productId: productId, MW: $ ('#MWId').val () }, (data, status) => {
      alert (data);
    });
    $ ('#sendtotal')[0].innerHTML = '';
  };

  manage.setDateStart = () => {
    let productId = [];
    for (let i = 0;i < $ ('.product').length;i ++){
      productId.push ($ ('.product')[i].value);
    }
    $.post ('/api/setDatestart', {
      productId: productId, setDate: $ (`#setDate`).val (), MW: $ ('#MWId').val () 
    }, (data, status) => {
      alert (data);
    });
    $ ('#sendtotal')[0].innerHTML = '';
  };

  manage.select ();
});



