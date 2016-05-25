var
	fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec,
	rimraf = require('rimraf')
;


exports.tests = {

	'setUp': function(done) {
		done();
	},

	'tearDown': function(done) {
		// Clean build directory after each test run....
		rimraf(path.join(__dirname, 'build'), function() {
			done();
		});
	},

	'should log expected messages as standard out': function(test) {
		test.expect(6);

		exec('grunt pluginbuilder:tests', function(error, stdout) {
			test.ok(stdout.indexOf('Build base... tests/fixtures/Base.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/build/Base.js') > -1);

			test.ok(stdout.indexOf('Build plugin... tests/fixtures/PluginA.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/build/PluginA.js') > -1);

			test.ok(stdout.indexOf('Build plugin... tests/fixtures/PluginB.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/build/PluginB.js') > -1);

			test.done();
		});
	},

	'should write files to build dir': function(test) {
		test.expect(6);

		exec('grunt pluginbuilder:tests', function() {
			fs.stat(path.join(__dirname, 'build', 'Base.js'), function(error, stats) {
				test.ok(!error);
				test.ok(stats.isFile());

				fs.stat(path.join(__dirname, 'build', 'PluginA.js'), function(error, stats) {
					test.ok(!error);
					test.ok(stats.isFile());

					fs.stat(path.join(__dirname, 'build', 'PluginB.js'), function(error, stats) {
						test.ok(!error);
						test.ok(stats.isFile());

						test.done();
					});
				});
			});
		});
	}

};
