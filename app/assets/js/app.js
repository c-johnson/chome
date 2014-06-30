define([
  'jquery',
  'angular',
  'ui-router'
], function($, angular) {
  angular.module('chome', ['ui.router'])
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    // $stateProvider
    //   .state("state-0", {
    //     url: "/s0",
    //     template: "State 0 !!!"
    //     // templateUrl: "funnel/0.html"
    //   })
    //   .state("state-1", {
    //     url: "/s1",
    //     template: "State 1 ?!?"
    //     // templateUrl: "funnel/1.html"
    //   })
    // $locationProvider.html5Mode(true);
  }])

  /* Implement basic keyboard switching functionality */
  // $(document).on('keydown', function (evt) {
  //   var root = "http://localhost:9000";
  //   if (evt.which == 37) {
  //     window.location.assign(root + "/links");
  //   } else if (evt.which == 39) {
  //     window.location.assign(root + "/home");
  //   }
  // });

  /* ??? */
  // $sidebar = 0;
  // $('#toggleSidebar').click(function() {
  //   if ($sidebar === 1) {
  //     $('#sidebar').hide();
  //     $('#toggleSidebar i').addClass('icon-chevron-left');
  //     $('#toggleSidebar i').removeClass('icon-chevron-right');
  //     $sidebar = 0;
  //   }
  //   else {
  //     $('#sidebar').show();
  //     $('#toggleSidebar i').addClass('icon-chevron-right');
  //     $('#toggleSidebar i').removeClass('icon-chevron-left');
  //     $sidebar = 1;
  //   }

  //   return false;
  // });

  /* localstorge */
  if (Modernizr.localstorage) {
    
  }

});



/* 


*/