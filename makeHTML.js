var data = require('./statues.json');
var fuse = require('fuse.js');
var sorter = require('sort-json-array');


module.exports = {
//starts HTML document with appropriate header information as well as search bar
header : function(){
    var htmlHeader = '<html><head><meta charset="utf-8"><title>Nipper Statues</title><link rel="stylesheet" href="/css/style.css">';
    htmlHeader += '<script src="/node_modules/angular/angular.js"></script>';
    //Creates angular app
    htmlHeader += '<script> var nipperApp = angular.module("nipperApp",[]); nipperApp.controller("nipperController",function($scope){ $scope.searchTerm = "";});</script></head><body>';
    //Creates search bar that redirects to correct url
    htmlHeader += '<div ng-app = "nipperApp" ng-controller = "nipperController">Search Keyword: <input type="text" ng-model="searchTerm"><a ng-href = "/data/{{searchTerm}}">Confirm</a></div>';                                
    return htmlHeader;
},
//closes off HTML tags openned in header
footer : function(){
    var htmlFooter = '</body></html>';
    return htmlFooter;
},
//creates a sorted table sorted by the sortBy parameter
table : function(sortBy){
    var statues = sorter(data,sortBy);
    //table headers will redirect to a sorted table based on header clicked
    htmlTable = '<table><tr><th><a href = "/data/sorted/name">Name</a></th><th><a href = "/data/sorted/artist">Artist</a></th><th><a href = "/data/sorted/address">Address</a></th><th>Image</th></tr>';
    for (i in statues){
        htmlTable += '<tr><td>'+statues[i].name+'</td><td>'+statues[i].artist+'</td><td>'+statues[i].address+'</td><td><img src = '+statues[i].path+' height = 100px></td></tr>';
    };
    htmlTable.concat('</table>'); 
    return htmlTable;
},
//returns a page with information on the closest fuzzy search result on the keyword parameter, if keyword is empty string returns all statues
search : function (keyword){
    var statues = '';
    //if searching an empty string display entire table
    if (keyword == ''){
        statues = data;
    }
    //only show statue that matches fuzzy search with keyword
    else {
        var option = {
            keys: ['name']
        };
        var searcher = new fuse(data, option);
        statues = searcher.search(keyword);
    };
    numResults = statues.length;
    htmlTable = '';
    if (numResults < data.length){
        //Display a single statue
        htmlTable += '<table class="image"><caption align="bottom">'+statues[0].name+', by '+statues[0].artist+'<br>Located at '+statues[0].address+'</caption><tr><td><img src = '+statues[0].path+' width = 400px></td></tr></table>';
    } else {
        //Display entire collection
        htmlTable += '<table><tr><th><a href = "/data/sorted/name">Name<a></th><th><a href = "/data/sorted/artist">Artist<a></th><th><a href = "/data/sorted/address">Address<a></th><th>Image</th></tr>';
        for (i in statues){
            htmlTable += '<tr><td>'+statues[i].name+'</td><td>'+statues[i].artist+'</td><td>'+statues[i].address+'</td><td><img src = '+statues[i].path+' height = 100px></td></tr>';
        };
        htmlTable.concat('</table>');
    };
    return htmlTable;
}

}