/**=========================================================
 * Module: src/js/module/service/interceptor.js
 * 拦截器
 * @author: haili042
 * @time: 2016年4月5日 09:44:13
 =========================================================*/

/**
 *
 通过实现 request 方法拦截请求:
 该方法会在 $http 发送请求道后台之前执行，因此你可以修改配置或做其他的操作。
 该方法接收请求配置对象(request configuration object)作为参数，然后必须返回配置对象或者 promise 。
 如果返回无效的配置对象或者 promise 则会被拒绝，导致 $http 调用失败。

 通过实现 response 方法拦截响应:
 该方法会在 $http 接收到从后台过来的响应之后执行，因此你可以修改响应或做其他操作。
 该方法接收响应对象(response object)作为参数，然后必须返回响应对象或者 promise。
 响应对象包括了请求配置(request configuration)，头(headers)，状态(status)和从后台过来的数据(data)。
 如果返回无效的响应对象或者 promise 会被拒绝，导致 $http 调用失败。

 通过实现 requestError 方法拦截请求异常:
 有时候一个请求发送失败或者被拦截器拒绝了。请求异常拦截器会俘获那些被上一个请求拦截器中断的请求。
 它可以用来恢复请求或者有时可以用来撤销请求之前所做的配置，比如说关闭进度条，激活按钮和输入框什么之类的。

 通过实现 responseError 方法拦截响应异常:
 有时候我们后台调用失败了。也有可能它被一个请求拦截器拒绝了，或者被上一个响应拦截器中断了。
 在这种情况下，响应异常拦截器可以帮助我们恢复后台调用。

 */

App
    // 拦截器定义
    .factory('authInterceptor', ['$rootScope', '$q', 'httpBuffer', 'APP_AUTH_EVENT',
        function ($rootScope, $q, httpBuffer, APP_AUTH_EVENT) {
        return {
            /**
             * 请求之前执行
             * */
            request: function(config) {
                //config.headers['TOKEN'] = $rootScope.sessionInfo.token;
                return config; // 必须返回 promise 对象或 config 对象
            },


            /**
             * 响应错误
             * */
            responseError: function (response) {
                var config = response.config || {};
                if (!config.ignoreAuthModule) {

                    switch (response.status) {

                        /**
                         * 401 没有权限 - user not login
                         * */
                        case 401:
                            var deferred = $q.defer();

                            // 当前请求添加到 buffer
                            var bufferLength = httpBuffer.append(config, deferred);

                            // 只有一个的情况, 即当前请求
                            if (bufferLength === 1) {
                                // 广播没有权限事件
                                $rootScope.$broadcast(APP_AUTH_EVENT.noAuth, response);
                            }
                            return deferred.promise;

                        /**
                         * 403 服务器拒绝 — The user is logged in but isn’t allowed access
                         * */
                        case 403:
                            // 广播事件
                            $rootScope.$broadcast(APP_AUTH_EVENT.forbidden, response);
                            break;
                    }
                }
                // otherwise, default behaviour
                return $q.reject(response);
            }
        };
    }])


;
