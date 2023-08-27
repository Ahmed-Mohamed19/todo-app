var ImportJS = require('./index.js');

ImportJS._settings.debug = true;

ImportJS.preload({
	require: require,
	baseUrl: '',
	packages: {
		tests: {
			Sample1: 'Sample1.js', //Basic
			Sample2: 'Sample2.js', //Normal dependency
			Sample3: 'Sample3.js' //Circular dependency
		}
	},
	libs: [], //Additional libs
	ready: function(arr) {
		console.log("Loaded files: ", arr);
		var Sample1 = ImportJS.unpack('tests.Sample1');
		var Sample2 = ImportJS.unpack('tests.Sample2');
		var Sample3 = ImportJS.unpack('tests.Sample3');

		 //Demonstrate a basic package
		var mySample1 = new Sample1();
		console.log("mySample1.toString(): " + mySample1.toString());

		//Demonstrate a package with two dependencies
		var mySample2 = new Sample2();
		console.log("mySample2.toString(): " + mySample2.toString());
		console.log("mySample2.giveMeASample1().toString(): " + mySample2.giveMeASample1().toString()); //Dependency 1
		console.log("mySample2.giveMeASample3().toString(): " + mySample2.giveMeASample3().toString()); //Dependency 2 (Circular)

		//Demonstrate a circularly dependent package (Sample3 is able to reference Sample2, just as Sample2 is able to reference Sample3)
		var mySample3 = new Sample3();
		console.log("mySample3.toString(): " + mySample3.toString());
		console.log("mySample3.giveMeASample2().toString(): " + mySample3.giveMeASample2().toString()); //Show that the circularly dependent package has loaded
	},
	error: function(arr) {
		console.log("Errored files: ", arr);
	}
});