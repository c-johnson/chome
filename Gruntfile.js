module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      compile: {
        files: {
          'public/css/home.css': 'app/assets/css/home.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass']);
}