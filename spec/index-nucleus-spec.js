if ( typeof require != "undefined") {
	var buster = require("buster");
	var sensorNucleus = require("../src/sensornucleus.js");
}

buster.spec.expose(); // Make spec functions global

var spec = describe("listens for event from sensor in the network", function () {
	before(function () {
		
		this.testSensorEvents = new sensorNucleus();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(new sensorNucleus); 
		
	});
	
	it("object controller created", function () {
	 
		buster.assert.isObject(this.testSensorEvents);
	});
	
	it("listen log data", function () {
		
		buster.assert.isFunction(this.testSensorEvents.logListener);
	});

	it("emitter to Mapping", function () {
		
		buster.assert.isFunction(this.testSensorEvents.emitMapping);
	});
	
});