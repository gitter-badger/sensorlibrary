if ( typeof require != "undefined") {
	var buster = require("buster");
	var settings = require("../src/settings.js");
	var liveInfluxdb = require("../src/influxdb.js");
}

buster.spec.expose(); // Make spec functions global

var spec = describe("call to InfluxDB, creating saving, data from sensors", function () {
	before(function () {
		
		this.startSettings = new settings();
//console.log(this.startSettings.account.influxdb);		
		this.testInflux = new liveInfluxdb(this.startSettings.account.influxdb);		
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(new liveInfluxdb); 
		
	});
	
	it("object controller created", function () {
	 
		buster.assert.isObject(this.testInflux);
	});

	it("create a new influxdb", function () {
		
		buster.assert.isFunction(this.testInflux.newInfluxdb);
	});
	
	it("default settings", function () {
		
		buster.assert.isFunction(this.testInflux.settingsInfluxdb);
	});
	
	it("saves an element", function () {
		
		buster.assert.isFunction(this.testInflux.saveElement);
	});
	
});