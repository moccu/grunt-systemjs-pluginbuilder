var
	PluginBuilder = require('systemjs-pluginbuilder')
;


module.exports = function(grunt) {

	function onMessage(data) {
		var
			colors = {
				error: 'red',
				info: 'white',
				success: 'green'
			},
			icons = {
				error: String.fromCharCode(9747),
				info: String.fromCharCode(8594),
				success: String.fromCharCode(10004)
			}
		;

		grunt.log.writeln(
			icons[data.type][colors[data.type]] + ' ' +
			data.message[colors[data.type]]
		);
	}

	grunt.registerMultiTask('pluginbuilder', 'SystemJS build task to create plugin based bundles', function() {
		var
			done = this.async(),
			options = this.options({onMessage: onMessage})
		;

		if (options.basePath) {
			options.basePath = grunt.file.expand(options.basePath)[0];
		}

		if (options.pluginPaths) {
			options.pluginPaths = grunt.file.expand(options.pluginPaths);
		}

		new PluginBuilder(options)
			.build()
			.then(function() {
				grunt.log.writeln();
				grunt.log.ok('Your build is done');
				done();
			})
			.catch(function(error) {
				grunt.log.writeln();
				grunt.log.writeln('Your build failed'.red);
				grunt.fail.fatal(error);
			});
	});

};
