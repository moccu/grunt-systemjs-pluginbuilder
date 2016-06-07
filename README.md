# grunt-systemjs-pluginbuilder

A grunt systemJS build tool task to create plugin based bundles.

[![Travis Status](https://travis-ci.org/moccu/grunt-systemjs-pluginbuilder.png?branch=master)](https://travis-ci.org/moccu/grunt-systemjs-pluginbuilder)

## Issues & feature requests

This grunt task is just a wrapper for the node module called
[systemjs-pluginbuilder](https://github.com/moccu/systemjs-pluginbuilder). If
you have any issues or feature requests, please consider if this may belongs to
the node module its self.

## Getting Started

_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide._

From the same directory as your project's Gruntfile and package.json, install
this plugin with the following command:

```bash
	npm install grunt-systemjs-pluginbuilder --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```javascript
	grunt.loadNpmTasks('grunt-systemjs-pluginbuilder');
```

Inside your `Gruntfile.js` file add a section named `pluginbuilder`. This section
specifies the tasks. Each task takes sources and options as parameters.

## Options

### ```builder```

This defines the builder which should be used. There are currently two possible
values: ```systemjs``` and ```jspm```. Each value refers to a specific builder:

* ```systemjs``` uses the [systemjs-builder](https://github.com/systemjs/builder)
* ```jspm``` uses the [included builder](https://github.com/jspm/jspm-cli/blob/master/lib/bundle.js) of [jspm](https://github.com/jspm/jspm-cli)

The default value of this option is ```systemjs```.

**Attention:** When using ```jspm``` as builder, the ```configPath``` option will
be ignored. The builder uses the configured path to the config file inside the
```package.json```. You also should not rewrite the ```baseURL``` property using
the ```config``` option. This value can be defined in the ```package.json``` as
well.

```javascript
	builder: 'systemjs'
```

### ```configPath```

This sets the path to the systemjs config file. This is option is required when
using the ```systemjs``` builder.

```javascript
	configPath: 'js/src/config.js'
```

### ```config```

This option allows to add or overwrite settings from the loaded config file.

```javascript
	config: {
		paths: {
			'app/*': 'js/src/*'
		}
	}
```

### ```basePath```

This is the path to the _base_ file. The path should be defined as ```string```.
This option is _required_.

```javascript
	basePath: 'js/src/Base.js'
```

### ```pluginPaths```

This is a list of all _plugin_ files. The build of these files will have a
substracted module tree of the _base_ file. The paths will be defined as
```array of strings```.

```javascript
	pluginPaths: [
		'js/src/PluginA.js',
		'anywhere/else/src/PluginB.js'
	]
```

### ```out```

This defines the relative output path for built _base_ and _plugin_ files. The
path is defined relative to each source file (defined by ```basePath``` and
```pluginPaths```). The default value is ```'../build/'```.

```javascript
	out: '../build/'
```

*Example:* When using ```../build/``` as ```out``` option, with
```js/src/Base.js``` being the location of the _base_ file, the build process
will output to ```js/build/Base.js```.

## Configuration Example

```javascript
	pluginbuilder: {
		all: {
			options: {
				builder: 'systemjs',
				configPath: 'js/src/config.js',
				config: {paths: {
					'app/*': 'js/src/*'
				},
				basePath: 'js/src/Base.js',
				pluginPathes: 'js/src/Plugin*.js',
				out: '../build/'
			}
		}
	}
```

## Contribution

### Tests & Validation

Run `grunt` to validate and run the tests.

## License

[LICENSE (MIT)](https://github.com/schorfES/grunt-lintspaces/blob/master/LICENSE)
