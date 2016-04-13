/**=========================================================
 * Module: src/js/module/service/widget-get-data.js
 * 组件获取数据的服务
 * @author: haili042
 * @time: 2016年4月13日 18:05:07
 =========================================================*/

App
    .service('widgetGetData', ['$q', '$http', function ($q, $http) {
        // 默认参数
        var config, // 合并后的配置
            deferred = $q.defer(),
            promise = deferred.promise,
            queryParams = {},
            that = this
            ;

        // 获取配置
        this.getConfig = function () {
            return config;
        };

        // 设置配置
        this.setConfig = function (defConf, newConf) {
            if (!config) {
                // jquery 深拷贝
                config = $.extend(true, {}, defConf, newConf);
            }
            return that;
        };

        // 获取 promise 对象
        this.getPromise = function () {

            if (!config) {
                throw new Error('首先要设置配置');
                return false;
            }

            // 发送请求
            if (config.url) {

                $http({
                    method: 'get',
                    url: config.url,
                    params: queryParams // 参数转成字符串放在 url 后面
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data, status, headers, config);
                });
            }

            return promise;
        };

    }])
;