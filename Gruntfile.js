module.exports = function(grunt) {
    grunt.initConfig({
       watch: {
        files: ['src/**/*'],
        tasks: ['uglify','sass','copy'],
      },
        copy: {
            options:{
              processContentExclude:['*.gpk','*.MRK']
            },
            demo: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/audio',
                    src: ['**/*.mp3'],
                    dest: 'demo/audio',
                    flatten:true
                },{
                  expand: true,
                    cwd: 'bower_components/jquery/dist',
                    src: ['jquery.min.js','jquery.min.map'],
                    dest: 'demo/js'
                },{
                  expand: true,
                    cwd: 'bower_components/jquery-ui',
                    src: ['jquery-ui.min.js'],
                    dest: 'demo/js'
                },{
                  'demo/index.html':'src/test.html'
                }
                ]
            }
        },
        uglify: {
            all: {
                files: {
                    'demo/js/sruti.min.js': ['src/assets/js/*.js']
                }
            }
        },
        sass: {
            demo: {
              files: [{
                expand: true,
                cwd: 'src/assets/sass',
                src: ['**.scss'],
                dest: 'demo/css',
                ext:'.css'
              }]
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['copy']);
    grunt.registerTask('dev', ['copy','uglify','sass','watch']);
    
};