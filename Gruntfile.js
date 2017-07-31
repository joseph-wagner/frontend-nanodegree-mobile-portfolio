var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('default', ['browserSync']);
    grunt.registerTask('lint', ['jshint', 'csslint', 'cssmin', 'uglify', 'imagemin']);

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