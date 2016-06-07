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
		test.expect(7);

		exec('grunt pluginbuilder:tests_jspm', function(error, stdout) {
			test.ok(stdout.indexOf('Start build using "jspm"-builder.') > -1);

			test.ok(stdout.indexOf('Build base... tests/jspm/fixtures/Base.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/jspm/build/Base.js') > -1);

			test.ok(stdout.indexOf('Build plugin... tests/jspm/fixtures/PluginA.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/jspm/build/PluginA.js') > -1);

			test.ok(stdout.indexOf('Build plugin... tests/jspm/fixtures/PluginB.js') > -1);
			test.ok(stdout.indexOf('Saved as... tests/jspm/build/PluginB.js') > -1);

			test.done();
		});
	},

	'should write files to build dir': function(test) {
		test.expect(6);

		exec('grunt pluginbuilder:tests_jspm', function() {

			fs.stat(path.join(__dirname, 'build', 'Base.js'), function(error, stats) {
				test.ok(!error);
				test.ok(stats && stats.isFile());

				fs.stat(path.join(__dirname, 'build', 'PluginA.js'), function(error, stats) {
					test.ok(!error);
					test.ok(stats && stats.isFile());

					fs.stat(path.join(__dirname, 'build', 'PluginB.js'), function(error, stats) {
						test.ok(!error);
						test.ok(stats && stats.isFile());

						test.done();
					});
				});
			});
		});
	}

};
