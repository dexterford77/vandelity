sim.service('StockService', ['$http', '$q', 'DateService',
  function($http, $q, DateService) {

    var _stockSymbols = ['AAPL', 'AMZN', 'DIS', 'FANG', 'GOOG', 'MSFT', 'NFLX', 'NVDA', 'TSLA', 'TWTR', 'WMT', 'XOM', 'YY'];

    var _stocks = [];

    var _stockData = {};

    var _query = function(stockSymbol) {
      var endpoint = "https://www.banana-slamma-alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="
      + stockSymbol +
      "&outputsize=compact&apikey=4IFXYSZXA7LMMAGK";
      return endpoint
    };

    var _getStock = function(stockSymbol) {
      return $http({
        method: "GET",
        url: _query(stockSymbol)
      })
    };

    this.all = function() {
      var requests = [];
      _stockSymbols.forEach(function(sym) {
        requests.push(_getStock(sym));
      })
      return $q.all(requests)
        .then(function(response){
          console.log("RESPONSE SUCCESSFUL");
          console.table(response);
          for (var i = 0; i < response.length; i++) {
            _stocks.push(response[i].data);
          }
          _processData(_stocks);
          return _stockData
        }, function(response) {
          console.log("RESPONSE FAILED");
          console.error(response);
          // fallback on hard-coded data in case of failure
          console.log("Using hard-coded fallback data...");
          _stockData = fallback_data;
          console.log(_stockData);
          return _stockData
        })
    }

    var _processData = function(stocks) {
      _stocks.forEach(function(stock){
        var sym = stock["Meta Data"]["2. Symbol"];
        var data = stock["Time Series (Daily)"];
        _stockData[sym] = {};
        for (var key in data) {
          var date = key;
          var price = data[key]["4. close"];
          _stockData[sym][date] = price;
        }
        for (var i = 0; i < 70; i++) {
          var date = DateService.getHyphenDateValue(i);
          // for missing dates, uses closing price from day before
          // (... or the day before that, or the day before that, etc.)
          if(!_stockData[sym][date]) {
            _getDateBefore(sym, date, i);
          }
        }
      });
    };

    var _getDateBefore = function(sym, date, i) {
      var dateBefore = DateService.getHyphenDateValue(i - 1);
      if (!_stockData[sym][dateBefore]) {
        // recursively calls self until it finds an extant previous date
        _getDateBefore(sym, dateBefore, i - 1);
      }
      _stockData[sym][date] = _stockData[sym][dateBefore];
    };

    this.formatStockData = function() {
      if (Object.keys(_stockData).length !== 0) {
        var date = DateService.getCurrentHyphen();
        var oneDayBefore = DateService.nDaysAgo(1);
        var sevenDaysBefore = DateService.nDaysAgo(7);
        var thirtyDaysBefore = DateService.nDaysAgo(30);
        var output = [];
        _stockSymbols.forEach(function(sym) {
          var price = _stockData[sym][date];
          output.push({ 
            symbol: sym,
            price: price,
            one: price - _stockData[sym][oneDayBefore],
            seven: price - _stockData[sym][sevenDaysBefore],
            thirty: price - _stockData[sym][thirtyDaysBefore]
          });
        })
      }
      return output
    }

    this.allSymbols = function() {
      return _stockSymbols
    }
 
}]);