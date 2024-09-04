import express from 'express';
import cors from 'cors';
import path from 'path';
import request from 'request';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors_proxy from 'cors-anywhere';


dotenv.config()




const __dirname = path.resolve();


var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
// var redirect_uri = 'http://localhost:3333/callback'; DEV
var redirect_uri = 'https://briiking4.github.io/cleanify2.0/callback'; // PROD


var stateKey = 'spotify_auth_state';

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(__dirname + '/build'))
   .use(cookieParser());



function generateRandomString(length){
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };

 app.get('/login', function(req, res) {
   var state = generateRandomString(16);
   res.cookie(stateKey, state);

   var scope = 'streaming user-top-read user-read-currently-playing user-read-recently-played user-library-read user-library-modify user-modify-playback-state user-read-playback-state app-remote-control user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';

   res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));

 });

 app.get('/callback', function(req, res) {

   var code = req.query.code || null;
   var state = req.query.state || null;
   var storedState = req.cookies ? req.cookies[stateKey] : null;

   if (state === null || state !== storedState) {
     res.redirect('/#' +
       querystring.stringify({
         error: 'state_mismatch'
       }));
   } else {
     res.clearCookie(stateKey);
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: redirect_uri,
         grant_type: 'authorization_code'
       },
       headers: {
         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
       },
       json: true
     }

   request.post(authOptions, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var access_token = body.access_token
       let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
       res.redirect(uri + '#access_token=' + access_token)
     }
   })
  }
 });

 app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// AFTER defining routes:
// production:
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});



let port = process.env.PORT || 3333
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)

// Listen on a specific host via the HOST environment variable
var cors_host = '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var cors_port = 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(cors_port, cors_host, function() {
    console.log('Running CORS Anywhere on ' + cors_host + ':' + cors_port);
});
