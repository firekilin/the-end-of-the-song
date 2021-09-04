const express = require ('express');
const app = express ();
const main = require ('./routers/main');
const api = require ('./routers/api');
const linebot = require ('./routers/linebot');
const plugins = require ('./routers/plugins');
const config = require ('config');
const port = config.get ('app.port');
const https=require('https');
const fs=require('fs');
var credentials = require ('./models/credential.js');
var cookieParser = require ('cookie-parser');




app.listen (port, () => {
  console.log ('listen on port:' + port);
});

https.createServer({
    key:fs.readFileSync('./ssl/privkey.pem'),
    cert:fs.readFileSync('./ssl/fullchain.pem'),
    passphrase:'firekilin'

},app).listen(443,function(){
  console.log('443 open')
});

app.use (cookieParser (credentials.cookieSecret));
app.set ('views', './views');
app.set ('view engine', 'ejs');
app.use ('/', main); //頁面用
app.use ('/api', api); //api
app.use ('/plugins', plugins); //使用套件
app.use ('/public', express.static ('./public'));
app.use('/.well-known',express.static('./.well-known'));
app.use ('/linebot', linebot);//LINEbot
