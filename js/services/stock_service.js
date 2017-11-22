sim.service('StockService', ['$http',
  function($http) {

    var _stocks;

    this.all = function() {
      if(!_stocks) {
        var endpoint = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=compact&apikey=4IFXYSZXA7LMMAGK";
        return $http.get(endpoint).then(function(response){
          _stocks = response.data;
          return _stocks
        })
      }
    }
    
}]);