var express = require('express');
var make = require(__dirname+'/makeHTML.js');
var app = express();

//allows javascript to find the right directories
app.use('/css', express.static(__dirname+'/css'))
app.use('/assets', express.static(__dirname+'/assets'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));

//sets up express server at localhost:3000
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Waiting');
});

//returns an HTML document containing a table with all statues
app.get('/data',function(req, res){
    var htmlDoc = make.header();
    htmlDoc += make.search('');
    htmlDoc += make.footer();
    res.send(htmlDoc);
});

//returns an HTML document containing a sorted table with all statues, sorts based on id given
app.get('/data/sorted/:id',function(req, res){
    var htmlDoc = make.header();
    htmlDoc += make.table(req.params.id);
    htmlDoc += make.footer();
    res.send(htmlDoc);
});

//returns a HTML document containing the closest result of a fuzzy search on id
app.get('/data/:id',function(req, res){
    var htmlDoc = make.header();
    htmlDoc += make.search(req.params.id);
    htmlDoc += make.footer();
    res.send(htmlDoc);
});

module.exports = {app};