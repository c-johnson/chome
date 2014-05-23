// angular.module('chome', ['ui.router'])
// .controller('FunnelCtrl', ['$scope', 'CourseService', 'ProductService', function ($scope, CourseService, ProductService) {
//   CourseService.index().then(function(data) {
//     $scope.courses = data;
//   });
//   ProductService.index().then(function(data) {
//     $scope.products = data;
//   });
// }])

// .controller('MainCtrl', function($scope, $location) {
//   $scope.$location = $location;
// })

// .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
//   $stateProvider
//     .state("funnel-0", {
//       url: "/",
//       templateUrl: "funnel/0.html"
//     })
//     .state("funnel-1", {
//       templateUrl: "funnel/1.html"
//     })
//     .state("funnel-2", {
//       templateUrl: "funnel/2.html"
//     })
//     .state("funnel-3", {
//       templateUrl: "funnel/3.html"
//     });

//   $locationProvider.html5Mode(true);
// }])

// .factory('ProductService', function($http) {
//   return {
//     index: function() {
//       return $http.get('/api/products')
//         .then(function(result) {
//           return result.data;
//         });
//     }
//   };
// })
// .factory('CourseService', function($http) {
//   return {
//     index: function() {
//       //return the promise directly.
//       return $http.get('/api/courses')
//         .then(function(result) {
//           //resolve the promise as the data
//           return result.data;
//         });
//     }
//   };
// });

// angular.element(document).on("ready page:load", function() {
//   angular.bootstrap(document, ['emc-home']);
// });