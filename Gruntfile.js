module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          src: ['app/assets/css/*.scss'],
          dest: 'public/css',
          flatten: true,
          ext: '.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: "app/assets/css/*.scss",
        tasks: ["sass"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass']);
};