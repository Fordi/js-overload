module.exports = (function () {
	String.is = function (a) { return !!a.length && !!a.substr; };
	Boolean.is = function(a) { return a===true || a===false; };
	Number.is = function(a) { return !isNaN(a); };
	var Any={is: function () { return true; }};
	var Rest={};
	function Overloader() {
		var a = [];
		var ret = function () {
			var i, j, _ta = arguments;
			for (i=1; i<a.length; i+=2) {
				var sig = a[i];
				var method = a[i+1];
				var ok=(sig.length == _ta.length || (sig.length-1 <= _ta.length && sig[sig.length-1] === Rest));
				if (ok) for (j=0; j<_ta.length; j++) {
					if (sig[j]===Rest) break;
					if (sig[j].is) ok &= sig[j].is(_ta[j]);
					else ok &= (_ta[j] instanceof sig[j]);
				}
				if (ok) return method.apply(this, _ta);
			}
			
			return a[0].apply(this, _ta);
		}
		ret.overload = function () {
			a = a.concat(Array.prototype.slice.apply(arguments));
			if (!(a[0] instanceof Function)) {
				a.unshift(function () {
					throw new Error('Method is strictly typed');
				});
			}
		};
		ret.overload.apply(this, arguments);
		return ret;
	};
	Overloader.Any=Any;
	Overloader.Rest=Rest;
	return Overloader;
})();