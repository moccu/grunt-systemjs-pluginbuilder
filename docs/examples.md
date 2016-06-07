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
