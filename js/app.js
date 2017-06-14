var sim = angular.module("sim", ['ui.router', 'ui.bootstrap']);

sim.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/portfolio');
  $stateProvider.state("portfolio", {
    url: "/portfolio",
    templateUrl: "js/partials/portfolio.html"
  }).state("trade", {
    url: "/trade",
    templateUrl: "js/partials/trade.html"
  }).state("transactions", {
    url: "/transactions",
    templateUrl: "js/partials/transactions.html"
  });
});

// This is for error handling!
// It sets an event listener on the root scope & it outputs whatever loggable errors are happening when an error in ui-router states occurs
sim.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});