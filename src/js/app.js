/**=========================================================
 * Module: src/js/app.js
 * 初始化程序
 * @author: haili042
 * @time: 2016年4月1日 12:46:06
 =========================================================*/

// 一个项目只有一个 ng-app
var App = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'ngCookies'
]);

// 这里的run方法只会在angular启动的时候运行一次。
App
    .run(function ($rootScope, $state, $stateParams, $window, $templateCache, $sessionStorage) {

        // 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.app = {
            name: 'haili-ng-bstrp',
            title: 'Haili042 ng Admin系统',
            description: 'haili042 angular bootstrap admin',
            year: '2016',
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: true,
                theme: null
            },
            useFullLayout: false,
            hiddenFooter: false,
            viewAnimation: 'ng-fadeInUp'
        };


        //
        //$rootScope.$storage = $sessionStorage.$default({
        //    user: null,
        //    token: null
        //});
        //console.log($rootScope.$storage);

        // 路由过滤器, 用来认证权限
        //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //
        //    console.log($rootScope.$storage);
        //
        //    // 如果是进入登录页面则允许
        //    if (toState.name === 'page.login') {
        //        return true;
        //    }
        //
        //    /*
        //     // 如果用户不存在
        //     if ($rootScope.$storage === undefined) {
        //
        //     // 取消跳转
        //     event.preventDefault();
        //
        //     // 跳转到登录页面
        //     $state.go('page.login');
        //     }
        //     */
        //
        //});
    })


    //.config(['$rootScope', function($rootScope) {
    //
    //}])
;

