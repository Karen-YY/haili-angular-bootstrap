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
            restrict: 'EA',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-checkbox.html',

            link: function ($scope, $elem, $attr) {

                //var checkboxEle = $elem.find('input[type=checkbox]');
                //
                //// 表单元素必备
                //['name', 'checked'].forEach(function (k, v) {
                //    if ($attr[k]) {
                //        checkboxEle.attr(k, $attr[k]);
                //        $elem.removeAttr(k);
                //    }
                //});

                //checkboxEle.on('click', function (e) {
                //    e.stopPropagation();
                //
                //    $scope.checked = !$scope.checked;
                //    $scope.$emit('widget-checkbox:checked', $scope.checked);
                //});

                $elem.on('change', function (e) {

                    $scope.$apply(function () {
                        $scope.checked = !$scope.checked;

                    });
                });

                //$scope.$on('widget-checkbox:checking', function(event, data) {
                //    $scope.checked = data;
                //});
                //
                //$scope.$watch('checked', function (oldVal, newVal) {
                //    //console.log(oldVal + ', ' + newVal);
                //    $scope.$emit('widget-checkbox:checked', $scope.checked);
                //
                //});
            }
        };
    })

    // 开关
    .directive('widgetSwitch', function () {
        return {
            restrict: 'EA',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-switch.html',

            link: function ($scope, $elem, $attr) {

                var checkboxEle = $elem.find('input[type=checkbox]');

                // 表单元素必备
                ['name', 'checked'].forEach(function (k, v) {
                    if ($attr[k]) {
                        checkboxEle.attr(k, $attr[k]);
                        $elem.removeAttr(k);
                    }
                });

            }
        };
    })

    // 复选框
    .directive('widgetRadio', function () {
        return {
            restrict: 'EA',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-radio.html',

            link: function ($scope, $elem, $attr) {

                var checkboxEle = $elem.find('input[type=radio]');

                // 表单元素必备
                ['name', 'checked'].forEach(function (k, v) {
                    if ($attr[k]) {
                        checkboxEle.attr(k, $attr[k]);
                        $elem.removeAttr(k);
                    }
                });
            }
        };
    })
;