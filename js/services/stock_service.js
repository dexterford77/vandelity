sim.service('StockService', ['$http',
  function($http) {

    var _stocks;

    this.all = function() {
      if(!_stocks) {
        var endpoint = "data/stock_data.json";
        return $http.get(endpoint).then(function(response){
          _stocks = response.data;
          _stocks = reformat_stocks(_stocks);
          _stocks = add_missing_october_dates(_stocks);
          return _stocks
        })
      } else {
        return new Promise(function(resolve){ resolve(_stocks) })
      }
    }

    var reformat_stocks = function(stocks) {
      var reformatted_stocks = {};
      stocks = stocks["Time Series (Daily)"];
      for (var key in stocks) {
        reformatted_stocks[key] = {
          "price": stocks[key]["4. close"]
        }
      }
      return reformatted_stocks
    };

    var add_missing_october_dates = function(stocks) {
      for (var i = 1; i <= 31; i++) {
        if (i < 10) {
          var date_to_check = "2017-10-0" + i
        } else {
          var date_to_check = "2017-10-" + i
        }
        if (!stocks[date_to_check]) {
          stocks[date_to_check] = {
            "price": fake_price_data(stocks, date_to_check)
          }
        }
      } 
      return stocks
    };

    var fake_price_data = function(stocks, date) {
      if (date === "2017-10-01") {
        return stocks["2017-09-29"]["price"]
      } else {
        var previous_day = Number(date.split("-")[2]) - 1;
        if (previous_day < 10) {
          previous_day = "0" + previous_day.toString();
        } else {
          previous_day = previous_day.toString();
        }
        return stocks["2017-10-" + previous_day]["price"]
      }
    }

}]);