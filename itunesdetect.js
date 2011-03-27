var _detect = {
    activeX: function(){
        // проверяем наличие iTunes через ActiveX (актуально только для IE)
        var b = document.getElementById("iTunesDetectorIE");
        var a = false;
        if ((b != null) && (typeof(b) != "undefined")) {
            if (typeof(b.IsITMSHandlerAvailable) != "undefined") {
                a = b.IsITMSHandlerAvailable;
            }
            if ((a == null) || (typeof(a) == "undefined")) {
                a = false
            }
        }
        return a
    },
    plugin: function(){
        // проверяем наличие установки через navigator.plugins (актуально для всех браузеров, кроме IE)
        var a = false;
        if (navigator.plugins && navigator.plugins.length > 0) {
            for (var b = 0; b < navigator.plugins.length; b++) {
                var c = navigator.plugins[b];
                var d = c.name;
                if (d.indexOf("iTunes Application Detector") > -1) {
                    a = true
                }
            }
        }
        return a
    },
    iTunes: function(){
        return ((navigator.userAgent.indexOf("Macintosh") != -1) // если Macintosh – iTunes стоит
            || (!_detect.isIE() && _detect.plugin()) // смотрим в navigator.plugins
            || (_detect.isIE() && _detect.activeX()) // смотрим через ActiveX в IE
            || false);
    },
    isIE: function() {
       return '\v' == 'v';
    }
};