/**=========================================================
 * Module: src/js/module/controller/example/select-ctrl.js
 * select 控制器
 * @author: haili042
 * @time: 2016年4月13日 16:48:27
 =========================================================*/

App
    .controller('SelectCtrl', ['$http', '$scope', '$state', '$rootScope',
        function ($http, $scope, $state, $rootScope) {

            $scope.config1 = {
                url: '/test/data/select.json',
                //data: $scope.data
                onSelect: function(index, selected, data) {
                    console.log($scope.config1.selectedItems);
                }
            };


            $scope.seleted = '';
            $scope.animals = [
                {
                    id: '00001',
                    name: '猫',
                    sex: '雌',
                    food: '鱼',
                    favor: '玩球'
                },
                {
                    id: '00002',
                    name: '狗',
                    sex: '雄',
                    food: '骨头',
                    favor: '接盘子'
                },
                {
                    id: '00003',
                    name: '兔',
                    sex: '雌',
                    food: '胡萝卜',
                    favor: '刨洞'
                },
                {
                    id: '00004',
                    name: '狮',
                    sex: '雄',
                    food: '肉',
                    favor: '猎物'
                }
            ];

        }])
;
