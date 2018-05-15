var express = require('express');
// Create our app
var app = express();
var cons = require('consolidate');
var path = require('path')

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

app.use('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})


app.listen(3000, function () {
  console.log('Express server is up on port 3000');
});