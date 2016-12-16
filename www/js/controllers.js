angular.module('starter.controllers', []).controller('tabCtrl', function($scope) {}).controller('ListCtrl', function($scope, $state, todoService, $location) {
    $scope.showData = function() {
        todoService.getAll().success(function(data) {
            $scope.datatodos = data.tasks;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    $scope.reload = function() {
        $state.go('tab.list');
    };
    $scope.delete = function(datatodo) {
        todoService.delete(datatodo.taskId);
        $scope.datatodos.splice($scope.datatodos.indexOf(datatodo), 1);
    };
    $scope.navigate = function(taskId){
        $location.path("/tab/detail/" + taskId);
    };
}).controller('AddCtrl', function($scope, $ionicPopup, todoService) {
    $scope.showAlert = function(msg) {
        $ionicPopup.alert({
            title: msg.title,
            template: msg.message,
            okText: 'Ok',
            okType: 'button-positive'
        });
    };
    $scope.datatodo = {};
    $scope.save = function() {
        if (!$scope.datatodo.name) {
            $scope.showAlert({
                title: "Information",
                message: "Name is required"
            });
        } else if (!$scope.datatodo.description) {
            $scope.showAlert({
                title: "Information",
                message: "Description is required"
            });
        } else {
            todoService.create({
                name: $scope.datatodo.name,
                description: $scope.datatodo.description
            }).then(function(data) {
                $scope.showAlert({
                    title: "Information",
                    message: "Successfully recorded"
                });
                $scope.datatodo.name = "";
                $scope.datatodo.description = "";
            });
        }
    };
}).controller('DetailCtrl', function($scope, $stateParams, $ionicPopup, $ionicModal, $state, todoService) {
    $scope.showDataId = function() {
        todoService.getId($stateParams.taskId).success(function(datatodo) {
            $scope.datatodo = datatodo.task;
        });
    };
    $scope.showDataId();
    $scope.back = function() {
        $state.go('tab.list');
    };
    $ionicModal.fromTemplateUrl('edit.html', function(modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });
    $scope.showAlert = function(msg) {
        $ionicPopup.alert({
            title: msg.title,
            template: msg.message,
            okText: 'Ok',
            okType: 'button-positive'
        });
    };
    $scope.editModal = function() {
        $scope.taskModal.show();
    };
    $scope.cancel = function() {
        $scope.taskModal.hide();
        $scope.showDataId();
    };
    $scope.edit = function(taskId, name, description) {
        if (!taskId) {
            $scope.showAlert({
                title: "Information",
                message: "Id is required"
            });
        } else if (!name) {
            $scope.showAlert({
                title: "Information",
                message: "Name is required"
            });
        } else if (!description) {
            $scope.showAlert({
                title: "Information",
                message: "Description is required"
            });
        } else {
            $scope.taskId = taskId;
            $scope.name = name;
            $scope.description = description;
            todoService.update({
                'taskId': taskId,
                'name': name,
                'description': description
            }).then(function(resp) {
                console.log('Success', resp);
                $scope.showAlert({
                    title: "Information",
                    message: "Successfully updated"
                });
                $scope.taskModal.hide();
            }, function(err) {
                console.error('Error', err);
            });
        }
    };
});