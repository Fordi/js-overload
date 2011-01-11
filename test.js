var Overloader = require('./overloader');
var test = Overloader(
	function () {
		console.log('default call');
	},
	[Overloader.Undefined], function (a) {
		console.log('this is uncomfortable...');
	},
	[String, Number, Overloader.Rest], function (a, b, c) {
		console.log('OVERLOAD!!! a: '+a+', b: '+b+', c: '+c);
	}
);
var beer;
test();
test(beer);
test('test', 1, 'blah', [], {}, 123);