/**=========================================================
 * Module: src/js/module/service/http-buffer.js
 * 缓存http请求, 方便登录后重新访问原来页面, 批量发出请求
 * @author: haili042
 * @time: 2016年4月5日 09:07:08
 =========================================================*/

App.service('httpBuffer', ['$injector', function($injector) {
    'use strict';


    var buffer = [], // 缓存请求
        $http;       // 延迟初始化 $http service

    /**
     * @params config 是一个 http 请求信息对象
     * @params deferred 是一个 promise 对象
     * */
    function retryHttpRequest(config, deferred) {

        function successCallBack(response) {
            deferred.resolve(response);
        }

        function errorCallBack(response) {
            deferred.reject(response);
        }

        // 注入器注入 http 服务
        $http = $http || $injector.get('http');

        // 请求promise
        $http(config).then(successCallBack, errorCallBack);
    }


    /**
     * 增加http请求到buffer
     * @return {Number} 返回buffer新长度.
     */
    this.append = function (config, deferred) {
        return buffer.push({
            config: config,
            deferred: deferred
        })
    };

    /**
     * 拒绝所有请求, 清空buffer
     * */
    this.rejectAll = function (reason) {
        var i,
            len = buffer.length;

        if (reason) {
            for (i = 0; i < len; i++) {
                buffer[i].deferred.reject(reason);
            }
        }

        buffer = [];
    };

    /**
     * 尝试重新发起所有请求, 清空buffer
     * */
    this.retryAll = function(updater) {
        var i,
            len = buffer.length,
            cfg;

        for (i = 0; i < len; i++) {
            cfg = updater(buffer[i].config);

            if (cfg !== false) {
                retryHttpRequest(cfg, buffer[i].deferred)
            }
        }

        buffer = [];
    };

}]);
