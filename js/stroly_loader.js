importScripts("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js");
importScripts("config.js");
var self = this;
require({baseUrl: "."},["x2js","jsonpath"],function(X2JS,JSONPath){
    var x2js = new X2JS();
    self.onmessage = function(e) {
        var data   = e.data;
        var method = data.method;
        var args   = data.args;

        switch (method){
            case 'stroly':
                var mapID = args.mapID;
                //var url   = "https://crossorigin.me/http://css3.illustmap.org/" + mapID + ".kml"
                var url   = "http://cors.io/?u=http://css3.illustmap.org/" + mapID + ".kml";
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function(e) {
                    if (this.status == 200) {
                        self.postMessage({method:'domwork',args:{content:this.response, mapID:args.mapID}});
                    } else {
                    }
                };
                xhr.send();
                break;
            case 'domresult':
                var json    = JSON.parse(args.json);
                var epoch   = parseInt(JSONPath({json:json,path:"$.kml.epoch.__text"})[0]);
                var title   = JSONPath({json:json,path:"$.kml.Document.title[?(@._lang==='ja')].__text"})[0];
                var wh      = JSONPath({json:json,path:"$.kml.Document.wh.__text"})[0].split(",").map(function(v){return parseInt(v);});
                var illusts = JSONPath({json:json,path:"$.kml.Document.Folder[?(@._type==='illustmap')]"})[0];
                var points  = JSONPath({json:illusts,path:"$.Placemark"})[0].map(function(v){
                    var xy = JSONPath({json:v,path:"$.Point.xy.__text"})[0].split(",").map(function(v){return parseFloat(v);});
                    var merc_xy = JSONPath({json:v,path:"$.Point.mercator_xy.__text"})[0].split(",").map(function(v){return parseFloat(v);});
                    return [xy,merc_xy];
                });
                self.postMessage({method:'result',args:{title:title, wh:wh, points:points, mapID:args.mapID}});
                break;
        }
    };
    self.postMessage({method:"ready"});
});