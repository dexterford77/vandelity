sim.service('TradeService', [
  function() {

    var _trades = [];

    var _cash = 1000000;

    this.save = function(newTrade) {
      _trades.push(newTrade);
      _registerTrade(newTrade);
    }

    var _registerTrade = function(trade) {
      var amount = trade.quantity * trade.price;
      if(trade.type) { // buy
        _cash -= amount;
      } else { // sell
        _cash += amount;
      }
    };

    this.getCash = function() {
      return _cash
    }

    this.getTrades = function() {
      return _trades
    }

}]);