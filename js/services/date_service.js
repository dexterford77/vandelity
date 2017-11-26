sim.service('DateService', [
  function() {

    var _dates = [];

    var _date = "10/1/2017";

    this.all = function() {
      for (var i = 1; i <= 31; i++) {
        _dates.push(new Date(2017, 9, i).toLocaleDateString());
      }
      return _dates
    }

    this.setDate = function(value) {
      _date = value;
    }

    this.getCurrentHyphen = function() {
      var arr = _date.split("/");
      if (arr[1].length === 1) {
        arr[1] = "0" + arr[1];
      }
      return arr[2] + "-" + arr[0] + "-" + arr[1]
    }

    this.getCurrentSlash = function() {
      return _date
    }

    this.getHyphenDateValue = function(days) {
      var date = moment("2017-08-27").add(days, 'days').toDate();
      return date.toISOString().slice(0, 10)
    }

    this.nDaysAgo = function(n) {
      var output = moment(this.getCurrentHyphen()).add(-n, 'days').toDate();
      return output.toISOString().slice(0, 10)
    }

}]);