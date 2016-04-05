/**=========================================================
 * Module: src/js/module/service/route-helper.js:4
 * 检测路由是否存在, 以及方便注入依赖
 * @author: haili042
 * @time: 2016年4月1日 12:43:51
 =========================================================*/

App.provider('routeHelper', ['APP_REQUIRE', function(APP_REQUIRE) {
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