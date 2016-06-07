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
