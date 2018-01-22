sim.controller("TradeCtrl", ['$scope', 'StockService', 'TradeService', '$stateParams', '$state', 'PortfolioService',
  function($scope, StockService, TradeService, $stateParams, $state, PortfolioService) {

    var _stocks = StockService.formatStockData();

    // convert params into newTrade
    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol,
      quantity: 10,
      type: true
    };

    $scope.cash = TradeService.getCash();

    $scope.cost = function() {
      return !isNaN($scope.newTrade.quantity) ? ($scope.newTrade.quantity * $scope.newTrade.price) : '--'
    };

    $scope.orderStatus = function() {
      if ($scope.newTrade.type) {
        // if buying: make sure cash can cover trade
        return $scope.cost() < $scope.cash ? true : false
      } else {
        // if selling, check # of shares at current date (should be above 0 and/or amount of share's you're wanting to sell)
        PortfolioService.getPositions();
        var position = PortfolioService.findPos($scope.newTrade.symbol);
        return position && (position.quantity >= $scope.newTrade.quantity) ? true : false
      }
    };

    $scope.submitTrade = function() {
      // validate + store in Trade service
      if($scope.orderStatus()) {
        TradeService.save($scope.newTrade);
        $state.go('transactions');
      }
    }

}]);