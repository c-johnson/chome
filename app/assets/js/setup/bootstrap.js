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
  'ui-router'
], function (require, ng, app) {
  'use strict';

  require(['domReady!'], function (document) {
    $(document).foundation();
    ng.bootstrap(document, ['app']);
  });
});