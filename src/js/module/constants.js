/**=========================================================
 * Module: src/js/module/constants.js
 * 定义全局变量, 调用的时候注入即可
 * @author: haili042
 * @time: 2016年4月1日 12:46:17
 =========================================================*/

App

    // 登录权限事件
    .constant('APP_AUTH_EVENT', {
        'loginSuccess':           'event:auth-login-success',
        'loginFailed':            'event:auth-login-failed',
        'logoutSuccess':          'event:auth-logout-success',
        'logoutFailed':           'event:auth-logout-failed',
        'sessionTimeout':         'event:auth-session-timeout',
        'noAuth':                 'event:auth-no-auth',         // 401 没有权限
        'forbidden':              'event:auth-forbidden'        // 403 服务器拒绝
    })

    // 角色权限
    .constant('APP_USER_ROLE', {
        all:                      '*',
        admin:                    'admin',
        editor:                   'editor',
        guest:                    'guest'
    })

    // 全局颜色
    .constant('APP_COLOR', {
        'primary':                '#5d9cec',
        'success':                '#27c24c',
        'info':                   '#23b7e5',
        'warning':                '#ff902b',
        'danger':                 '#f05050',
        'inverse':                '#131e26',
        'green':                  '#37bc9b',
        'pink':                   '#f532e5',
        'purple':                 '#7266ba',
        'dark':                   '#3a3f51',
        'yellow':                 '#fad732',
        'gray-darker':            '#232735',
        'gray-dark':              '#3a3f51',
        'gray':                   '#dde6e9',
        'gray-light':             '#e4eaec',
        'gray-lighter':           '#edf1f2'
    })

    // 媒体查询
    .constant('APP_MEDIAQUERY', {
        'desktopLG':             1200,
        'desktop':                992,
        'tablet':                 768,
        'mobile':                 480
    })

    // 请求响应头设置
    .constant('APP_HEADER', {
        'max-age':                 0
    })

    // 定义依赖的模块
    .constant('APP_REQUIRE', {
        // jquery 模块
        // ...

        // angular 模块
        modules: [
        ]
    })
;

