sim.controller("TransactionsCtrl", ['$scope', 'TradeService',
  function($scope, TradeService) {

    $scope.transactions = TradeService.getTrades();

    $scope.changeSort = function(col) {
      $scope.sortType = col;
      $scope.sortValue = !$scope.sortValue;
    };

    $scope.sortDisplay = function(col) {
      if ($scope.sortType === col) {
        return $scope.sortValue ? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom"
      }
    };

}]);