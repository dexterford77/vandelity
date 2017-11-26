sim.directive("stockTableRow", [function(){
  return {
    restrict: 'A',
    scope: {
          stock: "=",
          date: "="
    },
    templateUrl: "js/templates/stock_table_row.html"
  }
}]);