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
	
	it("delete influx database", function () {
		
		buster.assert.isFunction(this.testInflux.deleteInfluxdb);
	});

	it("list all influx databases", function () {
		
		buster.assert.isFunction(this.testInflux.influxdbDatabases);
	});
	
	it("influx measurement series list", function () {
		
		buster.assert.isFunction(this.testInflux.influxMeasurements);
	});

	it("influx drop a measurement series", function () {
		
		buster.assert.isFunction(this.testInflux.influxDropMeasurement);
	});	
	
	it("save accelerometer data", function () {
		
		buster.assert.isFunction(this.testInflux.saveElementAccelerometer);
	});
	
	it("save temperature data", function () {
		
		buster.assert.isFunction(this.testInflux.saveElementTemperature);
	});
	
	it("save light data", function () {
		
		buster.assert.isFunction(this.testInflux.saveElementLight);
	});
	
	it("query time series acclerometer", function () {
		
		buster.assert.isFunction(this.testInflux.queryTimeseriesName);
	});
	
	it("query time series temperature", function () {
		
		buster.assert.isFunction(this.testInflux.queryTimeseriesTemperature);
	});
	
	it("query time series light data", function () {
		
		buster.assert.isFunction(this.testInflux.queryTimeseriesLight);
	});
	
	it("save 23and me genome data", function () {
		
		buster.assert.isFunction(this.testInflux.save23andmeGenome);
	});
	
	it("query genome data ", function () {
		
		buster.assert.isFunction(this.testInflux.queryGenome23andme);
	});
	
/*
	it("", function () {
		
		buster.assert.isFunction(this.testInflux.);
	});
*/	
});