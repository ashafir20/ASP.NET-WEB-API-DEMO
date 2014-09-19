describe('When verifying the Jasmine test envinronment', function() {
    it('should run a true test', function() {
        expect(true).toBe(true);
    });
});

describe('when querying the breeze web api', function() {
    'use strict';

    var fns = window.testFns;
    var EntityQuery = breeze.EntityQuery;
    var em, tester;
    var failed = fns.failed;

    beforeEach(function() {
        tester = ngMidwayTester('BreezeWebApiTest');
        em = new breeze.EntityManager(fns.serviceName);
    });

    afterEach(function() {
        tester.destroy();
        tester = null;
    });

    it('should get at least one order', function(done) {
        EntityQuery.from("Orders")
            .using(em)
            .execute()
            .then(success)
            .catch(failed)
            .finally(done);

        function success(data) {
            var results = data.results;
            expect(results.length).toBeGreaterThan(0);
        }
    });
    

    it('should get at least one book', function (done) {
        EntityQuery.from("Books")
            .using(em)
            .execute()
            .then(success)
            .catch(failed)
            .finally(done);

        function success(data) {
            var results = data.results;
            expect(results.length).toBeGreaterThan(0);
        }
    });

    it('should get at least one book (2)', function(done) {
        testQuery("Books", success, done);

        function success(data) {
            var results = data.results;
            expect(results.length).toBeGreaterThan(0);
        }
    });


   it('should find an order with its details', function(done) {
        testQuery("Orders", success, done, addToQuery);

        function addToQuery(query) {
            return query.top(1).expand("orderDetails");
        };

        function success(data) {
            var results = data.results;
            expect(results.length).toBe(1);
            var order = results[0];
            var details = order.orderDetails;
            expect(details.length).toBeGreaterThan(0);
        }
    });

    it('should find book with id 2', function(done) {
        testQuery("Books", success, done, addToQuery);

        function addToQuery(query) {
            return query.where('id', 'eq', 2);
        };

        function success(data) {
            var results = data.results;
            expect(results.length).toBe(1);
        }
    });

    function testQuery(resourceName, success, done, addToQuery) {
        var query = EntityQuery.from(resourceName)
            .using(em);

        if (addToQuery) {
            query = addToQuery(query);
        }

        query.execute()
            .then(success)
            .catch(failed)
            .finally(done);
    }
   

});