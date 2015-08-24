if ( typeof require != "undefined") {
	var buster = require("buster");
	var sensorEvents = require("../src/sensorevents.js");
}

buster.spec.expose(); // Make spec functions global

var spec = describe("listens for event from sensor in the network", function () {
	before(function () {
		
		this.testSensorEvents = new sensorEvents();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(new sensorEvents); 
		
	});
	
	it("object controller created", function () {
	 
		buster.assert.isObject(this.testSensorEvents);
	});
	
	it("listen log data amiigo", function () {
		
		buster.assert.isFunction(this.testSensorEvents.sensorListener);
	});

	it("emitter", function () {
		
		buster.assert.isFunction(this.testSensorEvents.emitNucleus);
	});
	
});