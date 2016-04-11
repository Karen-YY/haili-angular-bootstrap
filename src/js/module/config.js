/**=========================================================
 * Module: src/js/module/config.js
 * 配置路由
 * @author: haili042
 * @time: 2016年4月1日 12:45:24
 =========================================================*/

App
    // 路由配置
    .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        'use strict';

        // 配置无效路由, $urlRouterProvider 负责配置指定url之外的url请求
        $urlRouterProvider.otherwise('/app/home');

        // 路由配置
        // 注意这里采用的是ui-router这个路由，而不是ng原生的路由。ng原生的路由不能支持嵌套视图
        $stateProvider

            //
            // 组件都嵌套在父路由内
            // -----------------------------------
            .state('app', {
                url: '/app',
                abstract: true, // 表明此状态不能被显性激活，只能被子状态隐性激活(子状态激活同时, 父状态也激活)
                templateUrl: 'app/tpl/frame/layout.html' // 布局
            })

            // 子路由, 点标记法(推荐)
            .state('app.home', {
                url: '/home',
                templateUrl: 'app/tpl/home/home.html'
            })

            // examples
            // -----------------------------------
            .state('app.example-form', {
                url: '/example-form',
                templateUrl: 'app/tpl/example/example-form.html'
            })

            .state('app.example-chart', {
                url: '/example-chart',
                templateUrl: 'app/tpl/example/example-chart.html'
            })

            .state('app.example-table', {
                url: '/example-table',
                templateUrl: 'app/tpl/example/example-table.html'
            })

            //.state('app.example', {
            //    //url: '/{tpl: [0-9]{1,4}}', // 匹配数字
            //    url: '/{tpl: [a-zA-Z0-9_$]*}', // 匹配变量名
            //    views: {
            //        // @app 表示替换的是 app 状态下的匿名 ui-view
            //        'content@app': {
            //            templateUrl: function ($routeParams) {
            //                var tpl = $routeParams.tpl || 'example-form' ;
            //                return 'app/tpl/example/' + tpl + '.html';
            //            }
            //        }
            //    }
            //})

            // 单页路由
            // -----------------------------------
            .state('page', {
                url: '/page',
                abstract: true,
                templateUrl: 'app/tpl/page/page-holder.html'
            })
            .state('page.login', {
                url: '/login',
                title: "Login",
                templateUrl: 'app/tpl/page/login.html'
            })
            .state('page.register', {
                url: '/register',
                templateUrl: 'app/tpl/page/register.html'
            })
            .state('page.404', {
                url: '/404',
                templateUrl: 'app/tpl/page/404.html'
            })
        ;
    }])

    // 请求头配置
    .config(['$httpProvider', 'APP_HEADER', function($httpProvider, APP_HEADER) {

        var max_age = 'max-age=' + APP_HEADER['max-age'] || 0;

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // 设置缓存
        $httpProvider.defaults.headers.get['Cache-Control'] = max_age;
    }])

;