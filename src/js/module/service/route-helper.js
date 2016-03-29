/**=========================================================
 * Module: service/route-helpers.js
 * 检测路由是否存在, 以及方便注入依赖
 * @author: haili042
 =========================================================*/

App.provider('RouteHelper', ['APP_REQUIRES', function(appRequire) {
    'use strict';

    this.basepath = function (uri) {
        return 'app/views/' + uri;
    };

    this.resolveFor = function () {
        var args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q', function ($oLL, $q) {
                var promise = $q.when(1)
            }]
        };
    };

    this.$get = function () {
        return {
            basepath: this.basepath
        };
    };
}]);