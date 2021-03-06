/**
 * Gruntfile for building a single-file ES5 library from TypeScript
 * 1.5 source.
 */
module.exports = function(grunt) {

  var SOURCE_FILES = [
    'src/ts/**/*.ts'
  ]

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * 1 - Transpile all TypeScript sources to ES6.
     */
    ts: {
      lib: {
        src: SOURCE_FILES,
        outDir: '_build/es6',
        options: {
          target: 'es6',
          comments: true,
          declaration: true
        }
      }
    },

    /**
     * 2 - Transpile the ES6 sources to ES5.
     */
    babel: {
      lib: {
        options: {
          sourceMap: true
        },
        files: [
          { expand: true, cwd: '_build/es6', src: ['**/*.js'], dest: '_build/es5' }
        ]
      }
    },

    /**
     * Copy the lib and sourceMap into the dist/ folder.
     */
    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, cwd: '_build/es5/', src: 'index.js*', dest: 'dist/' },
          { expand: true, flatten: true, cwd: '_build/es6/', src: 'index.d.ts', dest: 'dist/' }
        ]
      }
    },

    watch: {
      lib: {
        files: SOURCE_FILES,
        tasks: ['lib']
      }
    },

    clean: {
      lib: {
        files: '_build'
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-ts-1.5')

  grunt.registerTask('lib', [
    'ts', 'babel'
  ])

  grunt.registerTask('dist', [
    'lib', 'copy:dist'
  ])

  grunt.registerTask('default', [
    'lib'
  ])
}
