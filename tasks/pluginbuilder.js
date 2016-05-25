var
	PluginBuilder = require('systemjs-pluginbuilder')
;


module.exports = function(grunt) {

	function onMessage(message) {
		grunt.log.writeln(message);
	}

	grunt.registerMultiTask('pluginbuilder', 'SystemJS build task to create plugin based bundles', function() {
		var
			done = this.async(),
			options = this.options({onMessage: onMessage}),
			pluginbuilder = new PluginBuilder(options)
		;

		pluginbuilder
			.build()
			.then(function() {
				grunt.log.writeln();
				grunt.log.ok('Your build is done');
				done();
			})
			.catch(function(error) {
				grunt.log.writeln();
				grunt.log.writeln('Your build failed'.red);
				grunt.fail.warn(error);
			});
	});

};
