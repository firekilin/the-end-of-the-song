'use strict';

var show = this.show ? () => {throw new Error ();} : {};

$ (() => {

  //載入獎品公告
  show.loading = () => {
    $ ('#indexList')[0].innerHTML = '';
    $.post ('/api/showing', { MW: $ ('#MWId').val () }, (data, status) => {

      let setdate = new Date ();
      for (let i = 0;i < data.length;i ++){
        let j = i;
        let rowspanCount = 0;
        while (j<data.length && data[i].productName == data[j].productName && new Date (data[i].date).getTime () == new Date (data[j].date).getTime ()){
          j ++;
          rowspanCount += 1;
        }

        let detailBtn = `<td id="showingtd${data[i+rowspanCount-1].showId}" class="table-info" rowspan="${rowspanCount}" id='showdetail${data[i+rowspanCount-1].showId}'><button onclick='show.open(${data[i+rowspanCount-1].showId})'>顯示名單</button></td>`;
        if (i > 0){
          if (data[i].productName == data[i - 1].productName && new Date (data[i].date).getTime () == new Date (data[i - 1].date).getTime ()){
            detailBtn = '';
          } else {
            detailBtn = `<td id="showingtd${data[i+rowspanCount-1].showId}" class="table-info" rowspan="${rowspanCount}" id='showdetail${data[i+rowspanCount-1].showId}'><button onclick='show.open(${data[i+rowspanCount-1].showId})'>顯示名單</button></td>`;
          }
        }

        if (setdate.getTime () != new Date (data[i].date).getTime () && i == 0){
          setdate = new Date (data[i].date);
          $ ('#indexList')[0].innerHTML += `<tr>
          <td class='table-dark'>${setdate.getMonth () + 1}/${setdate.getDate ()} ${setdate.getHours ()}:${setdate.getMinutes ()}:${setdate.getSeconds ()}</td>
          </tr>`;
          $ ('#indexList')[0].innerHTML += `<tr>
          <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''} >${data[i].productName}</td>
          <td>${data[i].memberName}</td>
          ${detailBtn}
          </tr>`;
        } else if (setdate.getTime () != new Date (data[i].date).getTime ()){
          setdate = new Date (data[i].date);
          $ ('#indexList')[0].innerHTML += `<tr><br></tr><tr>
          <td class='table-dark'>${setdate.getMonth () + 1}/${setdate.getDate ()} ${setdate.getHours ()}:${setdate.getMinutes ()}:${setdate.getSeconds ()}</td>
          </tr>`;
          $ ('#indexList')[0].innerHTML += `<tr>
          <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''}>${data[i].productName}</td>
          <td>${data[i].memberName}</td>
          ${detailBtn}
          </tr>`;
        } else {
          $ ('#indexList')[0].innerHTML += `<tr>
        <td ${data[i].memberId == $ ('#memberId').val () ? 'style = "color:red;"' : ''}>${data[i].productName}</td>
        <td>${data[i].memberName}</td>
        ${detailBtn}
        </tr>`;
        }
      
      }

 
     
     
    });
  };
  //顯示報名成員
  show.open = (showId) => {
    $.post ('/api/showjoin', { showId: showId }, (data, status) => {
      $ (`#showingtd${showId}`)[0].innerHTML = '';
      for (let i = 0;i < data.length;i ++){
        $ (`#showingtd${showId}`)[0].innerHTML += `<p>${data[i].memberName}</p>`;
      }
    });
  };

  show.loading ();
});



