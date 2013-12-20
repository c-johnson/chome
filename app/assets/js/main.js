require.config({
  baseUrl: "public/js",
  paths: {
    "angular": "../bowerc/angular/angular"
  },
  waitSeconds: 15
});

require( ["angular", "home"],
function(home) {
  console.log('loaded all modules');
});