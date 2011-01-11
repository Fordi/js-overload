var Overloader = require('./overloader');
var test = Overloader(
	function () {
		console.log('default call');
	},
	[String, Number, Overloader.Rest], function (a, b, c) {
		console.log('OVERLOAD!!! a: '+a+', b: '+b+', c: '+c);
	}
);
test();
test('test', 1, 'blah', [], {}, 123);