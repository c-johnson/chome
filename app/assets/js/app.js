define(['jquery', 'angular'], function($, ng) {

  debugger

  $(document).on('keydown', function (evt) {
    var root = "http://localhost:9000";
    if (evt.which == 37) {
      window.location.assign(root + "/links");
    } else if (evt.which == 39) {
      window.location.assign(root + "/home");
    }
  });
});