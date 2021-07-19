'use strict';

var login = this.login ? () => {throw new Error ();} : {};

$ (() => {
  login.login = () => {
    $.post ('/api/logining', { name: $ ('#name').val () }, (data, status) => {
      if (data != true){
        alert (data);
      } else {
        location.href = './index';
      }
    });
  };
  
});



