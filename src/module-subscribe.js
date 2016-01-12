var middle = (function() {
	var _events = {},
		_listen,
		_trigger,
		_remove;

	_listen = function(event, fn) {
		if(!_events[event]) {
			_events[event] = [];
		}
		_events[event].push(fn);
	};

	_trigger = function() {
		var event = Array.prototype.shift.call(arguments),
			fns = _events[event];
		for(var i = 0, l = fns.length; i < l; i++) {
			fns[i].apply(this, arguments);
		}
	};

	_remove = function(event, fn) {
		if(!_events[event]) {
			return;
		}
		if(!fn) {
			_events[event] = [];
		}
		else {
			for(var i = 0, l = _events[event].length; i < l; i++) {
				if(fn === _events[event][i]) {
					_events[event].splice(i, 1);
					return;
				}
			}
		}
	};

	return {
		listen: _listen,
		trigger: _trigger,
		remove: _remove
	};
})();