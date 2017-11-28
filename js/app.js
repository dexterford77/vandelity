var sim = angular.module("sim", ['ui.router', 'ui.bootstrap', 'rzModule']);

sim.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/portfolio');
  $stateProvider.state("portfolio", {
    url: "/portfolio",
    templateUrl: "js/templates/portfolio.html"
  }).state("trade", {
    url: "/trade",
    templateUrl: "js/templates/trade.html",
    params: { // default params
      date: "2017-10-01",
      symbol: "MSFT",
      price: "49.44"
    }
  }).state("transactions", {
    url: "/transactions",
    templateUrl: "js/templates/transactions.html"
  });
});

// This is for error handling!
// It sets an event listener on the root scope & it outputs whatever loggable errors are happening when an error in ui-router states occurs
sim.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});