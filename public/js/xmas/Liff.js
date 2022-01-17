window.onload = function() {
  const useNodeJS = true; // if you are not using a node server, set this value to false
  const defaultLiffId = ''; // change the default LIFF value if you are not using a node server
  
  // DO NOT CHANGE THIS
  let myLiffId = '';
  
  // if node is used, fetch the environment variable and pass it to the LIFF method
  // otherwise, pass defaultLiffId
  if (useNodeJS) {
    fetch ('./xmas/send-id')
      .then (function(reqResponse) {
        return reqResponse.json ();
      })
      .then (function(jsonResponse) {
        myLiffId = jsonResponse.id;
        initializeLiffOrDie (myLiffId);
      })
      .catch (function(error) {
        document.getElementById ('trueLiff').classList.add ('hidden');
        document.getElementById ('falseLiff').classList.remove ('hidden');
        document.getElementById ('error').append ('程式失敗 麒麟的錯');
      });
  } else {
    myLiffId = defaultLiffId;
    initializeLiffOrDie (myLiffId);
  }

  registerButtonHandlers ();
};
  
/**
  * Check if myLiffId is null. If null do not initiate liff.
  * 驗證liff
  * @param {string} myLiffId The LIFF ID of the selected element
  */
function initializeLiffOrDie(myLiffId) {
  if (! myLiffId) {
    document.getElementById ('trueLiff').classList.add ('hidden');
    document.getElementById ('falseLiff').classList.remove ('hidden');
    document.getElementById ('error').append ('程式失敗 麒麟的錯');
  } else {
    initializeLiff (myLiffId);
  }
}
  
/**
  * Initialize LIFF
  * 設定初始LIFF
  * @param {string} myLiffId The LIFF ID of the selected element
  */
function initializeLiff(myLiffId) {
  liff
    .init ({ liffId: myLiffId })
    .then (() => {
      // start to use LIFF's api
      initializeApp ();
    })
    .catch ((err) => {
      document.getElementById ('trueLiff').classList.add ('hidden');
      document.getElementById ('falseLiff').classList.remove ('hidden');
      document.getElementById ('error').append ('初始化失敗 可能是麒麟的錯');
    });
}
  
/**
   * Initialize the app by calling functions handling individual app components
   */
function initializeApp() {

  liff.getProfile ().then (function(profile) {
    $.post ('./xmas/member', { account: profile.userId }, (data, status) => {
      $ ('#loginTrue').append ('成功');
      liffComplete ();
    }).fail (function(response) {
      window.alert ('資料庫出問題');
    });
    document.getElementById ('trueLiff').classList.remove ('hidden');
    document.getElementById ('falseLiff').classList.add ('hidden');
  }).catch (function(error) {
    window.alert ('登入失敗請使用LINE');
    document.getElementById ('trueLiff').classList.add ('hidden');
    document.getElementById ('falseLiff').classList.remove ('hidden');
    document.getElementById ('error').innerHTML = `初始化失敗 可能是麒麟的錯 <br> 但你用其他瀏覽器 就肯定是你的錯 
      <p><a class="btn btn-outline-success" href="line://app/1656461762-GOPndwoP"><i class="bi bi-arrow-left-circle-fill"></i>點此進line</a></p>`;
  
  
  });
}
  

function registerButtonHandlers() {
  
  // 至麒麟git
  document.getElementById ('github').addEventListener ('click', function() {
    liff.openWindow ({ url: 'https://github.com/firekilin/',
      external: true });
  });
  
}
  
  
  
