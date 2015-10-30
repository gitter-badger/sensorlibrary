/**
*  Dsensor - Calls to InfluxDB  times series database
*
* Manages saving of data to Influxdb 

* @class influxDB
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var influx = require('influx');

var influxDB = function(settingsIN) {
	
	this.settings = settingsIN;
	this.liveclient = {};
	this.settingsInfluxdb();
	this.newInfluxdb();	
	//this.deleteInfluxdb();	
	this.influxdbDatabases();

	//this.influxMeasurements();
	//this.influxgetSeries();
	//this.queryTimeseriesName();
	//this.queryTimeseriesTemperature();
	//this.queryTimeseriesLight();		
	//this.influxDropMeasurement('genome');	
	//this.queryGenome23andme();
		
};

/**
*  default influxdb settings
* @method settingInfluxdb	
*
*/	
influxDB.prototype.settingsInfluxdb = function() {

	this.liveclient = influx({host: this.settings.host, username: this.settings.username, password: this.settings.password, database: this.settings.database});
		
};

/**
*  create a new influxDB
* @method newInfluxdb		
*
*/	
influxDB.prototype.newInfluxdb = function() {

	this.liveclient.createDatabase('soulmatter', function(err, result) {
	
	} );
	
};

/**
*  delete an  influxDB database
* @method deleteInfluxdb		
*
*/	
influxDB.prototype.deleteInfluxdb = function() {

	var database = 'soulmatter';
	
	this.liveclient.dropDatabase(database, function(err,response) { 
console.log('drop a db influx');	
console.log(err);	
console.log(response);			
		
	});

	
};

/**
*  check  influx db name
* @method influxdbDatabases		
*
*/	
influxDB.prototype.influxdbDatabases = function() {

	this.liveclient.getDatabaseNames( function(err,arrayDatabaseNames){ 
		
console.log(arrayDatabaseNames);	
		
	});
	
};

/**
*  list of active measurement series
* @method influxMeasurements		
*
*/	
influxDB.prototype.influxMeasurements = function() {

	this.liveclient.getMeasurements(function(err,arrayMeasurements){ 
console.log('measurements list');	
console.log(arrayMeasurements);
console.log(arrayMeasurements[0].series);	
console.log(arrayMeasurements[0].series[0].values);		
	});
	
};

/**
*  delete data by measurement series
* @method influxDropMeasurement		
*
*/	
influxDB.prototype.influxDropMeasurement = function(seriesname) {
console.log(seriesname);
	this.liveclient.dropSeries('1', function(err,response) { 
console.log('measurements delete complete');	
console.log(err);
console.log(response);		
	});
	
};
	
/**
*  list  series  within measurements
* @method influxgetSeries		
*
*/	
influxDB.prototype.influxgetSeries = function() {

	this.liveclient.getSeries(function(err, results){ 
console.log('series list');	
console.log(results);		
	});
	
};	
/**
*  save amiigo accelerometer element to influx
* @method saveElementAccelerometer	
*
*/	
influxDB.prototype.saveElementAccelerometer = function(series, basetime, logfiletime, timestampacc, dataarray) {
//console.log('starting save');
//console.log(series);
//console.log(basetime);	
//console.log(logfiletime);		
//console.log(timestampacc);	
//console.log(dataarray);
	var timestampaccfileround = Math.round(timestampacc);
	var actualtime = Math.round((basetime + timestampacc));
//console.log(actualtime);	
	
	this.liveclient.writePoint(series, {time: actualtime, xaxis: dataarray[0], yaxis: dataarray[1], zaxis: dataarray[2], logfiledate: logfiletime, timestamp: timestampaccfileround}, { brand: 'amiigowrist', sensor : 'accelerometer'}, {precision : 'ms'}, function(err, response) {
//console.log('save accell write');
//console.log(err);	
//console.log(response);			

	});
	
};

/**
*  save amiigo Temperature element to influx
* @method saveElementTemperature	
*
*/	
influxDB.prototype.saveElementTemperature = function(series, basetime, logfiletime, timestamptemp, datatemp) {
//console.log('starting save');
//console.log(series);
//console.log(basetime);	
//console.log(logfiletime);		
//console.log(timestamptemp);	
//console.log(datatemp);
	var timestampaccfileround = Math.round(timestamptemp);
	var actualtime = Math.round((basetime + timestamptemp));
//console.log(actualtime);	
	
	this.liveclient.writePoint(series, {time: actualtime, temperature: datatemp, logfiledate: logfiletime, timestamp: timestampaccfileround}, { brand: 'amiigowrist', sensor : 'temperature'}, {precision : 'ms'}, function(err, response) {
//console.log('save temperature write');
//console.log(err);	
//console.log(response);			

	});
	
};

