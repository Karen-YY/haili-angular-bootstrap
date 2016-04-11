/**=========================================================
 * Module: src/js/module/directive/widget/form-element.js
 * 表单元素指令
 * @author: haili042
 * @time: 2016年4月11日 14:38:41
 =========================================================*/

App

    // 单选框
    .directive('widgetCheckbox', function () {
        return {
            restrict: 'EC',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-checkbox.html',

            link: function (scope, elem, attr) {

                var checkboxEle = elem.find('input[type=checkbox]');

                // 表单元素必备
                ['name', 'checked'].forEach(function (k, v) {
                    if (attr[k]) {
                        checkboxEle.attr(k, attr[k]);
                        elem.removeAttr(k);
                    }
                });

            }
        };
    })

    // 开关
    .directive('widgetSwitch', function () {
        return {
            restrict: 'EC',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-switch.html',

            link: function (scope, elem, attr) {

                var checkboxEle = elem.find('input[type=checkbox]');

                // 表单元素必备
                ['name', 'checked'].forEach(function (k, v) {
                    if (attr[k]) {
                        checkboxEle.attr(k, attr[k]);
                        elem.removeAttr(k);
                    }
                });
            }
        };
    })

    // 复选框
    .directive('widgetRadio', function () {
        return {
            restrict: 'EC',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-radio.html',

            link: function (scope, elem, attr) {

                var checkboxEle = elem.find('input[type=radio]');

                // 表单元素必备
                ['name', 'checked'].forEach(function (k, v) {
                    if (attr[k]) {
                        checkboxEle.attr(k, attr[k]);
                        elem.removeAttr(k);
                    }
                });
            }
        };
    })
;