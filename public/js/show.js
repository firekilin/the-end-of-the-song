'use strict';

var show = this.show ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品公告
  show.loading = () => {
    $ ('#indexList')[0].innerHTML = '';
    $.post ('/api/showing', { }, (data, status) => {
      for (let i = 0;i < data.length;i ++){
        $ ('#indexList')[0].innerHTML += `<tr>
        <td>${data[i].productName}</td>
        <td>${data[i].memberName}</td>
        <td>${data[i].date}</td>
        
        </tr>`;
      }

        
      
     
     
    });
  };


  show.loading ();
});



