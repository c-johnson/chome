// define(["jquery"], function() {

(function() {
  var contextController = {
    // subdomain
    subd: null,

    init: function () {
      this.deconstructURL();
    },

    deconstructURL: function () {

      // fill subdomain
      var parts = window.location.hostname.split(".");
      if (parts.length === 2) {
        this.subd = "root";
      } else if (parts.length > 2) {
        this.subd = parts[0];
      }

      this.pathname = window.location.pathname;
    }
  };

  contextController.init();
  return contextController;
}());

// });