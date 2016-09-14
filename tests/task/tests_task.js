var
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

	'should end up sucessfull': function(test) {
		test.expect(1);

		exec('grunt pluginbuilder:tests_task_success', function(error) {
			test.equal(error, null);
			test.done();
		});
	},

	'should end up with error (code=1)': function(test) {
		test.expect(2);

		exec('grunt pluginbuilder:tests_task_fail', function(error, stdout) {
			test.ok(stdout.indexOf('Your build failed') > -1);
			test.equal(error.code, 1);
			test.done();
		});
	}

};
