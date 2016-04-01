/**=========================================================
 * Module: src/js/module/service/session.js
 * session service
 * @author: haili042
 * @time: 2016年4月1日 12:43:51
 =========================================================*/

App.service('SessionService', function() {

    // 创建 session
    this.create = function (sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };

    // 注销session
    this.destroy = function() {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
});