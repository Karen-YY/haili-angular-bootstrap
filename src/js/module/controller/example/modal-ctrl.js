/**=========================================================
 * Module: src/js/module/controller/example/modal-ctrl.js
 * modal 控制器
 * @author: haili042
 * @time: 2016年4月20日 15:56:15
 =========================================================*/

App
    .controller('ModalCtrl', ['$http', '$scope', '$state', '$rootScope',
    function ($http, $scope, $state, $rootScope) {

        $scope.config1 = {
            title: 'test modal1111111111111',
            style: {
                width: 600,
                height: 800
            }
        };

        $scope.config2 = {
            title: 'test modal22222222',
            style: {
                width: 800,
                height: 600
            }
        };

        $scope.openDialog = function(dialog) {
            dialog.open();
        };

        $scope.closeDialog = function(dialog) {
            dialog.close();
        };


    }])
;
