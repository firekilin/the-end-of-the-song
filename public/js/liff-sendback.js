let getUrlString = location.href;
let url = new URL (getUrlString);
let gettext = url.searchParams.get ('id'); // 回傳 21

if (! liff.isInClient ()) {
  sendAlertIfNotInClient ();
} else {
  liff.sendMessages ([{ 'type': 'text',
    'text': gettext }]).then (function() {
    window.alert ('Message sent');
  }).catch (function(error) {
    window.alert ('Error sending message: ' + error);
  });
}



if (! liff.isInClient ()) {
  sendAlertIfNotInClient ();
} else {
  liff.closeWindow ();
}