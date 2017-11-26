sim.controller("StocksCtrl", ['$scope', 'StockService', 'DateService',
  function($scope, StockService, DateService) {

    $scope.init = function() {
      $scope.getStocks();
    };

    $scope.getStocks = function() {
      StockService.all().then(function(stocks){
        $scope.tableData = StockService.formatStockData();
      });
    };

    $scope.$on('change.date', function() {
      $scope.date = DateService.getCurrentSlash();
      $scope.tableData = StockService.formatStockData();
    });

}]);
