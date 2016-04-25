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
                flag = false;

            for (var i = 0, len = input.length; i < len; i++) {
                if (input[i].selected) {
                    if (flag) {
                        output += ',';
                    }
                    flag = true;
                    output += (input[i][textField] || '');
                }
            }

            return output;
        };
    });