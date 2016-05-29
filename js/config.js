require.config({
    baseUrl: "js",
    //map: {
    //    '*' : {
    //        'css' : "//cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css.min.js"
    //    }
    //},
    paths: {
        "jquery" : "//code.jquery.com/jquery-1.11.2.min",
        "jui" : "//code.jquery.com/ui/1.10.3/jquery-ui.min",
        "ol3" : "ol-debug",
        "ol-custom" : "ol-custom",
        //"ol3css" : "../css/ol",
        "bootstrap" : "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
        //"bootstrapcss" : "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min",
        "tps" : "thinplatespline",
        "x2js" : "xml2json.min"
    },
    shim: {
        'jquery' : {
            exports: '$'
        },
        'jui' : { 
            deps: ['jquery'] 
        },
        'ol3' : {
            exports: 'ol'
        },
        'tps' : {
            exports: 'ThinPlateSpline'
        },
        'bootstrap' : { 
            deps: ['jquery'] 
        }/*,
        "x2js" : {
            exports: 'X2JS'
        }*/
    }
});
