const express = require ('express');
const app = express ();
const main = require ('./routers/main');
const api = require ('./routers/api');
const linebot = require ('./routers/linebot');
const xmas = require ('./routers/xmas');
const plugins = require ('./routers/plugins');
const config = require ('config');
const port = config.get ('app.port');
const https = require ('https');
const fs = require ('fs');
const cors = require ('cors');
const usesession = require ('./models/session');
const credentials = require ('./models/credential.js');
const cookieParser = require ('cookie-parser');
const http = require ('http');

app.use (cors ());

app.use (usesession.session ({
  key: 'aid',
  secret: usesession.credentials.sessionSecret,
  store: usesession.sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: ('name', 'value', { 
    maxAge: 10 * 365 * 24 * 60 * 60, secure: false, name: 'seName', resave: false 
  })
}
));

if (port != 80){
  
  app.listen (port, () => {
    console.log ('listen on port:' + port);
  });

} else {
  
  http.createServer (function (req, res) {
    res.writeHead (301, { 'Location': 'https://kilincat.servegame.com' + req.url });
    res.end ();

  }).listen (80);

  https.createServer ({
    key: fs.readFileSync ('./ssl/privkey.pem'),
    cert: fs.readFileSync ('./ssl/fullchain.pem'),
    passphrase: 'firekilin'

  }, app).listen (443, function(){
    console.log ('443 open');
  });
}



app.use ('/linebot', linebot);//LINEbot
app.use ('/xmas', xmas);//Xmas
app.use (cookieParser (credentials.cookieSecret));
app.set ('views', './views');
app.set ('view engine', 'ejs');
app.use ('/', main); //頁面用
app.use ('/api', api); //api
app.use ('/plugins', plugins); //使用套件
app.use ('/public', express.static ('./public'));


app.use ('/.well-known', express.static ('./.well-known'));
app.use (function(req, res){
  
  res.status (404).send ('查無此頁,<a href=\'https://kilincat.servegame.com\'>點此回首頁</a>');
});
