/**=========================================================
 * Module: src/js/module/service/widget-get-data.js
 * 组件获取数据的服务
 * @author: haili042
 * @time: 2016年4月13日 18:05:07
 =========================================================*/

App
    .service('widgetService', ['$q', '$http', function ($q, $http) {
        'use strict';

        // 默认参数
        var config, // 合并后的配置
            deferred = $q.defer(),
            promise = deferred.promise,
            queryParams = {},
            that = this
            ;

        // 获取配置
        this.concatConfig = function (defConf, newConf) {
            // jquery 深拷贝
            config = $.extend(true, newConf, defConf, newConf);
            return config;
        };

        // 转移指令到指定元素上
        this.transferAttr = function (fromEle, toEle, attrs, type, remainFromEleAttr) {
            if (type === 'class') {
                toEle.addClass(attrs.class);
                if (!remainFromEleAttr) {
                    fromEle.removeClass(attrs.class);
                }
            }
            return that;
        };

        // 获取 promise 对象
        this.getPromise = function (config) {

            var http = httpService(config);
            http && http.success(function (data, status, headers, conf) {
                deferred.resolve(data, status, headers, conf);
            }).error(function (data, status, headers, conf) {
                deferred.reject(data, status, headers, conf);
            });

            return promise;
        };

        // 获取数据
        this.getData = function (config, callback, errorCallback) {

            var http = httpService(config);
            http && http.success(function (data, status, headers, conf) {
                callback && callback(data, status, headers, conf);
            }).error(function (data, status, headers, conf) {
                errorCallback && errorCallback(data, status, headers, conf);
            });
            return that;
        };

        // 请求公用方法
        function httpService(config) {
            if (!config) {
                throw new Error('首先要设置配置');
                return false;
            }

            // 有url 则发送请求, 否则使用 data 属性
            if (config.url) {

                var http = $http({
                    method: 'get',
                    url: config.url,
                    params: queryParams, // 参数转成字符串放在 url 后面
                    cache: false
                }).success(function (data, status, headers, conf) {
                    config.onLoadSuccess && config.onLoadSuccess(data);
                }).error(function (data, status, headers, conf) {
                    config.onLoadError && config.onLoadError(data);
                });
                return http;
            } else {
                return false;
            }

        }

    }])
;