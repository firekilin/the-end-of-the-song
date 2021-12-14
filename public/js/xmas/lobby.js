let liffComplete = () => {
  getMemberList ();
  checkStatus ();
  
$ ('#out').on ('click', () => {
  liff.getProfile ().then (function(profile) {
    $.post ('/xmas/outActivity', { account: profile.userId, activityID: $ ('#activityID').val () }, (data, status) => {
      alert (data);
      location.href = "/xmas";
    }).fail (function(response) {
      window.alert ('資料庫出問題');
    });
   
  }).catch (function(error) {
    window.alert ('登入失敗請使用LINE');
    document.getElementById ('trueLiff').classList.add ('hidden');
    document.getElementById ('falseLiff').classList.remove ('hidden');
    document.getElementById ('error').innerHTML = `註冊失敗
    <p><a class="btn btn-outline-success" href="line://app/1656461762-GOPndwoP"><i class="bi bi-arrow-left-circle-fill"></i>點此進line</a></p>`;


  });
});

};


let getMemberList = () => {
  liff.getProfile ().then (function(profile) {
    $.post ('/xmas/memberList', { account: profile.userId, activityID: $ ('#activityID').val () }, (data, status) => {
      $ ('#memberList').children ().remove ();
      var colorful = ['success', 'danger', 'warning', 'info'];
      for (let i = 0;i < data.length;i ++){
        $ ('#memberList').append (` <li class="list-group-item list-group-item-${colorful[i % 4]}">${data[i].member} ${data[i].leader == 1 ? '主辦者' : ''}</li>`);
      }
      
    }).fail (function(response) {
      window.alert ('資料庫出問題');
    });
   
  }).catch (function(error) {
    window.alert ('登入失敗請使用LINE');
    document.getElementById ('trueLiff').classList.add ('hidden');
    document.getElementById ('falseLiff').classList.remove ('hidden');
    document.getElementById ('error').innerHTML = `初始化失敗 可能是麒麟的錯 <br> 但你用其他瀏覽器 就肯定是你的錯 
    <p><a class="btn btn-outline-success" href="line://app/1656461762-GOPndwoP"><i class="bi bi-arrow-left-circle-fill"></i>點此進line</a></p>`;
  });
};

let checkStatus = () => {
  liff.getProfile ().then (function(profile) {
    $.post ('/xmas/checkActivity', { account: profile.userId, activityID: $ ('#activityID').val () }, (data, status) => {
      if (data.leader && ! data.status){
        $ ('#startLottery').removeAttr ('hidden');
        $ ('#startLottery').removeAttr ('disabled');
        $ ('#out').removeAttr ('disabled');
        $ ('#out').innerHTML = '主辦者退出 將刪除活動';
      } else if (data.leader && data.status) {
        $ ('#Lottery').removeAttr ('hidden');
        $ ('#Lottery').removeAttr ('disabled');
        $ ('#out').innerHTML = '已結束抽獎 無法退出';
      } else if (data.status){
        $ ('#Lottery').removeAttr ('hidden');
        $ ('#Lottery').removeAttr ('disabled');
        $ ('#out').innerHTML = '已結束抽獎 無法退出';
      } else {
        $ ('#out').removeAttr ('disabled');
        $ ('#Lottery').innerHTML = '抽獎結果(尚未抽獎)';
      }

      
    }).fail (function(response) {
      window.alert ('資料庫出問題');
    });
  }).catch (function(error) {
    window.alert ('登入失敗請使用LINE');
    document.getElementById ('trueLiff').classList.add ('hidden');
    document.getElementById ('falseLiff').classList.remove ('hidden');
    document.getElementById ('error').innerHTML = `初始化失敗 可能是麒麟的錯 <br> 但你用其他瀏覽器 就肯定是你的錯 
    <p><a class="btn btn-outline-success" href="line://app/1656461762-GOPndwoP"><i class="bi bi-arrow-left-circle-fill"></i>點此進line</a></p>`;
  });
};
