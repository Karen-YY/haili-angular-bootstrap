/**=========================================================
 * app.js
 * 初始化程序
 * @author: haili042
 =========================================================*/

// 一个项目只有一个 ng-app
var App = angular.module('app', [
    'ui.router'
]);

// 这里的run方法只会在angular启动的时候运行一次。
App.run(function ($rootScope, $state, $stateParams, $window, $templateCache, APP_INFO) {

    // 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // 应用信息, 在 constants.js 内
    $rootScope.app = APP_INFO;

});

