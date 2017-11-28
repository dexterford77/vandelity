sim.controller("PortfolioCtrl", ['$scope', 'TradeService', 'DateService', 'PortfolioService',
  function($scope, TradeService, DateService, PortfolioService) {

    $scope.trades = TradeService.getTrades();

    $scope.date = DateService.getCurrentSlash();

    $scope.positions = PortfolioService.getPositions();

    $scope.overview = PortfolioService.getOverview();

    $scope.$on('change.date', function() {
      $scope.trades = TradeService.getTrades();
      $scope.date = DateService.getCurrentHyphen();
      $scope.positions = PortfolioService.getPositions();
      $scope.overview = PortfolioServie.getOverview();
    });

}]);