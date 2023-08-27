# ImportJS (For Node.js)#

----------

[http://www.importjs.org](http://www.importjs.org)

(For the original library and **complete usage instructions**, please see: [https://github.com/Cleod9/importjs](https://github.com/Cleod9/importjs))

This library is a Node.js port of [ImportJS](https://github.com/Cleod9/importjs) that allows you to use the same module-loading features offered by ImportJS on the filesystem. The only difference between the browser and Node version is that you must define your modules slightly differently. See below for details.

## Installation ##

```
npm install importjs
```
And that's it! You can then start using it by simply requiring the importjs module:

```javascript
var ImportJS = require('importjs');
```

You will then have access to the library through the variable `ImportJS`.

### Loading Modules ###

See below for a quick example:

```
//Load modules dynamically through the filesystem
ImportJS.preload({
	baseUrl: '',
	files: {
		tests: {
			Sample: 'Sample.js', //<- File ./tests/Sample.js will be loaded into ImportJS
		}
	},
	ready: function(files) {
		//At this point your modules are good to go, you could use this as an entry point for your application
		var Sample = ImportJS.unpack('tests.Sample');
		var mySample = new Sample();
	}
});

//Or define modules explicitly at your leisure, unpack when needed.
ImportJS.pack('com.project.MyClass', function(module, exports) {
	function MyClass() { 
	};

	//Just like Node, you can set your exports via 'module.exports' and/or 'exports'
	module.exports = MyClass;
});
var MyClass = ImportJS.unpack('com.project.MyClass');
var me = new MyClass();
```
So just like the browser version, you have the option of loading up files dynamically into ImportJS via the `preload()` function, or just defining them across an arbitrary number of files.

### Defining Modules ###
When dynamically preloading modules via the `preload()` function, you simply make sure that these other files also contain the `require('importjs')'` at the top. (Alternatively you could assign it to `global.ImportJS` if you'd like instead)

```javascript
var ImportJS = require('importjs');

/* Follow same syntax as browser version of ImportJS */
ImportJS.pack('tests.Sample', function (module) {
	//Module "CodeFile" is included without require() thanks to ImportJS
	var CodeFile = this.import('some.other.CodeFile');
	this.inject(function() {
		//If you have circular deps, import them here to hoist them up
	});
	
	function Sample() { 
		var foo = 'I am a Sample class';
		this.value = function() {
			return foo;
		}
	};

	//Exposes your 'exported' variable
	module.exports = Sample;
});
```
As you can see, this is exactly how you would write code for this library with the browser version (except for the `require()` of course). One thing to note however, is that you only need to touch ImportJS's rendition of `module.exports` to store your module. All of your packaged code files can communicate with one another explicitly through ImportJS. In other words, instead of using `require()` to retrieve your packaged modules within ImportJS's scope,  you can simply load them via `this.import('path.to.module')`.

For **the detailed instructions on this library's features**, see the test file included in this repo, as well as the docs for the original [ImportJS](https://github.com/Cleod9/importjs).

**Aside:** This library also works great with [OOPS.js for Node](https://github.com/Cleod9/node-oopsjs)!

## Recent Version History ##

**3.0.0**

- Overhaul of original packaging and preloading code (much cleaner read)
- Removed `module.postCompile` and added `this.inject` which accepts a single function
- Removed alternative import methods for consistency (please use the module id string)
- Added `this.import` to replace the use of ImportJS global from within modules
- New plugin system (see original [ImportJS](https://github.com/Cleod9/importjs) library for details)

----------

Copyrighted © 2015 by Greg McLeod

GitHub: [https://github.com/cleod9](https://github.com/cleod9)