sim.controller("DatesCtrl", ['$scope', 'DateService', '$rootScope',
  function($scope, DateService, $rootScope) {

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
      DateService.setDate(newValue);
      $rootScope.$broadcast('change.date');
    });

    $scope.slider = {
      value: $scope.dates[0],
      options: {
        stepsArray: $scope.dates
      }
    };

}]);