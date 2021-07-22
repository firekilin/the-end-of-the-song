'use strict';

var manage = this.manage ? () => {throw new Error ();} : {};

$ (() => {
  manage.select = () => {
    $.post ('/api/productList', {}, (data, status) => {
      for (let i = 0;i < data.length;i ++){
        $ ('#productSelect').append (new Option (data[i].productName, data[i].productId, false));
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
    $.post ('/api/starting', { productId: productId }, (data, status) => {
      alert (data);
    });
    $ ('#sendtotal')[0].innerHTML = '';
  };

  manage.select ();
});



