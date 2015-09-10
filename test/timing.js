describe('node-timing.js', function () {
    var timings;
    var firefoxKeys = [
        'appcacheTime',
        'connectTime',
        'domReadyTime',
        'firstPaint',
        'initDomTreeTime',
        'loadEventTime',
        'loadTime',
        'lookupDomainTime',
        'readyStart',
        'redirectTime',
        'requestTime',
        'unloadEventTime'
    ];

    var chromeKeys = [
        'appcacheTime',
        'connectTime',
        'domReadyTime',
        'firstPaint',
        'firstPaintTime',
        'initDomTreeTime',
        'loadEventTime',
        'loadTime',
        'lookupDomainTime',
        'readyStart',
        'redirectTime',
        'requestTime',
        'unloadEventTime'
    ];

    before(function () {
        browser.get('/');
        browser.driver.executeScript(require('../timing').getTimes).then(function (times) {
            timings = times;
        });
    });

    it('should have some timings', function () {
        expect(timings).to.not.be.empty;
    });

    it('should have all the right information', function () {
        browser.getCapabilities().then(function (cap) {
            var keys;
            var name = cap.caps_.browserName;
            if (name === 'firefox') {
                keys = firefoxKeys;
            } else if (name === 'chrome') {
                keys = chromeKeys;
            }

            expect(Object.keys(timings).sort()).to.eql(keys);
        });
    });

});
