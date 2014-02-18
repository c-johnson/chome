var C = C || {};

require.config({
  shim: {
    'foundation': {
      deps: ['jquery', 'modernizr'],
      exports: 'Foundation'
    },
    'fo-topbar': {
      deps: ['foundation'],
      exports: 'FO-Topbar'
    }
  },
  baseUrl: "public/js",
  paths: {
    "angular": "../bowerc/angular/angular",
    "jquery": "../bowerc/jquery/jquery",
    "modernizr": "../bowerc/modernizr/modernizr",
    "foundation": "../bowerc/foundation/js/foundation",
    "fo-topbar": "../bowerc/foundation/js/foundation/foundation.topbar"
  },
  waitSeconds: 15
});

require( ["subnav", "angular", "home", "foundation", "fo-topbar"],
function(subnav) {
  $(document).foundation();
  console.log('loaded all modules');

  $(document).keydown(function(e){
    if (e.keyCode == 37) {
      // return false;
    }
  });
});