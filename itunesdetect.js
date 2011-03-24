var _detect = {
    iTunesActiveXComponentInstalled: function() {
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
        //console.log("IE ActiveXControl present: " + a);
        return a
    },
    iTunesMozillaPluginDetected: function () {
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
        //console.log("FF plugin detected: " + a);
        return a
    },
    itunesDetected: function() {
        return ((navigator.userAgent.indexOf("Macintosh") != -1) || (_detect.isIE() && _detect.iTunesActiveXComponentInstalled()) || (_detect.isSafari() && (window.location.href.indexOf("volume.itunes.apple.com") > -1)) || ((_detect.isFirefox() || _detect.isSafari() || _detect.isChrome()) && _detect.iTunesMozillaPluginDetected()))
    },
    initBrowserDetect: function () {
        if ((typeof(_detect.initBrowserDetect.browser) === "undefined") || !(_detect.initBrowserDetect.browser)) {
            var h = navigator;
            var a = h.userAgent;
            var f = h.appVersion;
            var d = parseFloat(f);
            var c = {};
            c.isOpera = (a.indexOf("Opera") >= 0) ? d : undefined;
            c.isKhtml = (f.indexOf("Konqueror") >= 0) ? d : undefined;
            c.isWebKit = parseFloat(a.split("WebKit/")[1]) || undefined;
            c.isChrome = parseFloat(a.split("Chrome/")[1]) || undefined;
            c.isFirefox = (/Firefox[\/\s](\d+\.\d+)/.test(a));
            var b = Math.max(f.indexOf("WebKit"), f.indexOf("Safari"), 0);
            if (b && !c.isChrome) {
                c.isSafari = parseFloat(f.split("Version/")[1]);
                if (!c.isSafari || parseFloat(f.substr(b + 7)) <= 419.3) {
                    c.isSafari = 2
                }
            }
            _detect.initBrowserDetect.browser = c
        }
        return _detect.initBrowserDetect.browser
    },
    isIE: function() {
        with ( document.createElement("b") ) {
		  id = 4;
		  while(
		    innerHTML = "<!--[if gt IE " + ++id + "]>1<![endif]-->",
		    innerHTML > 0
		  );
		  var ie = id > 5 ? +id : 0
		}
        return ie
    },
    isOpera: function() {
        return _detect.initBrowserDetect().isOpera
    },
    isWebKit: function() {
        return _detect.initBrowserDetect().isWebKit
    },
    isChrome: function() {
        return _detect.initBrowserDetect().isChrome
    },
    isSafari: function() {
        return _detect.initBrowserDetect().isSafari
    },
    isFirefox: function() {
        return _detect.initBrowserDetect().isFirefox
    }
};
