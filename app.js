const express = require ('express');
const app = express ();
const main = require ('./routers/main');
const api = require ('./routers/api');
const plugins = require ('./routers/plugins');
const config = require ('config');
const port = config.get ('app.port');
var credentials = require ('./models/credential.js');
var cookieParser = require ('cookie-parser');
var schedule = require ('node-schedule');

app.listen (port, () => {
  console.log ('listen on port:' + port);
});

app.use (cookieParser (credentials.cookieSecret));
app.set ('views', './views');
app.set ('view engine', 'ejs');
app.use ('/', main); //頁面用
app.use ('/api', api); //api
app.use ('/plugins', plugins); //使用套件
app.use ('/public', express.static ('./public'));

