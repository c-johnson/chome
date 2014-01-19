module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          includePaths: [
            "public/bowerc",
            "app/assets/style"
          ]
        },
        files: [{
          expand: true,
          src: ['app/assets/style/**/*.scss'],
          dest: 'public/css',
          flatten: true,
          ext: '.css'
        }]
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['app/assets/js/**/*.js'],
            dest: 'public/js',
            flatten: true,
            ext: '.js'
          },
          {
            expand: true,
            src: ['app/assets/img/**/*'],
            dest: 'public/img',
            flatten: true
          },
        ]
      }
    },

    watch: {
      scripts: {
        files: ["app/assets/**/*"],
        tasks: ["default"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['sass', 'copy']);
};