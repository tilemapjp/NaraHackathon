importScripts("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js");
importScripts("config.js");
var self = this;
require({baseUrl: "."},["x2js"],function(X2JS){
    var x2js = new X2JS();
    self.onmessage = function(e) {
        var data   = e.data;
        var method = data.method;
        var args   = data.args;

        switch (method){
            case 'stroly':
                var mapID = args.mapID;
                var url   = "https://crossorigin.me/http://css3.illustmap.org/" + mapID + ".kml"
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
                console.log(args.json);
                self.postMessage({method:'result',args:{json:args.json, mapID:args.mapID}});
                break;
        }
    };
    self.postMessage({method:"ready"});
});