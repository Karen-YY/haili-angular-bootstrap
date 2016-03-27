/**=========================================================
 * config.js
 * 配置路由
 * @author: haili042
 =========================================================*/

App.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        'use strict';

        // 无效路由负责, $urlRouterProvider 负责配置指定url之外的url请求
        $urlRouterProvider.otherwise('/');

        // 路由配置
        // 注意这里采用的是ui-router这个路由，而不是ng原生的路由。ng原生的路由不能支持嵌套视图
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'app/tpl/home/login.html'
            })

            // 类似 struts 的通配符
            // :bss 即 business, 业务文件夹, 与 tpl 下的文件夹名一一对应
            // :page 与 bss 内的文件名一一对应
            // 先匹配 home, 然后匹配 url, 即 home/:bss/page
            .state(':bss', {
                // page 与 bss 内的文件名一一对应
                url: '/:page',
                views: {
                    '': {
                        templateUrl: 'app/tpl/home/layout.html' // 默认值
                    },
                    'content@:bss/:page': {
                        templateUrl: function ($routeParams) {
                            var bss = $routeParams.bss || 'home';
                            var page = $routeParams.page || 'home' ;
                            console.log(bss);
                            console.log(page);
                            // 添加时间戳, 防止缓存
                            return 'app/tpl/' + bss + '/' + page + '.html?_=' + new Date().getTime();
                        }
                    }
                }
            })
        ;
}]);