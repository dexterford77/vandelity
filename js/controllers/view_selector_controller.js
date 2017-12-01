sim.controller("ViewSelectorCtrl", ['$scope', '$state',
  function($scope, $state) {

    $scope.views = [
      {label: 'Portfolio', value: 'portfolio'},
      {label: 'Transactions', value: 'transactions'}
    ];

    $scope.view = $state.current.name;

    $scope.changeView = function() {
      $state.go($scope.view);
    };

}]);