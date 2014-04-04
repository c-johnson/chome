/**
* bootstraps angular onto the window.document node
*/
define([
  'require',
  'angular',
  'app',
  'subnav',
  'home',
  'underscore',
  'foundation',
  'fo-topbar',
  'ng-router'
], function (require, ng, app) {
  'use strict';

  require(['domReady!'], function (document) {
    $(document).foundation();
    ng.bootstrap(document, ['app']);
    console.log('loaded all modules');
  });
});