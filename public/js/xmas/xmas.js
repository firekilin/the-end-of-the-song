let liffComplete = () => {
  getjoinActivity ();

  

  $ ('#createActivity').on ('click', () => {
    liff.getProfile ().then (function(profile) {
      $.post ('./xmas/createActivity', { 
        account: profile.userId,
        activityName: $ ('#activityName').val (),
        activityPassword: $ ('#activityPassword').val (),
        userName: $ ('#userName').val (),
        activityType: $ ('#activityType').val (),
        activityLimitS: $ ('#activityLimitS').val (),
        activityLimitE: $ ('#activityLimitE').val ()
      }, (data, status) => {
      
        
        if (data == '名稱重複'){
          window.alert ('名稱重複');
        } else if (data){
          window.alert ('創立成功');
          $ ('#createActivityModal').modal ('hide');
          $ ('#activityName').val ('');
          $ ('#activityPassword').val ('');
          $ ('#userName').val ('');
          $ ('#activityType').val ('');
          $ ('#activityLimitS').val ('');
          $ ('#activityLimitE').val ('');
        
        } else {
          window.alert ('創立失敗 資料錯誤');
        }
        getjoinActivity ();
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

  $ ('#checkActivityName').on ('click', () => {
    liff.getProfile ().then (function(profile) {
      $.post ('./xmas/checkActivityName', { account: profile.userId,
        addActivityID: $ ('#addActivityID').val () }, (data, status) => {
        if (data){
          $ ('#addActivityName').val (data);
        } else {
          alert ('不存在');
        }
      
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


  $ ('#addActivity').on ('click', () => {
    liff.getProfile ().then (function(profile) {
      $.post ('./xmas/addActivity', {
        account: profile.userId,
        addActivityID: $ ('#addActivityID').val (),
        addActivityPassword: $ ('#addActivityPassword').val (),
        addActivityMember: $ ('#addActivityMember').val () 
      }, (data, status) => {
        
        if (data){
          window.alert ('加入成功');
          $ ('#addActivityModal').modal ('hide');
          $ ('#addActivityName').val ('');
          $ ('#addActivityPassword').val ('');
          $ ('#addActivityMember').val ('') ;
          
        } else {
          window.alert ('加入失敗，名稱或密碼錯誤或重複加入');
          
        }
        getjoinActivity ();
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


  $ ('#editMember').on ('click', () => {
    liff.getProfile ().then (function(profile) {
      $.post ('./xmas/editMember', {
        account: profile.userId,
        realName: $ ('#realName').val (),
        phone: $ ('#phone').val (),
        shop: $ ('#shop').val () 
      }, (data, status) => {
        
        if (data){
          window.alert ('修改成功');
          $ ('#userSetting').modal ('hide');
          $ ('#realName').val ('');
          $ ('#phone').val ('');
          $ ('#shop').val ('') ;
        } else {
          window.alert ('修改失敗');
          
        }
        getjoinActivity ();
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

  $ ('#memberInfo').on ('click', () => {
    liff.getProfile ().then (function(profile) {
      $.post ('./xmas/memberInfo', { account: profile.userId }, (data, status) => {
        if (data){
          $ ('#realName').val (data.realName);
          $ ('#phone').val (data.phone);
          $ ('#shop').val (data.shop) ;
        } 
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


  $ ('#share').on ('click', () => {
  //分享訊息
    if (liff.isApiAvailable ('shareTargetPicker')) {
      liff.shareTargetPicker ([
        {
          'type': 'flex',
          'altText': '交換禮物',
          'contents': {
            'type': 'bubble',
            'hero': {
              'type': 'image',
              'size': 'full',
              'aspectRatio': '20:13',
              'aspectMode': 'cover',
              'action': { 'type': 'uri',
                'uri': 'http://linecorp.com/' },
              'url': './public/img/xmasIMG.jpg'
            },
            'footer': {
              'type': 'box',
              'layout': 'vertical',
              'spacing': 'sm',
              'contents': [
                {
                  'type': 'text',
                  'text': '想寫程式就寫程式',
                  'align': 'center',
                  'color': '#aaaaaa',
                  'size': '12px'
                },
                {
                  'type': 'text',
                  'text': '所產生的 Line LIFF APP',
                  'align': 'center',
                  'color': '#aaaaaa',
                  'size': '12px'
                },
                {
                  'type': 'text',
                  'text': '~ 交換禮物程式 ~ ',
                  'align': 'center',
                  'color': '#555555',
                  'size': '20px'
                },
                { 'type': 'separator' },
                {
                  'type': 'button',
                  'style': 'link',
                  'height': 'sm',
                  'action': {
                    'type': 'uri',
                    'label': '進入',
                    'uri': 'line://app/1656461762-GOPndwoP'
                  }
                },
                { 'type': 'spacer',
                  'size': 'sm' }
              ],
              'flex': 0
            }
          } 
        }
      ], { isMultiple: true, });
    } else {
      alert ('失敗');
    }
      
  });
};


let getjoinActivity = () => {
  liff.getProfile ().then (function(profile) {
    $.post ('./xmas/activityList', { account: profile.userId }, (data, status) => {
      $ ('#listActivity').children ().remove ();
      if (data.length == 0){
        $ ('#listActivity').append (' <a class="bi bi-gift" href=""  >無活動 (點我也沒用)</a>');
      }
      for (let i = 0;i < data.length;i ++){
        $ ('#listActivity').append (' <a class="bi bi-gift" href="./xmas/lobby/' + data[i].href + '"  >' + data[i].activityName + '(' + data[i].userName + ')</a>');
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




/*
{
            "type": "bubble",
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://linecorp.com/"
              },
              "url": "https://kilincat.servegame.com/public/img/xmasIMG.jpg"
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "麒麟想玩交換禮物",
                  "align": "center",
                  "size": "xxl",
                  "color": "#FF0000"
                },
                {
                  "type": "separator"
                },
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "進入",
                    "uri": "line://app/1656461762-GOPndwoP"
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          }
 */