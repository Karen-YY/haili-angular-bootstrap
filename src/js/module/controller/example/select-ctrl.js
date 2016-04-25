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
                textField: 'text',
                valueField: 'text',
                multiple: true,
                editable: true,
                //data: [
                //    {
                //        "id": 1,
                //        "text": "Java",
                //        "desc": "Write once, run anywhere"
                //    },
                //    {
                //        "id": 2,
                //        "text": "C#",
                //        "desc": "One of the programming languages designed for the Common Language Infrastructure"
                //    },
                //    {
                //        "id": 3,
                //        "text": "Ruby",
                //        "selected": true,
                //        "desc": "A dynamic, reflective, general-purpose object-oriented programming language"
                //    },
                //    {
                //        "id": 4,
                //        "text": "Perl",
                //        "desc": "A high-level, general-purpose, interpreted, dynamic programming language"
                //    },
                //    {
                //        "id": 5,
                //        "text": "Basic",
                //        "desc": "A family of general-purpose, high-level programming languages"
                //    }
                //],
                onSelect: function(item) {
                    var c = this.getSelectedItems();
                    var v = this.getValue();
                    console.log(v);
                    console.log(c);
                },
                onUnSelect: function(item) {
                    var c = this.getSelectedItems();
                    console.log(item);
                }
                //onUnSelect: function(index, data) {
                //    var c = this.getSelectedItems();
                //    console.log(c);
                //}
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
