module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Project configuration.
  grunt.initConfig({

    less: {
      development: {
        files: {
          "waterfall.css": "waterfall.less"
        }
      },
    },

    connect: {
      site1: {
        options: {
          port: 8888,
          base: './'
        }
      }
    },

    watch: {
      scripts: {
        files: ['waterfall.less'],
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['index.html'],
        options: {
          livereload: true,
        },
      },
    },

  });

  grunt.registerTask('default', ['less', 'connect', 'watch']);
};