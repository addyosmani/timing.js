(function () {
    'use strict';
    /**
     * Cross-browser Performance Timing measurements
     * Targeted at evergreen browsers.
    **/
    function getMeasurements() {
        var performance = window.performance 
        || window.webkitPerformance 
        || window.msPerformance 
        || window.mozPerformance;
        var timing = performance.timing;
        var api = {};
        
        if (timing) {
            for (var k in timing) {
                if (timing.hasOwnProperty(k)) {
                    api[k] = timing[k];
                }
            }
            
            if (api.firstPaint === null) {
                // Chrome
                if (!!window.chrome && window.chrome.loadTimes) {
                    api.firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                }
                // IE
                else if (typeof api.msFirstPaint === 'number') {
                    api.firstPaint = api.msFirstPaint;
                }
                // Firefox
                else if (window.performance.timing.navigationStart && typeof InstallTrigger !== 'undefined') {
                    api.firstPaint = window.performance.timing.navigationStart;
                }
            }
        }
        
        return api;
    }
});
