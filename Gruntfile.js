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
                    cwd: 'src/assets/fonts',
                    src: ['**/*'],
                    dest: 'demo/fonts',
                    flatten:true
                }
                ,{
                    expand: true,
                    cwd: 'src/assets/images',
                    src: ['**/*.jpg','**/*.png','**/*.gif'],
                    dest: 'demo/images',
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
                },{
                  'demo/js/sruti.js':'src/assets/js/sruti.js'
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
          },
        connect: {
          demo: {
            options: {
              port: 1976,
              base: 'demo'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['copy']);
    grunt.registerTask('dev', ['copy','uglify','sass','connect','watch']);
    grunt.registerTask('build',['copy','uglify','sass']);
    
};