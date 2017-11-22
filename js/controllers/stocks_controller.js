sim.controller("StocksCtrl", ['$scope', 'StockService', 'DateService',
  function($scope, StockService, DateService) {

    $scope.init = function() {
      $scope.getStocks();
    };

    $scope.getStocks = function() {
      StockService.all().then(function(stocks){
        $scope.stocks = stocks;
      });
    };

    $scope.$watch(function() {return DateService.getCurrentDate()}, function(newValue) {
      $scope.currentDate = newValue;
      $scope.reformatCurrentDate();
    });

    $scope.reformatCurrentDate = function() {
      var arr = $scope.currentDate.split("/");
      if (arr[1].length === 1) {
        arr[1] = "0" + arr[1];
      }
      $scope.reformattedCurrentDate = arr[2] + "-" + arr[0] + "-" + arr[1];
    };

    $scope.$watch('reformattedCurrentDate', function() {
      $scope.thisStock = $scope.stocks["Time Series (Daily)"][$scope.reformattedCurrentDate]["4. close"];
    });

}]);