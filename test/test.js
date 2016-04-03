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


var arr = [
        [0,0,8,0,0],
        [0,0,0,9,0],
        [0,7,0,0,0],
        [0,0,6,0,0]
    ],
    len1 = arr.length,
    len2 = arr[0].length,
    max = 0,
    res = 0;

function test(arr) {

    var i, len = arr.length,
        j, len2 = arr[0].length,
        min = 0;


    for (j = 0; j < len2; j++) {
        for (i = 0; i < len; i++) {

            min += arr[i][j];
        }
    }
    return '';
}

function walk(i, j) {
    if (i >= len1 || j >= len2) {
        return false;
    }

    console.log('(' + i + ', ' + j + ') =' + arr[i][j]);
    max += arr[i][j];
    if (i == len1-1 && j == len2-1) {
        console.log('total = ' + max + '\n');
        if (res < max) {
            res = max;
        }
        max = 0;
    }

    if (!arguments.callee(i+1, j)) {
        if (!arguments.callee(i, j+1)) {
            return false;
        }
    }

    return true;
}

walk(0, 0);
console.log(res);
