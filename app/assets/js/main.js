require.config({
  shim: {
    'foundation': {
      deps: ['jquery', 'modernizr'],
      exports: 'Foundation'
    }
  },
  baseUrl: "public/js",
  paths: {
    "angular": "../bowerc/angular/angular",
    "jquery": "../bowerc/jquery/jquery",
    "modernizr": "../bowerc/modernizr/modernizr",
    "foundation": "../bowerc/foundation/js/foundation"
  },
  waitSeconds: 15
});

require( ["angular", "home", "foundation"],
function(home) {
  $(document).foundation();
  console.log('loaded all modules');
});