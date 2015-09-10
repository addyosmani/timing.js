describe('node-timing.js', function () {
    var timings;

    before(function () {
        browser.get('/');
        browser.driver.executeScript(require('../timing').getTimes).then(function (times) {
            timings = times;
        });
    });

    it('should have some timings', function () {
        expect(timings.loadTime).to.be.below(2000 /* milliseconds */);
    });

});
