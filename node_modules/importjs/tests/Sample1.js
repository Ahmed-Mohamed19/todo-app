//Demonstrates an external js "Class" file compatible with ImportJS

var ImportJS = require('../index.js'); //(must use index.js since this test is local to its own module folder)

/*replace the above line with this when using the lib in your code */
// var ImportJS = require('importjs');

ImportJS.pack('tests.Sample1', function (module, exports) {
	function Sample1() { 
		//Print class name
		this.toString = function() {
			return '[Sample1]';
		};
	};
	module.exports = Sample1;
});