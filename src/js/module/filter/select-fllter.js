/**=========================================================
 * Module: src/js/module/directive/filter/select-filter.js
 * select 过滤器, 用来格式化所选项的格式
 * @author: haili042
 * @time: 2016年4月15日 12:51:23
 =========================================================*/

App
    .filter('selectFilter', function() {

        // 该函数的参数以 selectFilter:arg1:arg2 的形式接收
        return function(input, textField) {
            input = input || {};
            var output = '',
                len = input.length || 0;

            for (var k in input) {
                if (input.hasOwnProperty(k) && k !== 'length') {
                    if (len-- > 1) {
                        output += (input[k][textField] || '') + ',';
                    } else {
                        output += (input[k][textField] || '');
                    }
                }
            }

            return output;
        };
    });