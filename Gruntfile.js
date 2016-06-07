var
	FILES_TO_VALIDATE = [
		'tasks/**/*.js',
		'tests/**/tests*.js',
		'tests/**/fixtures/**/*.js',
		'Gruntfile.js',

		// Excludes:
		'!**/build/**/*.js'

	],
	FILES_TO_TEST = [
		'tests/**/tests*.js'
	]
;


module.exports = function(grunt) {

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: {
				src: FILES_TO_VALIDATE,
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},

		jscs: {
			all: {
				src: FILES_TO_VALIDATE,
				options: {
					config: '.jscs.json'
				}
			}
		},

		lintspaces: {
			all: {
				src: FILES_TO_VALIDATE,
				options: {
					rcconfig: '.lintspacesrc'
				}
			}
		},

		nodeunit: {
			all: {
				src: FILES_TO_TEST
			}
		},

		pluginbuilder: {
			tests_systemjs: {
				options: {
					builder: 'systemjs',
					configPath: 'tests/systemjs/config.js',
					basePath: 'tests/systemjs/fixtures/Base.js',
					pluginPathes: 'tests/systemjs/fixtures/Plugin*.js'
				}
			},
			tests_jspm: {
				options: {
					builder: 'jspm',
					basePath: 'tests/jspm/fixtures/Base.js',
					pluginPathes: 'tests/jspm/fixtures/Plugin*.js'
				}
			}
		}
	});

	grunt.registerTask(
		'validate',
		'Validate all files.',
		[
			'jshint',
			'jscs',
			'lintspaces'
		]
	);

	grunt.registerTask(
		'test',
		'Run JavaScript tests.',
		[
			'nodeunit'
		]
	);

};
