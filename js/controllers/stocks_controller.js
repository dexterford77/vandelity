sim.controller("StocksCtrl", ['$scope', 'StockService', 'DateService',
  function($scope, StockService, DateService) {

    $scope.init = function() {
      $scope.getStocks();
    };

    $scope.loading = true;

    $scope.getStocks = function() {
      StockService.all().then(function(stockData){
        $scope.tableData = StockService.formatStockData();
        $scope.loading = false;
      });
    };

    $scope.symbolFilterValue = false;

    $scope.changeSymbolFilter = function() {
      $scope.symbolFilterValue = !($scope.symbolFilterValue);
    };

    $scope.$on('change.date', function() {
      $scope.date = DateService.getCurrentSlash();
      $scope.tableData = StockService.formatStockData();
    });

}]);
