sim.service('DateService', [
  function() {

    var _dates = [];

    var _currentDate = "10/1/2017";

    this.all = function() {
      for (var i = 1; i <= 31; i++) {
        _dates.push(new Date(2017, 9, i).toLocaleDateString());
      }
      return _dates
    }

    this.getCurrentDate = function() {
      return _currentDate
    }

    this.setCurrentDate = function(value) {
      _currentDate = value;
    }

}]);