/*
  //登入狀態
  function displayLiffData() {
    document.getElementById ('browserLanguage').textContent = liff.getLanguage ();
    document.getElementById ('sdkVersion').textContent = liff.getVersion ();
    document.getElementById ('lineVersion').textContent = liff.getLineVersion ();
    document.getElementById ('isInClient').textContent = liff.isInClient ();
    document.getElementById ('isLoggedIn').textContent = liff.isLoggedIn ();
    document.getElementById ('deviceOS').textContent = liff.getOS ();
  }
  
  
    
    //登入登出
    function displayIsInClientInfo() {
      if (liff.isInClient ()) {
        document.getElementById ('liffLoginButton').classList.toggle ('hidden');
        document.getElementById ('liffLogoutButton').classList.toggle ('hidden');
        document.getElementById ('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
      } else {
        document.getElementById ('isInClientMessage').textContent = 'You are opening the app in an external browser.';
        document.getElementById ('shareTargetPicker').classList.toggle ('hidden');
      }
    }
  
  
    // closeWindow call 關閉liff視窗
    document.getElementById ('closeWindowButton').addEventListener ('click', function() {
      if (! liff.isInClient ()) {
        sendAlertIfNotInClient ();
      } else {
        liff.closeWindow ();
      }
    });
  
      // sendMessages call  傳訊息
    document.getElementById ('sendMessageButton').addEventListener ('click', function() {
      if (! liff.isInClient ()) {
        sendAlertIfNotInClient ();
      } else {
        let getUrlString = location.href;
        let url = new URL (getUrlString);
        let gettext = url.searchParams.get ('text'); // 回傳 21
        
        liff.sendMessages ([{ 'type': 'text',
          'text': gettext }]).then (function() {
          liff.closeWindow ();
        }).catch (function(error) {
          window.alert ('Error sending message: ' + error);
        });
      }
  
    });
  
  
     // get access token 取得access token
    document.getElementById ('getAccessToken').addEventListener ('click', function() {
      if (! liff.isLoggedIn () && ! liff.isInClient ()) {
        alert ('To get an access token, you need to be logged in. Please tap the "login" button below and try again.');
      } else {
        const accessToken = liff.getAccessToken ();
        document.getElementById ('accessTokenField').textContent = accessToken;
        toggleAccessToken ();
      }
    });
  
  
    // get profile call 取得資訊
    document.getElementById ('getProfileButton').addEventListener ('click', function() {
      liff.getProfile ().then (function(profile) {
        document.getElementById ('userIdProfileField').textContent = profile.userId;
        document.getElementById ('displayNameField').textContent = profile.displayName;
  
        const profilePictureDiv = document.getElementById ('profilePictureDiv');
        if (profilePictureDiv.firstElementChild) {
          profilePictureDiv.removeChild (profilePictureDiv.firstElementChild);
        }
        const img = document.createElement ('img');
        img.src = profile.pictureUrl;
        img.alt = 'Profile Picture';
        profilePictureDiv.appendChild (img);
  
        document.getElementById ('statusMessageField').textContent = profile.statusMessage;
        toggleProfileData ();
      }).catch (function(error) {
        window.alert ('Error getting profile: ' + error);
      });
    });
  
  
    //分享訊息
    document.getElementById ('shareTargetPicker').addEventListener ('click', function () {
      if (liff.isApiAvailable ('shareTargetPicker')) {
        liff.shareTargetPicker ([{ 'type': 'text',
          'text': 'Hello, World!' }]).then (
          document.getElementById ('shareTargetPickerMessage').textContent = 'Share target picker was launched.'
        ).catch (function (res) {
          document.getElementById ('shareTargetPickerMessage').textContent = 'Failed to launch share target picker.';
        });
      } else {
        document.getElementById ('shareTargetPickerMessage').innerHTML = '<div>Share target picker unavailable.<div><div>This is possibly because you haven\'t enabled the share target picker on <a href=\'https://developers.line.biz/console/\'>LINE Developers Console</a>.</div>';
      }
    });
  
    
  
    // login call, only when external browser is used
    document.getElementById ('liffLoginButton').addEventListener ('click', function() {
      if (! liff.isLoggedIn ()) {
        // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
        liff.login ();
      }
    });
  
    // logout call only when external browse
    document.getElementById ('liffLogoutButton').addEventListener ('click', function() {
      if (liff.isLoggedIn ()) {
        liff.logout ();
        window.location.reload ();
      }
    });
  */
  