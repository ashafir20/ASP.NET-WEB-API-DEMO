﻿(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/newOrder',
                config: {
                    title: 'newOrder',
                    templateUrl: 'app/purchase/newOrder.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-lock"></i> New Order'
                    }
                }
            }, {
                url: '/orders',
                config: {
                    title: 'Orders',
                    templateUrl: 'app/purchase/orders.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Orders'
                    }
                }
            }
        ];
    }
})();