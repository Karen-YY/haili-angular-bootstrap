/**=========================================================
 * Module: src/js/module/directive/row-messager-dire.js
 * row-messager-widget 组件指令
 * @author: haili042
 * @time: 2016年4月9日 21:57:42
 =========================================================*/

/**
 * 指令用驼峰命名
 * 而html 使用指令则用 '-' 分割: 如 rowMessager  <row-messager>
 * */
App.directive('widgetRowMessager', function () {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        templateUrl: '/app/tpl/widget/row-messager.html',
        link: function ($scope, $elem, $attr) {
            /**
             * controller 最先执行, 适用于指令之间的交互, 为其他指令提供API
             * compile 和 link 同时存在, 则执行 compile , 不执行 link, 建议使用 link
             * link中 进行 dom 事件绑定, 数据绑定
             * */

            // 默认参数
            var defaultConfig = {
                    leftBlock: {
                        icon: 'fa fa-cloud',
                        style: {}
                    },
                    rightBlock: {
                        title: '',
                        msg: '',
                        style: {}
                    }
                },

                newConfig = $scope.config // 传进来的参数
                ;


            // jquery 深拷贝
            $scope.config = $.extend(true, {}, defaultConfig, newConfig);
        }
    };
});