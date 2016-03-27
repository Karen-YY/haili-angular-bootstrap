/**=========================================================
 * constant.js
 * 定义全局变量, 调用的时候注入即可
 * @author: haili042
 =========================================================*/

App
    // 全局颜色
    .constant('APP_COLORS', {
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

    // 定义依赖的模块
    .constant('APP_REQUIRES', {
        // jquery 模块
        // ...

        // angular 模块
        modules: [
        ]

    })
;

