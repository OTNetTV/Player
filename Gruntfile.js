module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {},
      dist1: {
        src: [
            'node_modules/video.js/dist/video.js',
            'node_modules/videojs-flash/dist/videojs-flash.js',
            'node_modules/videojs-contrib-eme/dist/videojs-contrib-eme.js',
            'node_modules/videojs-contrib-ads/dist/videojs.ads.js',
            'node_modules/videojs-youtube/dist/Youtube.js', 
            'node_modules/videojs-ima/dist/videojs.ima.js',
            'src/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      dist2: {
        src: [
            'node_modules/video.js/dist/video-js.css',
            'node_modules/videojs-contrib-ads/dist/videojs.ads.css',
            'node_modules/videojs-ima/dist/videojs.ima.css',
            'src/**/*.css'
        ],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist1.dest %>']
        }
      }
    },
    cssmin: {
          dist: { 
              files: {
                  'dist/<%= pkg.name %>.min.css': ['<%= concat.dist2.dest %>']
              }
          }
    },
    qunit: {
      all: {
          options: {
            urls: [
              'http://localhost:3000/test/basic.html',
            ]
          }
        }
    },
    connect: {
        server: {
            options: {
                port: 3000,
                base: '.'
            }
        }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['src/**/*.js', 'thirdparty/*.js', 'src/**/*.css'],
      tasks: ['concat:dist1', 'concat:dist2', 'uglify', 'cssmin', 'jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat:dist1', 'concat:dist2', 'cssmin', 'uglify']);

};