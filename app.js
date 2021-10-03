const express = require ('express');
const app = express ();
const main = require ('./routers/main');
const api = require ('./routers/api');
const linebot = require ('./routers/linebot');
const plugins = require ('./routers/plugins');
const config = require ('config');
const port = config.get ('app.port');
const https = require ('https');
const fs = require ('fs');
var credentials = require ('./models/credential.js');
var cookieParser = require ('cookie-parser');
var http = require ('http');

if (port != 80){
  
  app.listen (port, () => {
    console.log ('listen on port:' + port);
  });

} else {
  
  http.createServer (function (req, res) {
    if (req.headers['host'] != 'btss.hopto.org'){
      res.writeHead (301, { 'Location': 'https://' + req.headers['host'] + req.url });
      res.end ();
    } 

  }, app).listen (80);

  https.createServer ({
    key: fs.readFileSync ('./ssl/privkey.pem'),
    cert: fs.readFileSync ('./ssl/fullchain.pem'),
    passphrase: 'firekilin'

  }, app).listen (443, function(){
    console.log ('443 open');
  });
}



app.use ('/linebot', linebot);//LINEbot
app.use (cookieParser (credentials.cookieSecret));
app.set ('views', './views');
app.set ('view engine', 'ejs');
app.use ('/', main); //頁面用
app.use ('/api', api); //api
app.use ('/plugins', plugins); //使用套件
app.use ('/public', express.static ('./public'));


app.use ('/.well-known', express.static ('./.well-known'));
app.use (function(req, res){
  res.status (404).send ('查無此頁,<a href=\'https://kilincat.servegame.com/index\'>點此回首頁</a>');
});
