sim.controller("StocksCtrl", ['$scope', 'StockService', 'DateService',
  function($scope, StockService, DateService) {

    $scope.init = function() {
      $scope.getStocks();
    };

    $scope.getStocks = function() {
      StockService.all().then(function(stocks){
        $scope.stocks = stocks;
        $scope.thisStock = stocks["2017-10-01"]["price"];
      });
    };

    $scope.$watch(function() {return DateService.getCurrentDate()}, function(newValue) {
      $scope.currentDate = newValue;
      reformatCurrentDate();
    });

    var reformatCurrentDate = function() {
      var arr = $scope.currentDate.split("/");
      if (arr[1].length === 1) {
        arr[1] = "0" + arr[1];
      }
      $scope.reformattedCurrentDate = arr[2] + "-" + arr[0] + "-" + arr[1];
      if ($scope.stocks) {
        $scope.thisStock = $scope.stocks[$scope.reformattedCurrentDate]["price"];
      }
    };

}]);
