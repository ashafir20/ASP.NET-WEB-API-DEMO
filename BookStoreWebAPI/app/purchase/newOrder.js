(function () {
    'use strict';
    var controllerId = 'newOrder';
    angular.module('app').controller(controllerId, ['common', 'datacontext', viewModel]);

    function viewModel(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logInfo = getLogFn(controllerId, "info");
        var logSuccess = getLogFn(controllerId, "success");

        var vm = this;
        vm.addBookToOrder = addBookToOrder;
        vm.books = [];
        vm.order = null;
        vm.orderDetails = [];
        vm.save = save;

        activate();

        function activate() {
            common.activateController([datacontext.ready], controllerId)
                .then(function () {
                    log('Activated New Order View');
                    createOrder();
                });

            logInfo("Getting Books...");

            datacontext.getBooks()
                .then(function (books) {
                    vm.books = books;
                });

        }

        function addBookToOrder(book) {
            var details = vm.orderDetails;
            var len = details.length;
            for (var index = 0; index < len; index++) {
                if (details[index].book === book) {
                    break;
                }
            }
            if (index === len) {
                var newItem = datacontext.addBookToOrder(book, vm.order);
                details.unshift(newItem);
            }
            else {
                details[index].quantity += 1;
            }
        };

        function createOrder() {
            vm.order = datacontext.createOrder();
            vm.orderDetails = [];
        };

        function save() {
            datacontext.saveOrder();
                //.then(success);
            function success() {
                createOrder();
                logSuccess("Order saved.");
            };

        };
    }
})();