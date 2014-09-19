(function() {
    angular.module('app').factory('config.breeze', [
        '$q', 'use$q',
        function($q, use$q) {
            // use $q for promises
            use$q($q);

            // use $http for ajax calls
            breeze.config.initializeAdapterInstance("ajax", "angular");

            // backingStore works for Angular (ES5 property 'ready')
            breeze.config.initializeAdapterInstance('modelLibrary',
                'backingStore', true);

            breeze.NamingConvention.camelCase.setAsDefault();
        }
    ]);
})();