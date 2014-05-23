/**
* bootstraps angular onto the window.document node
*/

define([
  'require',
  'angular',
  'app',
  'foundation',
  'fo-topbar'
], function (require, angular) {
  'use strict';

  require(['domReady!'], function (document) {

    $(document).foundation();

    angular.bootstrap(document, ['chome']);
  });
});