/**
*  save amiigo Light element to influx
* @method saveElementLight	
*
*/	
influxDB.prototype.saveElementLight = function(series, basetime, logfiletime, timestamplight, datalight) {
//console.log('starting light save');
//console.log(series);
//console.log(basetime);	
//console.log(logfiletime);		
//console.log(timestamplight);	
//console.log(datalight);
//console.log(datalight[1][1]);	
	var timestampaccfileround = Math.round(timestamplight);
	var actualtime = Math.round((basetime + timestamplight));
//console.log(actualtime);	
	
	this.liveclient.writePoint(series, {time: actualtime, red: datalight[0][1], ir: datalight[1][1], logfiledate: logfiletime, timestamp: timestampaccfileround}, { brand: 'amiigowrist', sensor : 'lightsensor'}, {precision : 'ms'}, function(err, response) {
//console.log('save light write');
//console.log(err);	
//console.log(response);			

	});
	
};

/**
*  query influx for a time series name
* @method queryTimeseriesName	
*
*/	
influxDB.prototype.queryTimeseriesName = function(seriesname) {


	var query = 'SELECT xaxis, yaxis, zaxis, logfiledate, timestamp FROM accelerometer;';
	this.liveclient.queryRaw(['soulmatter'], query, function(err, results) {
console.log('query raw');
//console.log(err);	
//console.log(results);	
//console.log(results[0].series[0]);		

		
	});

};

/**
*  query influx for a time series Temperature
* @method queryTimeseriesTemperature	
*
*/	
influxDB.prototype.queryTimeseriesTemperature = function(seriesname) {
console.log('start temp query');

	var query = 'SELECT temperature, logfiledate, timestamp FROM temperature;';
	this.liveclient.queryRaw(['soulmatter'], query, function(err, results) {
console.log('query raw temperature');
//console.log(err);	
//console.log(results);	
//console.log(results[0].series[0]);		

		
	});

};


/**
*  query influx for a time series Light  Red and IR
* @method queryTimeseriesLight	
*
*/	
influxDB.prototype.queryTimeseriesLight = function(seriesname) {
console.log('start light query');

	var query = 'SELECT red, ir FROM lightsensor;';
	this.liveclient.queryRaw(['soulmatter'], query, function(err, results) {
console.log('query raw light');
//console.log(err);	
//console.log(results);	
//console.log(results[0].series[0]);		

		
	});

};


/**
*  save 23 and me  genome data
* @method save23andmeGenome	
*
*/	
influxDB.prototype.save23andmeGenome = function(series, dataobject) {
//console.log('starting save GENOME');
//console.log(series);
//console.log(dataobject);
//console.log(dataobject.rsid.length + 'rsid');
//console.log(dataobject.chromosome.length + 'chrom');
//console.log(dataobject.position.length  + 'position');
//console.log(dataobject.genotype.length + 'genoty');
//console.log(dataobject.seqdownload.length + 'date');	
	this.liveclient.writePoint(series, {time:  dataobject.timeunique, rsid: dataobject.rsid, chromosome: dataobject.chromosome, position: dataobject.position, genotype: dataobject.genotype, downloaddate: dataobject.seqdownload }, { brand: '23andme', sensor : 'snps'}, function(err, response) {
//console.log('save 23me genome write');
//console.log(err);	
//console.log(response);			
//
	});
	
};

/**
*  query influx for a time series Genome  23and me
* @method queryGenome23andme	
*
*/	
influxDB.prototype.queryGenome23andme = function(seriesname) {
console.log('start 23me query genome');

	var query = 'SELECT rsid, chromosome, position, genotype, downloaddate FROM genome;';// WHERE rsid=\'rs12478296\';';  //  rs3829839   rs12478296
	this.liveclient.queryRaw(['soulmatter'], query, function(err, results) {
console.log('query raw genome');
console.log(err);
console.log(results);		
console.log(results.length);
		if(results[0].series )
		{
console.log(' display');			
console.log(results[0].series[0]);	
		}
		else
		{
console.log('no display');			
	
			
		}
		
	});

};


module.exports = influxDB;