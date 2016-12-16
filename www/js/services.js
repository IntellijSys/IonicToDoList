angular.module('starter.services', []).factory('todoService', function($http) {
    var baseUrl = 'http://demo.revivalx.com/todolist-api/';
    return {
        getAll: function() {
            return $http.get(baseUrl + 'get_all_tasks.php');
        },
        getId: function(taskId) {
            return $http.get(baseUrl + 'get_task_details.php?taskId=' + taskId);
        },
        create: function(datatodo) {
            body = 'name=' + datatodo.name + '&description=' + datatodo.description;
            return $http.post(baseUrl + 'create_task.php', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function(datatodo) {
            body = 'name=' + datatodo.name + '&description=' + datatodo.description + '&taskId=' + datatodo.taskId;
            return $http.post(baseUrl + 'update_task.php', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function(taskId) {
            return $http.get(baseUrl + 'delete_task.php?id=' + taskId);
        }
    };
});