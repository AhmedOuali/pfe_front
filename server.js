var express = require('express');
// Create our app
var app = express();
var cons = require('consolidate');
var path = require('path')
var fs = require('fs');
var key = fs.readFileSync('./server.key');
var cert = fs.readFileSync( './server.crt' );
var ca = fs.readFileSync( './server.csr' );
var options = {
  key: key,
  cert: cert,
  ca: ca,
  passphrase: '32323232'
};
var https = require('https');
const PORT = 3001
app.use(express.static('public'));
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.use('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});
app.use((req,res,next)=> {
  console.log(req.method, req.url)
  next()
})

app.use("/hr-business-services-rest/business-services/", function(req,res,next){
  
})


app.use('/', function (req, res, next) {
  console.log('r')
  res.render('index', { title: 'Express' });
})


// https.createServer(options, app).listen(PORT);

app.listen(PORT, function () {
  console.log('Express server is up on port ',PORT);
});