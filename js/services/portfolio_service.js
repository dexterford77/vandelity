sim.service('PortfolioService', ['DateService', 'TradeService', 'StockService',
  function(DateService, TradeService, StockService) {

    var _date = function() {
      return DateService.getCurrentHyphen()
    };

    var _trades = TradeService.getTrades();

    var _overview = [];

    var _positions = [];

    var _getPositions = function() {
      var groupedTrades = _groupTradesBySym();
      _aggregateGroupedTrades(groupedTrades);
    };

    var _aggregateGroupedTrades = function(groupedTrades) {
      var positions = [];
      groupedTrades.forEach(function(tradeGroup) {
        var symbol = tradeGroup[0].symbol;
        var quantity = 0;
        var costBasis = 0;
        var currentVal = 0;
        var currentPrices = _findPrices(symbol);
        tradeGroup.forEach(function(trade) {
          // buy = 1, sell = -1
          var type = trade.type ? 1 : -1;
          quantity += trade.quantity * type;
          costBasis += trade.price * trade.quantity * type;
          currentVal += trade.quantity * currentPrices.price * type;
        });
        var position = {
          symbol: symbol,
          quantity: quantity,
          costBasis: costBasis,
          currentVal: currentVal,
          current: currentPrices.price,
          one: currentPrices.one,
          seven: currentPrices.seven,
          thirty: currentPrices.thirty
        }
        positions.push(position);
      });
      _positions = positions;
    };

    var _groupTradesBySym = function() {
      var groupedTrades = [];
      var syms = StockService.allSymbols();
      syms.forEach(function(sym) {
        var sameSymTrades = _findTradesOfSameSym(sym);
        if (sameSymTrades.length > 0) {
          groupedTrades.push(sameSymTrades);
        }
      });
      return groupedTrades
    };

    var _findTradesOfSameSym = function(sym) {
      return _trades.filter(function(trade) {
        return trade.symbol === sym
      })
    };

    var _filterBeforeDate = function() {
      var filtered = [];
      filtered.push(
        _trades.filter(function(trade) {
          return trade.date <= _date()
        })
      );
      return [].concat.apply([], filtered)
    };

    var _findPrices = function(sym) {
      return StockService.formatStockData().find(function(stock) {
        return stock.symbol === sym
      })
    };

    var _findPos = function(sym) {
      return _positions.find(function(position) {
        return position.symbol === sym
      })
    };

    this.findPos = function(sym) {
      _findPos(sym);
    }

    this.getPositions = function() {
      _getPositions();
      return _positions
    }

    var _getOverview = function() {
      _overview = {
        costBasis: 0,
        currentVal: 0
      }
      _positions.forEach(function(position) {
        _overview.costBasis += position.costBasis;
        _overview.currentVal += position.currentVal;
      });
    };

    this.getOverview = function() {
      _getOverview();
      return _overview
    }

}]);