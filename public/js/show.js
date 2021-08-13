'use strict';

var show = this.show ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品公告
  show.loading = () => {
    $ ('#indexList')[0].innerHTML = '';
    $.post ('/api/showing', { MW: $ ('#MWId').val () }, (data, status) => {

      let setdate = new Date ();
      for (let i = 0;i < data.length;i ++){
        if (setdate.getTime () != new Date (data[i].date).getTime () && i == 0){
          setdate = new Date (data[i].date);
          $ ('#indexList')[0].innerHTML += `<tr>
          <td class='table-dark'>${setdate.getMonth () + 1}/${setdate.getDate ()} ${setdate.getHours ()}:${setdate.getMinutes ()}:${setdate.getSeconds ()}</td>
          </tr>`;
          $ ('#indexList')[0].innerHTML += `<tr>
          <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''} >${data[i].productName}</td>
          <td>${data[i].memberName}</td>
          </tr>`;
        } else if (setdate.getTime () != new Date (data[i].date).getTime ()){
          setdate = new Date (data[i].date);
          $ ('#indexList')[0].innerHTML += `<tr><br></tr><tr>
          <td class='table-dark'>${setdate.getMonth () + 1}/${setdate.getDate ()} ${setdate.getHours ()}:${setdate.getMinutes ()}:${setdate.getSeconds ()}</td>
          </tr>`;
          $ ('#indexList')[0].innerHTML += `<tr>
          <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''}>${data[i].productName}</td>
          <td>${data[i].memberName}</td>
          </tr>`;
        } else {
          $ ('#indexList')[0].innerHTML += `<tr>
        <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''}>${data[i].productName}</td>
        <td>${data[i].memberName}</td>
        </tr>`;
        }
      
      }

        
      
     
     
    });
  };


  show.loading ();
});



