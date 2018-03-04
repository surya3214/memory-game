module.exports = function (grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'build/index.html': 'src/jade/index.jade'
        }
      }
    },
    watch: {
      grunt: {
        files: ['gruntfile.js']
      },
      jade: {
        files: 'src/jade/**.jade',
        tasks: ['jade']
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('build', 'Convert Jade templates into html', ['jade'])
}