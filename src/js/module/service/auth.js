/**=========================================================
 * Module: src/js/module/service/auth.js
 * 用户权限service
 * @author: haili042
 * @time: 2016年4月1日 12:43:51
 =========================================================*/

/**
 * 依赖 HttpService service
 */
App
    .service('authService', ['$rootScope', 'httpBuffer', function($rootScope, httpBuffer) {
        'use strict';

        /**
         * Call this function to indicate that authentication was successfull and trigger a
         * retry of all deferred requests.
         * @param data an optional argument to pass on to $broadcast which may be useful for
         * example if you need to pass through details of the user that was logged in
         * @param configUpdater an optional transformation function that can modify the
         * requests that are retried after having logged in.  This can be used for example
         * to add an authentication token.  It must return the request.
         */
        this.loginConfirmed = function (data, configUpdater) {
            var updater = configUpdater || function(config) {return config;};
            $rootScope.$broadcast('event:auth-loginConfirmed', data);
            httpBuffer.retryAll(updater);
        };


        /**
         * Call this function to indicate that authentication should not proceed.
         * All deferred requests will be abandoned or rejected (if reason is provided).
         * @param data an optional argument to pass on to $broadcast.
         * @param reason if provided, the requests are rejected; abandoned otherwise.
         */
        this.loginCancelled = function(data, reason) {
            httpBuffer.rejectAll(reason);
            $rootScope.$broadcast('event:auth-loginCancelled', data);
        };
    }])
;
