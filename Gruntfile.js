var ngrok = require('ngrok');
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('default', ['psi-ngrok','browserSync']);
    grunt.registerTask('upload', ['jshint', 'csslint', 'cssmin', 'uglify', 'imagemin']);

    grunt.registerTask('psi-ngrok', function() {
        var done = this.async();
        var port = 900;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'js/*.js', 'views/*.js']
        },
        csslint: {
            lax: {
                src: ['css/style.css', 'views/css/style.css']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'css/release',
                    ext: '.min.css'
                },
                {
                    expand: true,
                    cwd: 'views/css',
                    src: ['*.css'],
                    dest: 'views/css/release',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
              mangle: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js'],
                    dest: 'js/release',
                    ext: '.min.js'
                },
                {
                    expand: true,
                    cwd: 'views/js',
                    src: ['*.js'],
                    dest: 'views/js/release',
                    ext: '.min.js'
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src : [
                        'css/*.css',
                        'index.html',
                        'js/**/*.js',
                        'views/css/*.cs',
                        'views/pizza.html',
                        '/views/js/**/*.js'
                ]
            },
            options: {
                server: {
                    baseDir: "./"
                },
                open: false
            }
        },
        pagespeed: {
            options: {
                key: 'AIzaSyD5rLxUcpWXkJ_gWW3xI58hoBDBXDIRwNc',
                url: "https://github.com"
            },
            prod: {
                options: {
                  locale: "en_GB",
                  strategy: "desktop",
                  threshold: 90
                }
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 90,
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['*.{jpg,png}'],
                    dest: 'img/release'
                },
                {
                    expand: true,
                    cwd: 'views/images',
                    src: ['*.{jpg,png}'],
                    dest: 'views/images/release'
                }]
            }
        }
    });
};