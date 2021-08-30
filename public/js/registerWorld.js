'use strict';

var register = this.register ? () => {throw new Error ();} : {};

$ (() => {
  register.register = () => {
    $.post ('/api/registerWorld', {
      world: $ ('#world').val (), password: $ ('#password').val (), name: $ ('#name').val () 
    }, (data, status) => {
      if (data != true){
        alert (data);
      } else {
        location.href = './index';
      }
    });
  };
});



