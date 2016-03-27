/**=========================================================
 * config.js
 * 配置路由
 * @author: haili042
 =========================================================*/

App.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        'use strict';

        // 默认路由
        $urlRouterProvider.otherwise('/');

        // 路由配置
        // 注意这里采用的是ui-router这个路由，而不是ng原生的路由。ng原生的路由不能支持嵌套视图
        $stateProvider
            .state('/', {
                url: '/index',
                title: '首页',
                views: {
                    '': {
                        templateUrl: 'app/tpl/index.html'
                    }

                }
            })

            // 类似 struts 的通配符
            // bss: business 业务文件夹, 与 tpl 下的文件夹名一一对应
            .state('/:bss', {
                // page 与 bss 内的文件名一一对应
                url: '/:bss/:page',
                title: '用户管理',
                templateUrl: function ($routeParams) {
                    // 添加时间戳, 防止缓存
                    return 'app/tpl/' + $routeParams.bss + '/' + $routeParams.page + '.html?_=' + new Date().getTime();
                }
            })
        ;
}]);