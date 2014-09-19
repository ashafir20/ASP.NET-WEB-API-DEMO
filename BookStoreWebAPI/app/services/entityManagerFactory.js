(function() {
    'use strict';

    var serviceId = 'entityManagerFactory';
    angular.module('app').factory(serviceId,
        ['config', entityManagerFactory]);

    function entityManagerFactory(config) {

         var provider = {
             newManager: newManager
         };
        
        return provider;


        function newManager() {
            return new breeze.EntityManager(config.remoteServiceName);
        }
    }

})();