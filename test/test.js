/*
$stateProvider.state('home', {
    resolve: {
        //这个函数的值会被直接返回，因为它不是数据保证
        person: function () {
            return {
                name: "Ari",
                email: "ari@fullstack.io"
            }
        },
        //这个函数为数据保证, 因此它将在控制器被实例化之前载入。
        currentDetails: function ($http) {
            return $http({
                method: 'JSONP',
                url: '/current_details'
            });
        },
        //前一个数据保证也可作为依赖注入到其他数据保证中！（这个非常实用）
        facebookId: function ($http, currentDetails) {
            $http({
                method: 'GET',
                url: 'http://facebook.com/api/current_user',
                params: {
                    email: currentDetails.data.emails[0]
                }
            })
        }
    },
    //定义控制器
    controller: function ($scope, person,
                          currentDetails, facebookId) {
        $scope.person = person;
    }
})

$stateProvider
    .state('contacts.detail', {
        url: '/{contactId:[0-9]{1,4}}',
        views: {
            '' : {
                templateUrl: 'app/contacts/contacts.detail.html',
            },
            views: {
                // 模板内容会被安插在父路由(contacts)的匿名视图下
                '': {
                    template: 'default'
                },
                // 模板内容会被安插在根路由模板(index.html)的匿名视图下
                '@': {
                    template: 'hello world'
                },
                // 模板内容会被安插在父路由(contacts)模板的匿名视图下
                '@contacts': {
                    templateUrl: 'app/contacts/contacts.detail.html',
                },
                // 模板内容会被安插在根路由(index.html)模板的名为hint视图下
                'hint@': {
                    template: 'This is contacts.detail populating the "hint" ui-view'
                },
                // 模板内容会被安插在父路由(contacts)模板的名为menuTip视图下
                'menuTip@contacts': {
                    templateProvider: ['$stateParams', function($stateParams) {
                        return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                    }]
                }
            }
        }
    });
    */







