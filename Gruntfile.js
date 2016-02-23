module.exports = function(grunt) {



  // Project configuration.
  grunt.initConfig({

    clean: {
     // Clean directories before building
      build: [
        'dest/**',
      ]
    },

    less: {
      options: {
        compress: true,
        yuicompress: true,
        optimization: 0,
        sourceMap: false,
        plugins: [
            (new (require('less-plugin-clean-css'))({
              advanced: true,
            }))
        ],
      },
      src: {
        expand: true,
        cwd: 'src/',
        src: '**/*.less',
        dest: 'dest',
        ext: '.css',
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
          base: './dest'
        }
      },
    },

    watch: {
      less: {
        files: 'src/**/*.less',
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: 'src/**/*.html',
        tasks: ['copy:html'],
        options: {
          livereload: true,
        },
      },
      javascript: {
        files: 'src/**/*.js',
        tasks: ['copy:javascript'],
        options: {
          livereload: true,
        },
      },

    },

    copy: {
      'html': {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.html',
            dest: 'dest',
          },
        ],
      },
      javascript: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.js',
            dest: 'dest',
          },
        ],
      },

    }
  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'less',
    'connect',
    'watch'
  ]);
};
