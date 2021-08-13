'use strict';

var login = this.login ? () => {throw new Error ();} : {};

$ (() => {
  login.login = () => {
    $.post ('/api/logining', {
      MW: $ ('#MWSelect').val (), password: $ ('#password').val (), name: $ ('#name').val () 
    }, (data, status) => {
      if (data != true){
        alert (data);
      } else {
        location.href = './index';
      }
    });
  };
  login.select = () => {
    $.post ('/api/MWList', {}, (data, status) => {
      for (let i = 0;i < data.length;i ++){
        $ ('#MWSelect').append (new Option (data[i].name, data[i].id, false));
      }
    });
  };
  login.select ();
});



