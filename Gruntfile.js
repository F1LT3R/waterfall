module.exports = function(grunt) {

  var app = {
    dest: 'gh-pages',
    dist: 'dist',
    src: 'src',
  };

  // Project configuration.
  grunt.initConfig({

    clean: {
     // Clean directories before building
      build: [
        app.dest + '/**',
        app.dist + '/**',
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
      pages: {
          expand: true,
          cwd: app.src + '/',
          src: '**/*.less',
          dest: app.dest,
          ext: '.css',
      },
      distribute: {
          expand: true,
          cwd: app.src + '/core/',
          src: '**/*.less',
          dest: app.dist,
          ext: '.css',
      },
    },

    connect: {
      site1: {
        options: {
          port: 8888,
          base: app.dest
        }
      },
    },

    watch: {
      less: {
        files: app.src + '/**/*.less',
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: app.src + '/**/*.html',
        tasks: ['copy:html'],
        options: {
          livereload: true,
        },
      },
      javascript: {
        files: app.src + '/**/*.js',
        tasks: [
          'copy:javascript-pages',
          'copy:javascript-distribute',
        ],
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
            cwd: app.src + '/',
            src: '**/*.html',
            dest: app.dest,
          },
        ],
      },
      'javascript-pages': {
        files: [
          {
            expand: true,
            cwd: app.src + '/',
            src: '**/*.js',
            dest: app.dest,
          },
        ],
      },
      'javascript-distribute': {
        files: [
          {
            expand: true,
            cwd: app.src + '/',
            src: '**/*.js',
            dest: app.dist,
            flatten: true,
            filter: 'isFile',
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

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
  ]);

  grunt.registerTask('dev', [
    'connect',
    'watch',
  ]);

  grunt.registerTask('default', 'build');

};
