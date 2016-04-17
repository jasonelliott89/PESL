module.exports = function(grunt) {

	// load globals object
	var globals = require('./globals.json');

	grunt.initConfig({

		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "PESL", // defaults to the name in package.json, or will use project directory's name
				success: true, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		},

		connect: {
			server: {
				options: {
					port: 1234,
					base: 'build'
				}
			}
		},

		// js
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['js/*.js'],
				dest: 'build/assets/js/all.js',
			},
		},

		// css
		concat_css: {
			options: {
			// Task-specific options go here. 
			},
			all: {
				src: [ "css/stylish-portfolio.css", "css/app.css"],
				dest: "build/assets/css/all.css"
			},
		},

		includereplace: {
			dist: {
				options: {
					// pass bloabls object into templates for use
					globals: globals,
					includesDir: 'source/partials'
				},
				src: 'source/*.html',
				dest: 'tmp/'				
			}
		},
		
		copy: {
			tmp: {
				cwd: 'tmp/source', 	// set working folder / root to copy
				src: '**/*',	// copy all files and subfolders
				dest: 'build',	// destination folder
				expand: true	// required when using cwd
			},
			img: {
				cwd: 'img', 	
				src: '**/*',
				dest: 'build/assets/img',
				expand: true
			}
		},

		clean: {
			build: ['build'],
			tmp: ['tmp']
		},

		watch: {
			files: ['source/**/*.html', 'css/**/*.css', 'js/**/*.js', 'img/**/*'],
			tasks: [
				'clean:build', // clean build folder
				'includereplace:dist', // compile website from partial views and pages
				'copy', // copy website from tmp folder and move to build
				'concat', // concat js files and add to build folder
				'concat_css', // concat css files and add to build folder
				'clean:tmp' // clean up tmp directoy
			]
		}

	});

	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['connect', 'watch']);
	grunt.task.run('notify_hooks');

};