/**=========================================================
 * Module: src/js/module/directive/row-messager-dire.js
 * row-messager-widget 组件指令
 * @author: haili042
 * @time: 2016年4月9日 21:57:42
 =========================================================*/

App.directive('rowmessager', function () {
    return {
        restrict: 'EA',
        scope: {
            data: '='
        },
        templateUrl: '/app/tpl/widget/row-messager.html',
        link: function (scope, elem, attr) {
        }
    };
});