if ( typeof require != "undefined") {
	var buster = require("buster");
	var logRegulator = require("../src/sensorevents.js");
}

buster.spec.expose(); // Make spec functions global

var spec = describe("listens for new log files from sensors", function () {
	before(function () {
		
		this.testLogevents = new logRegulator();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(new logRegulator); 
		
	});
	
	it("object controller created", function () {
	 
		buster.assert.isObject(this.testLogevents);
	});
	
	it("listen log data amiigo", function () {
		
		buster.assert.isFunction(this.testLogevents.sensorListener);
	});

	it("emitter", function () {
		
		buster.assert.isFunction(this.testLogevents.emitNucleus);
	});
	
});