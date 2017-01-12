/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a defined url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a defined name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        var bodyClass;

        /* It tests to ensure the menu element is hidden by default.
         */
        it('should have menu element hidden by default by having class menu hidden', function() {
            bodyClass = $('body')[0].className;
            expect(bodyClass).toContain('menu-hidden');
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should toggle the display of the menu', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            bodyClass = $('body')[0].className;
            expect(bodyClass).not.toContain('menu-hidden');
            menuIcon.click();
            bodyClass = $('body')[0].className;
            expect(bodyClass).toContain('menu-hidden');
        });

    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('has added entries', function(done) {
            var numEntries = $('.feed .entry').length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });

    });
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldContent, newContent;

        beforeEach(function(done) {
            loadFeed(1, function() {
                oldContent = $('.feed').html();
                done();
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should be new stuff', function(done) {
            loadFeed(2, function() {
                newContent = $('.feed').html();
                expect(newContent).not.toEqual(oldContent);
                done();
            });
        });
    });
}());