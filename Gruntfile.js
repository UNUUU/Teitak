module.exports = function(grunt) {
  grunt.initConfig({
      watch: {
          coffee: {
              tasks: 'coffee',
              files: ['*.coffee']
          }
      },
      coffee: {
          compile: {
              files: [{
                  expand: true,
                  cwd: '',
                  src: ['*.coffee'],
                  dest: '',
                  ext: '.js'
              }],
          }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', 'coffee');
};
