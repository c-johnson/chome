module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          includePaths: [
            "public/bowerc"
          ]
        },
        files: [{
          expand: true,
          src: ['app/assets/css/**/*.scss'],
          dest: 'public/css',
          flatten: true,
          ext: '.css'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          src: ['app/assets/js/**/*.js'],
          dest: 'public/js',
          flatten: true,
          ext: '.js'
        }]
      }
    },

    watch: {
      scripts: {
        files: "app/assets/css/*.scss",
        tasks: ["default"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['sass', 'copy']);
};