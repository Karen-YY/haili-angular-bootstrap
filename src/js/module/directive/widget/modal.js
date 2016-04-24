/**=========================================================
 * Module: src/js/module/directive/widget/modal.js
 * modal 指令
 * @author: haili042
 * @time: 2016年4月20日 15:09:29
 =========================================================*/

App

    // 复选框
    .directive('widgetModal', ['widgetService', function (widgetService) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },
            replace: true,
            transclude: true,
            template:
            '<div class="modal">' +
            '   <div class="modal-dialog">' +
            '       <div class="modal-content">' +
            '           <div class="modal-header">' +
            '               <button type="button" class="close" ng-click="close()">' +
            '                   <span>&times;</span>' +
            '               </button>' +
            '               <h4 class="modal-title">{{config.title}}</h4>' +
            '           </div>' +
            '           <div ng-transclude></div>' +
            '       </div>' +
            '   </div>' +
            '</div>',
            link: function ($scope, $elem, $attr) {

                /* <-------------- 初始化 -------------- */
                // 整个程序每次只能弹一个模态框,
                // 因此模态框放在 layout 中,
                // 每次调用则插入dom节点如其中
                var modalBaseElem = angular.element('#modal-base');
                modalBaseElem.append($elem);
                $elem.hide();
                /* -------------- end 初始化 --------------> */


                /* <-------------- 事件绑定 -------------- */
                // 打开
                $scope.open = function() {
                    // modal插入base modal 中
                    $elem.show();
                    modalBaseElem.show();
                };

                // 关闭
                $scope.close = function() {
                    // 情况清空旧的
                    $elem.hide();
                    modalBaseElem.hide();
                };
                /* -------------- end 事件绑定 --------------> */


                /* -------------- 双向绑定 --------------> */
                $scope.config.open = $scope.open;
                $scope.config.close = $scope.close;
                /* -------------- end 双向绑定 --------------> */

            }
        };
    }])

;