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
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			source: {
				src: FILES_TO_VALIDATE,
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},

		jscs: {
			source: {
				src: FILES_TO_VALIDATE,
				options: {
					config: '.jscs.json'
				}
			}
		},

		lintspaces: {
			source: {
				src: FILES_TO_VALIDATE,
				options: {
					rcconfig: '.lintspacesrc'
				}
			},
			readme: {
				src: 'docs/**/*.md'
			}
		},

		nodeunit: {
			source: {
				src: FILES_TO_TEST
			}
		},

		pluginbuilder: {
			tests_systemjs: {
				options: {
					builder: 'systemjs',
					configPath: 'tests/systemjs/config.js',
					basePath: 'tests/systemjs/fixtures/Base.js',
					pluginPaths: 'tests/systemjs/fixtures/Plugin*.js'
				}
			},
			tests_jspm: {
				options: {
					builder: 'jspm',
					basePath: 'tests/jspm/fixtures/Base.js',
					pluginPaths: 'tests/jspm/fixtures/Plugin*.js'
				}
			},
			tests_task_success: {
				options: {
					builder: 'systemjs',
					configPath: 'tests/task/config.js',
					basePath: 'tests/task/fixtures/Base.js',
					pluginPaths: 'tests/task/fixtures/PluginSucceess.js'
				}
			},
			tests_task_fail: {
				options: {
					builder: 'systemjs',
					configPath: 'tests/task/config.js',
					basePath: 'tests/task/fixtures/Base.js',
					pluginPaths: 'tests/task/fixtures/PluginFail.js'
				}
			},
		},

		concat: {
			readme: {
				src: [
					'docs/intro.md',
					'docs/issues.md',
					'docs/installation.md',
					'node_modules/systemjs-pluginbuilder/docs/options.md',
					'docs/examples.md',
					'docs/contribution.md',
					'docs/license.md'
				],
				dest: 'README.md'
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

	grunt.registerTask(
		'build',
		'Build readme file',
		[
			'concat:readme'
		]
	);

	grunt.registerTask(
		'default',
		[
			'validate',
			'test',
			'build'
		]
	);

};
