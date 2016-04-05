/**=========================================================
 * Module: src/js/module/service/session.js
 * session service
 * @author: haili042
 * @time: 2016年4月1日 12:43:51
 =========================================================*/

App.factory('sessionService', function() {

    'use strict';
    var id,
        userId,
        userRole;
    
    // 创建 session
    function createSession(sid, uid, ur) {
        id = sid;
        userId = uid;
        userRole = ur;
    }

    // 注销session
    function destroySession() {
        id = null;
        userId = null;
        userRole = null;
    }

    // 获取session
    function getSession() {
        return {
            id: id,
            userId: userId,
            userRole: userRole
        };
    }
    
    return {
        createSession: createSession,
        destroySession: destroySession,
        getSession: getSession
    };
})
;