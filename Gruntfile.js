module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Project configuration.
  grunt.initConfig({

    less: {
      options: {
        compress: true,
        sourceMap: false,
        plugins: [
            (new (require('less-plugin-clean-css'))({
              advanced: true,
            }))
        ],
      },
      src: {
        expand: true,
        cwd:    "./",
        src:    "*.less",
        ext:    ".css",
      }
      // waterfall: {
      //   options: {
      //     compress: true,
      //     sourceMap: false,
      //     plugins: [
      //         (new (require('less-plugin-clean-css'))({
      //           advanced: true,
      //         }))
      //     ],
      //   },
      // }
    },

    connect: {
      site1: {
        options: {
          port: 8888,
          base: './'
        }
      },
    },

    watch: {
      scripts: {
        files: ['*.less'],
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['*.html', '*.js'],
        options: {
          livereload: true,
        },
      },
    },

  });

  grunt.registerTask('default', ['less', 'connect', 'watch']);
};