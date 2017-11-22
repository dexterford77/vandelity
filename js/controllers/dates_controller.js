sim.controller("DatesCtrl", ['$scope', 'DateService',
  function($scope, DateService) {

    $scope.dates = ["10/1/2017", "10/31/2017"];

    $scope.init = function() {
      $scope.getDates();
      $scope.refreshSlider();
    };

    $scope.getDates = function() {
      $scope.dates = DateService.all();
    };

    $scope.refreshSlider = function() {
      $scope.slider.value = $scope.dates[0];
      $scope.slider.options.stepsArray = $scope.dates;
    };

    $scope.$watch('slider.value', function(newValue){
      DateService.setCurrentDate(newValue);
    });

    $scope.slider = {
      value: $scope.dates[0],
      options: {
        stepsArray: $scope.dates
      }
    };

}]);